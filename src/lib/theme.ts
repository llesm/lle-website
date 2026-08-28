import { useEffect, useState } from "react";

/**
 * The company logo is expected at `public/lle-LOGO2.png`.
 * Relative URLs keep it working both in dev and on GitHub Pages
 * (where the site is served from a sub-path). We try a few common
 * spellings / locations so a slightly-off upload still works.
 */
export const LOGO_CANDIDATES = [
  // The logo lives in the public GitHub repo — load it straight from the
  // jsDelivr GitHub CDN (fast, cached, CORS-enabled so the theme sampler
  // can read its pixels). Falls back to raw.githubusercontent, then to a
  // file staged locally in public/.
  "https://cdn.jsdelivr.net/gh/llesm/lle-website@main/lle-LOGO2.png",
  "https://raw.githubusercontent.com/llesm/lle-website/main/lle-LOGO2.png",
  "./lle-LOGO2.png",
  "./lle-logo2.png",
  "./LLE-LOGO2.png",
  "./lle-logo.png",
  "./lle_LOGO2.png",
  "./llelogo2.png",
  "./logo-lle.png",
  "./logo.png",
  "./images/lle-LOGO2.png",
];

export const LOGO_SRC = LOGO_CANDIDATES[0];

/** Returns the first candidate that actually loads, else null. */
export function useFirstImage(candidates: string[]): string | null {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const tryAt = (i: number) => {
      if (i >= candidates.length || cancelled) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setSrc(candidates[i]);
      };
      img.onerror = () => tryAt(i + 1);
      img.src = candidates[i];
    };
    tryAt(0);
    return () => {
      cancelled = true;
    };
  }, [candidates]);
  return src;
}

/**
 * About-page hero background — the user-supplied `about-us-bg-lleweb.png`,
 * looked up locally first, then in the public GitHub repo via CDN.
 */
export const ABOUT_BG_CANDIDATES = [
  "./about-us-bg-lleweb.png",
  "https://cdn.jsdelivr.net/gh/llesm/lle-website@main/about-us-bg-lleweb.png",
  "https://raw.githubusercontent.com/llesm/lle-website/main/about-us-bg-lleweb.png",
  "./images/about-us-bg-lleweb.png",
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Required so canvas pixel-sampling isn't tainted on cross-origin URLs
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Resolves the first logo path that actually loads. */
export async function resolveLogo(): Promise<string | null> {
  for (const src of LOGO_CANDIDATES) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await loadImage(src);
      return src;
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function sampleAndApply(img: HTMLImageElement) {
  try {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    const buckets = 30;
    const weight = new Array<number>(buckets).fill(0);
    const hSum = new Array<number>(buckets).fill(0);
    const sSum = new Array<number>(buckets).fill(0);
    const lSum = new Array<number>(buckets).fill(0);

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 140) continue; // transparent
      const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
      if (s < 0.18 || l < 0.1 || l > 0.93) continue; // greys / extremes
      const b = Math.min(buckets - 1, Math.floor(h / (360 / buckets)));
      const w = s * (1.15 - Math.abs(l - 0.52));
      weight[b] += w;
      hSum[b] += h * w;
      sSum[b] += s * w;
      lSum[b] += l * w;
    }

    let best = -1;
    let bestW = 0;
    weight.forEach((w, i) => {
      if (w > bestW) {
        bestW = w;
        best = i;
      }
    });
    if (best < 0) return; // monochrome logo → keep default palette

    const h = Math.round(hSum[best] / bestW);
    const s = Math.max(0.72, Math.min(0.95, sSum[best] / bestW));
    const l = Math.max(0.5, Math.min(0.62, lSum[best] / bestW));

    const root = document.documentElement.style;
    root.setProperty(
      "--color-coral",
      `hsl(${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`
    );
    root.setProperty(
      "--color-aqua",
      `hsl(${(h + 165) % 360} ${Math.round(Math.min(0.85, s + 0.05) * 100)}% 64%)`
    );
    root.setProperty(
      "--color-amber",
      `hsl(${(h + 52) % 360} 90% 62%)`
    );
  } catch {
    /* canvas unavailable — keep default palette */
  }
}

/**
 * useLogoTheme — finds the uploaded logo, samples its colours at runtime and
 * retints the whole site (primary / secondary / tertiary accents) to match.
 * Falls back to the default palette for monochrome logos or a missing file.
 */
export function useLogoTheme() {
  useEffect(() => {
    let alive = true;
    (async () => {
      for (const src of LOGO_CANDIDATES) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const img = await loadImage(src);
          if (alive) sampleAndApply(img);
          break;
        } catch {
          /* try next candidate */
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
}
