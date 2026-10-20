import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { localeMeta, type Locale } from "@/i18n/config";

export const ogSize = { width: 1200, height: 630 };

const assets = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/Inter-500.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Inter-700.ttf")),
  readFile(join(process.cwd(), "public/brand/inverso-logo-white.svg"), "base64"),
]);

type OgProps = {
  locale: Locale;
  siteName: string;
  title: string;
  eyebrow?: string;
  description?: string;
};

export async function renderOgImage({ locale, siteName, title, eyebrow, description }: OgProps) {
  const [medium, bold, logo] = await assets;
  const titleSize = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "rgb(28,28,28)",
          backgroundImage: "radial-gradient(circle at 92% 8%, rgba(170,225,201,0.22), transparent 45%)",
          color: "#fff",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${logo}`} width={188} height={44} alt="" />
          <div style={{ fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{siteName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          {eyebrow && (
            <div style={{ fontSize: 28, fontWeight: 500, color: "rgb(170,225,201)", textTransform: "uppercase", letterSpacing: 2 }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>{title}</div>
          {description && (
            <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>
              {description.length > 140 ? `${description.slice(0, 137)}…` : description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 500 }}>
          <div style={{ color: "rgba(255,255,255,0.65)" }}>help.inverso.bg</div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.25)",
              color: "#fff",
            }}
          >
            {localeMeta[locale].label}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

/** Serves an editor-uploaded share image from Sanity, cropped to 1200×630. */
export async function customOgImage(url: string) {
  const res = await fetch(`${url}?w=${ogSize.width}&h=${ogSize.height}&fit=crop&fm=png`);
  if (!res.ok) return null;
  return new Response(await res.arrayBuffer(), { headers: { "content-type": "image/png" } });
}
