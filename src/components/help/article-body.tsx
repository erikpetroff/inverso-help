import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { createImageUrlBuilder } from "@sanity/image-url";
import { headingId } from "@/lib/portable-text";
import type { ArticleBody as Body } from "@/lib/types";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";

const imageBuilder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => <h2 id={headingId(value as PortableTextBlock)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(value as PortableTextBlock)}>{children}</h3>,
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
    divider: () => <hr className="my-8 border-border" />,
    image: ({ value }) => {
      if (!imageBuilder || !value?.asset) return null;
      const src = imageBuilder.image(value).width(1400).fit("max").auto("format").url();
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt ?? ""} loading="lazy" className="w-full rounded-lg border" />
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
