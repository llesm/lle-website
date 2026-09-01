import { useEffect, useState } from "react";

/**
 * Featherweight path router (History API) — clean, SEO-friendly URLs:
 *  - /about-us            → the About Us sub-page
 *  - /medical-content     → the Medical Content Creation sub-page
 *  - /website-designing   → the Website Designing sub-page
 *  - / (plus #section anchors) → the home page
 *
 * URLs are written *relative* so the site works both at a domain root
 * (Vercel) and under a repo sub-path (GitHub Pages). Hosts must serve
 * index.html for the three paths: vercel.json does this via rewrites,
 * GitHub Pages via the public/404.html bounce + index.html boot script.
 *
 * Legacy "#/about-us" hash shares still resolve and are canonicalised
 * to the clean path on boot (see index.html).
 */
export type Route =
  | "home"
  | "about-us"
  | "medical-content"
  | "website-designing"
  | "app-development"
  | "ecommerce"
  | "shopify";

export const SUB_ROUTES: Exclude<Route, "home">[] = [
  "about-us",
  "medical-content",
  "website-designing",
  "app-development",
  "ecommerce",
  "shopify",
];

export const ROUTE_PATHS: Record<Exclude<Route, "home">, string> = {
  "about-us": "about-us",
  "medical-content": "medical-content",
  "website-designing": "website-designing",
  "app-development": "app-development",
  ecommerce: "ecommerce",
  shopify: "shopify",
};
export const ABOUT_PATH = ROUTE_PATHS["about-us"];

const ROUTE_EVENT = "lle:route-change";
const emitRouteChange = () => window.dispatchEvent(new Event(ROUTE_EVENT));

/** True when an href points at one of the sub-pages (relative form). */
export function isRouteHref(href: string): boolean {
  const clean = href.replace(/^\.\//, "").replace(/^\/+/, "").replace(/\/+$/, "");
  return (SUB_ROUTES as string[]).includes(clean);
}

function normalize(href: string): Exclude<Route, "home"> {
  return href.replace(/^\.\//, "").replace(/^\/+/, "").replace(/\/+$/, "") as Exclude<
    Route,
    "home"
  >;
}

export function getRoute(): Route {
  // Legacy hash shares (#/about-us) — the boot script rewrites these to
  // clean paths, but resolve them anyway so nothing ever breaks.
  const h = window.location.hash;
  if (h.startsWith("#/about-us")) return "about-us";
  if (h.startsWith("#/medical-content")) return "medical-content";
  if (h.startsWith("#/website-designing")) return "website-designing";
  if (h.startsWith("#/app-development")) return "app-development";
  if (h.startsWith("#/ecommerce")) return "ecommerce";
  if (h.startsWith("#/shopify")) return "shopify";

  const p = window.location.pathname.replace(/\/+$/, "");
  if (p.endsWith("/about-us")) return "about-us";
  if (p.endsWith("/medical-content")) return "medical-content";
  if (p.endsWith("/website-designing")) return "website-designing";
  if (p.endsWith("/app-development")) return "app-development";
  if (p.endsWith("/ecommerce")) return "ecommerce";
  if (p.endsWith("/shopify")) return "shopify";
  return "home";
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => getRoute());

  useEffect(() => {
    const sync = () => {
      const next = getRoute();
      setRoute((prev) => {
        // Landing on a fresh page should start at the top.
        if (next !== prev && next !== "home") {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        return next;
      });
    };
    window.addEventListener(ROUTE_EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener(ROUTE_EVENT, sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return route;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export function goRoute(route: Exclude<Route, "home">) {
  if (getRoute() === route) {
    window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
    return;
  }
  window.history.pushState(null, "", ROUTE_PATHS[route]);
  emitRouteChange();
}

export function goRouteHref(href: string) {
  if (isRouteHref(href)) goRoute(normalize(href));
}

/* ------------------------------------------------------------------ */
/* Service sub-pages                                                   */
/* ------------------------------------------------------------------ */

/** Home-page service accordion ids that have their own dedicated page. */
export const SERVICE_ROUTES: Record<string, Exclude<Route, "home">> = {
  "medical-content": "medical-content",
  "website-designing": "website-designing",
  "app-development": "app-development",
  ecommerce: "ecommerce",
  shopify: "shopify",
};

/** Correct href for a service's "Learn More" link (page or in-page anchor). */
export function serviceHref(id: string): string {
  const route = SERVICE_ROUTES[id];
  return route ? ROUTE_PATHS[route] : `#${id}`;
}

/* ------------------------------------------------------------------ */
/* Cross-route section navigation                                      */
/* ------------------------------------------------------------------ */
let pendingSection: string | null = null;
let pendingService: string | null = null;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
}

/** Scroll to a home-page section, navigating home first if needed. */
export function goSection(id: string) {
  if (getRoute() !== "home") {
    pendingSection = id;
    window.history.pushState(null, "", "./");
    emitRouteChange();
  } else {
    scrollToSection(id);
  }
}

/** Same as goSection, but opens the dedicated page when one exists. */
export function goServiceNav(id: string) {
  const route = SERVICE_ROUTES[id];
  if (route) {
    goRoute(route);
    return;
  }
  pendingService = id;
  goSection(id);
}

/** Called by the home view once mounted. */
export function consumePendingSection() {
  if (!pendingSection) return;
  const id = pendingSection;
  pendingSection = null;
  requestAnimationFrame(() => scrollToSection(id));
}

/** Called by the services accordion once mounted. */
export function consumePendingService(): string | null {
  const id = pendingService;
  pendingService = null;
  return id;
}
