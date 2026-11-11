import Image from "next/image";
import clsx from "clsx";
import type { ResolvedAsset } from "@/lib/assets";

type Props = {
  asset: ResolvedAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** fill the parent (parent must be positioned and sized) */
  fill?: boolean;
};

const DEV = process.env.NODE_ENV !== "production";

/**
 * Renders a registry asset (see IMAGE_ASSETS.md).
 * While the real file is missing:
 *  - background-free cut-outs render nothing in production, and a thin
 *    dashed drop-zone with the expected filename during development;
 *  - photos render a plain dark tile (filename shown in development only).
 */
export default function Pic({ asset, className, imgClassName, sizes = "100vw", priority, fill }: Props) {
  if (!asset.src) {
    const cls = clsx(className, fill && "absolute inset-0");
    if (asset.kind === "cutout") return DEV ? <DropZone asset={asset} className={cls} /> : null;
    return <PhotoSlot asset={asset} className={cls} />;
  }

  const common = { src: asset.src, sizes, priority, draggable: false };

  if (fill) {
    return <Image {...common} alt={asset.alt} fill className={clsx("object-cover", imgClassName, className)} />;
  }
  return (
    <Image
      {...common}
      alt={asset.alt}
      width={asset.w}
      height={asset.h}
      className={clsx("h-auto w-full select-none", imgClassName, className)}
    />
  );
}

const fileOf = (a: ResolvedAsset) => a.expected.replace(/^public\//, "");
const isAbs = (c?: string) => c?.includes("absolute");

function DropZone({ asset, className }: { asset: ResolvedAsset; className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "flex items-center justify-center rounded-lg border border-dashed border-ink/20 p-2 text-center",
        !isAbs(className) && "w-full",
        className,
      )}
      style={isAbs(className) ? undefined : { aspectRatio: `${asset.w} / ${asset.h}` }}
    >
      <span className="text-[0.55rem] uppercase leading-relaxed tracking-[0.18em] text-muted">
        {fileOf(asset)}
        <br />
        <span className="text-muted/60">
          {asset.w}×{asset.h} · transparent
        </span>
      </span>
    </div>
  );
}

function PhotoSlot({ asset, className }: { asset: ResolvedAsset; className?: string }) {
  return (
    <div
      role="img"
      aria-label={asset.alt || "Image"}
      className={clsx("relative overflow-hidden", !isAbs(className) && "w-full", className)}
      style={{
        ...(isAbs(className) ? {} : { aspectRatio: `${asset.w} / ${asset.h}` }),
        background:
          "#e4dbcf",
      }}
    >
      {DEV && (
        <span className="absolute inset-x-0 bottom-0 truncate p-3 text-[0.55rem] uppercase tracking-[0.18em] text-muted">
          {fileOf(asset)} · {asset.w}×{asset.h}
        </span>
      )}
    </div>
  );
}
