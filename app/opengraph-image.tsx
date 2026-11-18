import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#171310",
          color: "#f6f1ea",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", letterSpacing: 6, color: "#c5a46d", fontSize: 22 }}>VIDYADHAR NAGAR · JAIPUR</div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1, marginTop: 18 }}>Jewellery Store Sample</div>
        <div style={{ display: "flex", fontSize: 28, color: "#d9d0c6", marginTop: 18 }}>Gold, silver and diamond jewellery</div>
      </div>
    ),
    size,
  );
}
