import { ImageResponse } from "next/og";

export const alt = "Kaori Nishimura — Senior Front-End Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141318",
          color: "#f0eef1",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8 }}>
          MINIARTS · LONDON
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontStyle: "italic", lineHeight: 0.9 }}>
            Kaori
          </div>
          <div style={{ fontSize: 64, marginTop: 12 }}>Nishimura</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#c4a0b4" }}>
            Senior Front-End Engineer
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
