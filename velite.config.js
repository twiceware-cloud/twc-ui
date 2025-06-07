import { join } from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

const docs = defineCollection({
    name: "Doc",
    pattern: "docs/**/*.mdx",
    schema: s.object({
        slug: s.slug("docs"),
        path: s.path(),
        title: s.string().max(99),
        description: s.string().max(200),
        links: s
            .object({
                api: s.string().optional(),
            })
            .optional(),
        code: s.mdx(),
        toc: s.toc(),
        pagerPrev: s
            .object({
                href: s.string(),
                title: s.string(),
            })
            .optional(),
        pagerNext: s
            .object({
                href: s.string(),
                title: s.string(),
            })
            .optional(),
    }),
});

const blocks = defineCollection({
    name: "Block",
    pattern: "blocks/**/*.mdx",
    schema: s.object({
        slug: s.slug("blocks"),
        path: s.path(),
        title: s.string().max(99),
        description: s.string().max(100),
        code: s.mdx(),
        toc: s.toc(),
    }),
});

export default defineConfig({
    root: join(process.cwd(), "./content/"),
    collections: {
        docs,
        blocks,
    },
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
});
