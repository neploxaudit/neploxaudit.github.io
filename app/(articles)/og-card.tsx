import { ImageResponse } from "next/og";
import path from "path";

import * as articles from "@/app/(articles)";

import * as fs from "fs/promises";

export const size = {
  width: 1200,
  height: 675,
};

const themeLight = "#f0efe7"; // stone-100

const gutter = 68;
const logo = { x: 19, y: 35, width: 158 };
const title = { y: 214, width: 470, size: 62, lineHeight: 0.985 };
const link = { y: 596, size: 31, letterSpacing: "0.1em" };

const logoAspect = 4122 / 3501;

function base64url(data: string, mimeType: string = "image/png") {
  return `data:${mimeType};base64,${data}`;
}

function svgUrl(svg: string) {
  return base64url(Buffer.from(svg).toString("base64"), "image/svg+xml");
}

function lightLogo(svg: string) {
  return svg.replace(/#ef5902/gi, themeLight);
}

export async function renderOgCard(slug: string) {
  const cwd = process.cwd();
  const articleMetadata = await articles.loadMetadata(slug);

  const [fontRubikRegular, neploxLogo, ogBackground] = await Promise.all([
    fs.readFile(path.join(cwd, "app", "fonts", "Rubik", "Rubik-Regular.ttf")),
    fs.readFile(path.join(cwd, "public", "icons", "neplox.svg"), "utf-8"),
    // The background sits in the article's own folder, next to its README.
    fs.readFile(
      path.join(cwd, "articles", "blog", slug, "og-cover.png"),
      "base64",
    ),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: "relative",
        display: "flex",
        backgroundColor: themeLight,
      }}
    >
      {/* Article background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={base64url(ogBackground)}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${size.width}px`,
          height: `${size.height}px`,
          objectFit: "cover",
        }}
      />

      {/* Branding */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={svgUrl(lightLogo(neploxLogo))}
        alt="NEPLOX"
        style={{
          position: "absolute",
          left: `${logo.x}px`,
          top: `${logo.y}px`,
          width: `${logo.width}px`,
          height: `${Math.round(logo.width / logoAspect)}px`,
        }}
      />

      {/* Article title */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: `${gutter}px`,
          top: `${title.y}px`,
          width: `${title.width}px`,
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: `${title.size}px`,
          lineHeight: title.lineHeight,
          letterSpacing: "-0.01em",
          color: "#ffffff",
        }}
      >
        {articleMetadata.title}
      </div>

      {/* Website */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: `${gutter}px`,
          top: `${link.y}px`,
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: `${link.size}px`,
          letterSpacing: link.letterSpacing,
          color: themeLight,
        }}
      >
        neplox.security
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          data: fontRubikRegular,
          name: "Rubik",
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
