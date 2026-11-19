// Next 16 sous Windows : l'export écrit les fichiers de préchargement dans des
// sous-dossiers (`__next.projets/$d$slug/__PAGE__.txt`) car `path.relative`
// renvoie des « \ » que Next ne convertit pas en points. Le routeur demande
// `__next.projets.$d$slug.__PAGE__.txt` : on aplatit. Sans effet sous Linux.
// shortcut: à supprimer quand Next corrigera collectSegmentPaths (node_modules/next/dist/export/index.js).
import { readdir, rename, rm } from "node:fs/promises";
import { join, relative, sep } from "node:path";

async function* files(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else yield p;
  }
}

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = join(dir, e.name);
    if (!e.name.startsWith("__next.")) {
      await walk(p);
      continue;
    }
    for await (const f of files(p)) {
      await rename(f, join(dir, `${e.name}.${relative(p, f).split(sep).join(".")}`));
    }
    await rm(p, { recursive: true });
  }
}

if (sep === "\\") await walk("out");
