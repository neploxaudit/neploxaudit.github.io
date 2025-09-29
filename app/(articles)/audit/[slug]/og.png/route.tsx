import { ImageResponse } from "next/og";
import path from "path";

import * as articles from "@/app/(articles)";

import * as fs from "fs/promises";

export const dynamic = "force-static";

// Same size as for twitter card to simplify generation.
const size = {
  width: 1200,
  height: 675,
};

export async function generateStaticParams(): Promise<articles.Params[]> {
  return articles.list();
}

function base64url(data: string, mimeType: string = "image/png") {
  return `data:${mimeType};base64,${data}`;
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<articles.Params>;
  },
) {
  const { slug } = await params;
  const cwd = process.cwd();

  const [
    articleMetadata,
    fontHorizon,
    fontRubikRegular,
    fontRubikMedium,
    ogCover,
    neploxLogo,
  ] = await Promise.all([
    articles.loadMetadata(slug),
    fs.readFile(path.join(cwd, "app", "fonts", "horizon.otf")),
    fs.readFile(path.join(cwd, "app", "fonts", "Rubik", "Rubik-Regular.ttf")),
    fs.readFile(path.join(cwd, "app", "fonts", "Rubik", "Rubik-Medium.ttf")),
    fs.readFile(
      path.join(cwd, "articles", "blog", slug, "og-cover.png"),
      "base64",
    ),
    fs.readFile(path.join(cwd, "app", "assets", "neplox.png"), "base64"),
  ]);

  const potentialIconNames = ["og-icon.png", "og-icon.svg"];
  let ogIcon: string | undefined = undefined;
  for (const iconName of potentialIconNames) {
    try {
      ogIcon = await fs.readFile(
        path.join(cwd, "articles", "blog", slug, iconName),
        "base64",
      );
      break;
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        continue;
      }
      throw e;
    }
  }

  if (!ogIcon) {
    throw new Error("No og icon found");
  }

  const articleAuthor = articles.authors[articleMetadata.author];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "675px",
          backgroundImage: `url(${base64url(ogCover)})`,
          padding: "64px 80px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Branding */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={base64url(neploxLogo)}
            alt="NEPLOX"
            height={80}
            width={94}
            style={{
              position: "absolute",
              // -(80px size - 48px font size) / 2
              // simulate scale transform, where the origin would be aligned with the text, but then the image is scaled up
              top: "-16px",
            }}
          />
          <span
            style={{
              fontFamily: "Horizon",
              fontWeight: 600,
              fontSize: "48px",
              color: "#ef5900", // theme brand
              position: "absolute",
              left: "110px", // 94px logo width + 16px padding
            }}
          >
            NEPLOX
          </span>
        </div>

        {/* Related icon */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#252125", // theme dark (raisin-900)
            // (675 (img height) / 2) - 2 * 48px (icon block top/bottom padding)
            width: "241px",
            height: "241px",
            borderRadius: "24px",
            position: "absolute",
            top: "48px",
            right: "80px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={base64url(ogIcon, "image/svg+xml")}
            alt="Related icon"
            style={{
              maxHeight: "177px", // 241 - 32 * 2 (padding)
              maxWidth: "177px",
            }}
          />
        </div>

        {/* Top half text */}
        <div style={{ display: "flex", flexBasis: "50%" }}>
          <span
            style={{
              fontFamily: "RubikRegular",
              alignSelf: "flex-end",
              fontSize: "48px",
              color: "#48434a", // theme raisin-600
              marginBottom: "16px",
            }}
          >
            CTF Writeup
          </span>
        </div>

        {/* Bottom half text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexBasis: "50%",
          }}
        >
          <span
            style={{
              fontFamily: "RubikMedium",
              fontSize: "64px",
              color: "#252125", // theme dark
            }}
          >
            {articleMetadata.title}
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "RubikRegular",
              fontSize: "32px",
              color: "#48434a", // theme raisin-600
            }}
          >
            <span>
              By {articleAuthor.name} ({articleMetadata.author})
            </span>
            <span>
              {new Date(articleMetadata.publishedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { data: fontHorizon, name: "Horizon", style: "normal", weight: 600 },
        {
          data: fontRubikRegular,
          name: "RubikRegular",
          style: "normal",
          weight: 400,
        },
        {
          data: fontRubikMedium,
          name: "RubikMedium",
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
