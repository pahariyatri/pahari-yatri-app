import fs from "fs";
import path from "path";

/** Thematic stand-in used until a real photo is added for a trek/story. */
export const FALLBACK_IMAGE = "/static/images/mountains-bg.jpg";

/** Verify a referenced public image actually exists on disk and substitute a
 *  real fallback if not. Safe for statically-generated pages (build-time fs
 *  access). Prevents broken-image flashes and keeps OG/social previews valid. */
export function resolveImage(img?: string | null): string {
  if (!img) return FALLBACK_IMAGE;
  try {
    const p = path.join(process.cwd(), "public", img.replace(/^\/+/, ""));
    return fs.existsSync(p) ? img : FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}
