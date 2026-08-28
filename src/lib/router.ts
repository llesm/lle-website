import { useEffect, useState } from "react";

/**
 * Featherweight hash router.
 *  - "#/about-us"  → the About Us sub-page
 *  - "#/" (or any plain anchor like "#services") → the home page
 * Plain anchors still work for in-page scrolling; goSection() handles
 * jumping to a home-page section even when a sub-page is open.
 */
export type Route = "home" | "about-us";

export const ABOUT_PATH = "#/about-us";
export const HOME_PATH = "#/";

export function getRoute(): Route {
  return window.location.hash.startsWith("#/about-us") ? "about-us" : "home";
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
        if (next === "about-us" && prev !== next) {
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
