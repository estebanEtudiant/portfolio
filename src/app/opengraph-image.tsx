import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${profile.firstName} ${profile.lastName}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image de partage (LinkedIn, Discord…) générée au build, aux couleurs du site.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#edf0f3",
          backgroundImage: "linear-gradient(#d9dee6 1px, transparent 1px), linear-gradient(90deg, #d9dee6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          color: "#16203a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 700, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>{profile.firstName}</span>
          <span>{profile.lastName}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 34 }}>
          <span>{profile.role}</span>
          <span style={{ color: "#2741d8" }}>Stage 11 janv. – 30 avr. 2027</span>
        </div>
      </div>
    ),
    size,
  );
}
