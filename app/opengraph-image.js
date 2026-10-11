import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

export const alt = "ASH Digital: UI/UX Design, Web Development & Digital Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await fs.readFile(path.join(process.cwd(), "public", "logo-mark.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #05040a 0%, #1b1448 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={200} height={129} alt="" />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 36, lineHeight: 1.05 }}>
          CREATIVITY MEETS TECHNOLOGY
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 32, color: "#cbd5e1" }}>
          ASH Digital | UI/UX Design | Web Development | Digital Marketing
        </div>
      </div>
    ),
    size
  );
}
