import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Lets TSX accept the <house-globe> custom element (defined in /public/house-globe.js).
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "house-globe": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          rail?: string;
          arcs?: string;
          accent?: string;
          "auto-rotate"?: string;
          "link-target"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
