import { useEffect, useState } from "react";

/**
 * Featherweight hash router.
 *  - "#/about-us"            → the About Us sub-page
 *  - "#/medical-content"     → the Medical Content Creation sub-page
 *  - "#/website-designing"   → the Website Designing sub-page
 *  - "#/" (or a plain anchor like "#services") → the home page
 * Plain anchors still work for in-page scrolling; goSection() handles
 * jumping to a home-page section even when a sub-page is open.
 */
export type Route = "home" | "about-us" | "medical-content" | "website-designing";

export const HOME_PATH = "#/";
export const ROUTE_PATHS: Record<Exclude<Route, "home">, string> = {
  "about-us": "#/about-us",
  "medical-content": "#/medical-content",
  "website-designing": "#/website-designing",
};
export const ABOUT_PATH = ROUTE_PATHS["about-us"];

export function getRoute(): Route {
  const h = window.location.hash;
  if (h.startsWith("#/about-us")) return "about-us";
  if (h.startsWith("#/medical-content")) return "medical-content";
  if (h.startsWith("#/website-designing")) return "website-designing";
  return "home";
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => getRoute());

  useEffect(() => {
    const onHash = () => {
      const next = getRoute();
      setRoute((prev) => {
        // Jumping between distinct pages should land at the top.
        if (next !== "home" && prev !== next) {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        return next;
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

/* ------------------------------------------------------------------ */
/* Service sub-pages                                                   */
/* ------------------------------------------------------------------ */

/** Home-page service accordion ids that have their own dedicated page. */
export const SERVICE_ROUTES: Record<string, Exclude<Route, "home">> = {
  "medical-content": "medical-content",
  "website-designing": "website-designing",
};

/** Correct href for a service's "Learn More" link (page or in-page anchor). */
export function serviceHref(id: string): string {
  const route = SERVICE_ROUTES[id];
  return route ? ROUTE_PATHS[route] : `#${id}`;
}

export function goRoute(route: Exclude<Route, "home">) {
  window.location.hash = ROUTE_PATHS[route];
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
    window.location.hash = HOME_PATH;
  } else {
    scrollToSection(id);
  }
}

/** Same as goSection but also auto-expands the matching service row. */
export function goService(id: string) {
  pendingService = id;
  goSection(id);
}

/**
 * Navigate to a service's dedicated page when it has one; otherwise fall
 * back to scrolling to (and expanding) its accordion row on the home page.
 */
export function goServiceNav(id: string) {
  const route = SERVICE_ROUTES[id];
  if (route) goRoute(route);
  else goService(id);
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
