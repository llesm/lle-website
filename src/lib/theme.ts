import { useEffect } from "react";

/**
 * The company logo lives in `public/lle-LOGO2.png`.
 * A relative URL keeps it working both in dev and on GitHub Pages
 * (where the site is served from a sub-path).
 */
export const LOGO_SRC = "./lle-LOGO2.png";

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

/**
 * useLogoTheme — samples the uploaded logo at runtime and retints the whole
 * site (primary / secondary / tertiary accents) to match the logo's own
 * colours. Falls back to the default palette for monochrome logos or if the
 * file is missing.
 */
export function useLogoTheme() {
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
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
    };
    img.src = LOGO_SRC;
  }, []);
}
