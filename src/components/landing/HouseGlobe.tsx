"use client";

import Script from "next/script";
import { SCENES } from "./scenes";

// Thin wrapper around the dependency-free <house-globe> custom element
// (public/house-globe.js). Feeds it LIVE per-city artist counts from the DB via
// a JSON child, and maps our SCENES metadata into the element's city schema so
// clicks land on the real directory URLs (/?city=… or /la).
export default function HouseGlobe({
  sceneCounts,
  rail = true,
  arcs = true,
}: {
  sceneCounts: Record<string, number>;
  rail?: boolean;
  arcs?: boolean;
}) {
  const cities = SCENES.map((s) => ({
    name: s.name,
    lat: s.lat,
    lon: s.lng,
    count: sceneCounts[s.city] ?? null,
    blurb: s.note,
    origin: !!s.origin,
    url: s.city === "Los Angeles" ? "/la" : `/?city=${encodeURIComponent(s.city)}`,
  }));

  // Below 820px the element stacks (and sizes the globe by aspect-ratio); at/above
  // 820px it lays out as a row and the globe fills a defined height — so give it
  // one at the same breakpoint to avoid a collapsed (0-height) globe.
  return (
    <>
      <Script src="/house-globe.js" strategy="afterInteractive" />
      <div className="h-auto min-[820px]:h-[560px]">
        <house-globe
          rail={String(rail)}
          arcs={String(arcs)}
          accent="#e9a23f"
          style={{ display: "block", height: "100%" }}
        >
          <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cities) }} />
        </house-globe>
      </div>
    </>
  );
}
