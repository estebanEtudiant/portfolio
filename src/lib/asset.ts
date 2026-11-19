// Les liens bruts (<a href>, PDF) ne reçoivent pas le basePath automatiquement.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
