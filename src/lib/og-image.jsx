import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const PNG_CHUNK_ALLOWLIST = new Set(["IHDR", "PLTE", "tRNS", "IDAT", "IEND"]);

// Some PNG exports embed non-standard ancillary chunks (e.g. a stray "orNT" chunk).
// Browsers and image tools safely ignore unknown chunks per the PNG spec, but satori's
// raster decoder does not, so we strip anything outside the allowlist before embedding.
function sanitizePng(buffer) {
  const signature = buffer.subarray(0, 8);
  const chunks = [signature];
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const chunkEnd = offset + 8 + length + 4;
    if (PNG_CHUNK_ALLOWLIST.has(type)) {
      chunks.push(buffer.subarray(offset, chunkEnd));
    }
    offset = chunkEnd;
  }

  return Buffer.concat(chunks);
}

let logoDataUriPromise;

function getLogoDataUri() {
  if (!logoDataUriPromise) {
    logoDataUriPromise = readFile(path.join(process.cwd(), "public/brand/cevrynt-logo-v2.png")).then(
      (buffer) => `data:image/png;base64,${sanitizePng(buffer).toString("base64")}`
    );
  }
  return logoDataUriPromise;
}

export async function renderOgImage({ eyebrow, title, subtitle }) {
  const logoSrc = await getLogoDataUri();
  const titleSize = title.length > 70 ? 52 : title.length > 44 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          backgroundImage: "linear-gradient(135deg, #0a4640 0%, #052d29 60%, #031e1b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoSrc ? <img src={logoSrc} width={168} height={60} alt="" style={{ objectFit: "contain" }} /> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                color: "#ffefb3",
                fontSize: 26,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              color: "#f7faf9",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", color: "#b9d4cd", fontSize: 30, lineHeight: 1.4 }}>{subtitle}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#7fa39b",
            fontSize: 24,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>cevrynt.com</div>
          <div style={{ display: "flex" }}>AI Underwriting Infrastructure for Alternative Lenders</div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
