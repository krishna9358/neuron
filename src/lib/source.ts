// Simple docs source using Vite's import.meta.glob for MDX files

export interface DocPage {
  slug: string;
  url: string;
  title: string;
  description?: string;
  Component: React.ComponentType;
}

export interface NavItem {
  title: string;
  url?: string;
  children?: NavItem[];
}

// Import all MDX files from content/docs
const docsModules = import.meta.glob("/content/docs/**/*.mdx", { eager: true });

// Build pages from the glob imports
export const pages: DocPage[] = Object.entries(docsModules).map(
  ([path, module]: [string, any]) => {
    // Extract slug from path: /content/docs/foo/bar.mdx -> "foo/bar"
    let slug = path.replace("/content/docs/", "").replace(".mdx", "");
    if (slug === "index") slug = "";

    return {
      slug,
      url: "/docs" + (slug ? "/" + slug : ""),
      title: module.frontmatter?.title || "Untitled",
      description: module.frontmatter?.description,
      Component: module.default,
    };
  }
);

// Get a page by its slug
export function getPage(slug: string): DocPage | undefined {
  return pages.find((p) => p.slug === slug);
}

// Navigation structure for the sidebar
// Add new pages here after creating them in content/docs/
export const navigation: NavItem[] = [
  {
    title: "Intro",
    url: "/docs",
  },
  {
    title: "Config",
    url: "/docs/config",
  },
  {
    title: "Providers",
    url: "/docs/providers",
  },
  {
    title: "Usage",
    children: [{ title: "CLI", url: "/docs/usage/cli" }],
  },
];
