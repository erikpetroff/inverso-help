import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { ReactNode } from "react";
import { blockText, headingId, splitNumber } from "@/lib/portable-text";
import type { ArticleBody as Body } from "@/lib/types";
import { dataset, projectId } from "@/sanity/env";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

function Heading({ as: Tag, value, children }: { as: "h2" | "h3"; value: PortableTextBlock; children: ReactNode }) {
  const { number, text } = splitNumber(blockText(value));
  return (
    <Tag id={headingId(value)}>
      {number ? (
        <>
          <span className="shrink-0 rounded-full bg-brand-mint px-2 py-0.5 text-xs leading-4 font-semibold tabular-nums">
            {number}
          </span>
          <span>{text}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </Tag>
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <Heading as="h2" value={value as PortableTextBlock}>
        {children}
      </Heading>
    ),
    h3: ({ children, value }) => (
      <Heading as="h3" value={value as PortableTextBlock}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p className="whitespace-pre-line">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    divider: () => <hr />,
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = imageBuilder.image(value).width(1400).fit("max").auto("format").url();
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt ?? ""} loading="lazy" className="w-full rounded-xl border" />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function ArticleBody({ value }: { value: Body }) {
  return (
    <div className="article-body">
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  );
}
