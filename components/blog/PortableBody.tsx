import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { hasAsset, urlForImage, type SanityImage } from "@/lib/sanity/image";

type CodeBlock = { code?: string; language?: string; filename?: string };
type Callout = { tone?: "info" | "tip" | "warning"; text?: string };

export function SanityFigure({
  image,
  sizes = "(max-width: 800px) 100vw, 760px",
  priority = false,
}: {
  image: SanityImage | null | undefined;
  sizes?: string;
  priority?: boolean;
}) {
  if (!hasAsset(image)) return null;
  const width = image.dimensions?.width ?? 1600;
  const height = image.dimensions?.height ?? 900;
  return (
    <figure className="article-figure">
      <Image
        src={urlForImage(image).width(Math.min(width, 2000)).url()}
        alt={image.alt ?? ""}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        placeholder={image.lqip ? "blur" : "empty"}
        blurDataURL={image.lqip ?? undefined}
        style={{ width: "100%", height: "auto" }}
      />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    imageWithAlt: ({ value }: { value: SanityImage }) => (
      <SanityFigure image={value} />
    ),
    codeBlock: ({ value }: { value: CodeBlock }) => (
      <figure className="article-code">
        {value.filename && <figcaption>{value.filename}</figcaption>}
        <pre>
          <code data-language={value.language}>{value.code}</code>
        </pre>
      </figure>
    ),
    callout: ({ value }: { value: Callout }) => (
      <aside className={`article-callout article-callout-${value.tone ?? "info"}`}>
        <p>{value.text}</p>
      </aside>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-link"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] | null }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
