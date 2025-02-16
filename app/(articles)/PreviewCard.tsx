"use client";

export default function PreviewCard({
  image,
  hidden,
  title,
  metadata,
}: {
  image: string;
  hidden: boolean;
  title: string;
  metadata: {
    author: string;
    date: string;
  };
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: "oklch(from var(--element) l c h / 0.2)",
      }}
      className={`article-preview-card flex aspect-[16/10] h-auto w-full flex-col items-end justify-between rounded-xl object-cover px-6 py-4 transition select-none ${hidden && "opacity-85 grayscale-32"}`}
      title={hidden ? undefined : title}
    >
      <span className={`text-xs ${hidden && "opacity-40"}`}>
        [ {metadata.date} ]
      </span>
      <span className={`text-xs ${hidden && "opacity-40"}`}>
        by [ {metadata.author} ]
      </span>
    </div>
  );
}
