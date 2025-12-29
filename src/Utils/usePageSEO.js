import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SLUG_DESCRIPTIONS, TITLES, PAGE_DESCRIPTIONS } from "../metaData";

export default function usePageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "JK GRANI MARMO Ajmer | Alphonso Brown Granite Manufacturer & Supplier";
    let description =
      "JK Grani Marmo Ajmer is a leading manufacturer and supplier of Alphonso Brown Granite slabs and tiles. Premium quality granite for global export.";

    const slug = pathname.replace("/", "");

    // Static routes
    if (TITLES[pathname]) {
      title = TITLES[pathname];
      if (PAGE_DESCRIPTIONS[pathname]) {
        description = PAGE_DESCRIPTIONS[pathname];
      }
    }
    // Dynamic slug routes
    else if (SLUG_DESCRIPTIONS[slug]) {
      title = SLUG_DESCRIPTIONS[slug].title;
      description = SLUG_DESCRIPTIONS[slug].description;
    }
    // Fallback
    else if (slug) {
      const pretty = slug.replace(/-/g, " ");
      title = pretty.charAt(0).toUpperCase() + pretty.slice(1) + " | JK GRANI MARMO Ajmer";
    }

    // Update Title
    document.title = title;

    // Update Meta Description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // Update Canonical URL
    const canonicalURL = window.location.origin + pathname;
    let link = document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalURL);
  }, [pathname]);
}
