/* =============================================================================
 * <house-globe> — interactive dot-globe with city connections
 * World Famous House Crew — House Music Intelligence Database
 *
 * Dependency-free custom element. Renders in its own shadow DOM so it cannot
 * clash with or break any existing page styles.
 *
 * USAGE (plain HTML):
 *   <script src="/house-globe.js" defer></script>
 *   <house-globe></house-globe>                 <!-- globe + side rail -->
 *   <house-globe rail="false"></house-globe>    <!-- globe only -->
 *
 * Attributes (all optional):
 *   accent       hex accent colour            (default "#e9a23f")
 *   rail         "true" | "false"             (default "true"  — show city list)
 *   link-target  "_self" | "_blank"           (default "_self" — navigate same tab)
 *   auto-rotate  "true" | "false"             (default "true")
 *   arcs         "true" | "false"             (default "true"  — Chicago→city arcs)
 *
 * Override the city list before it connects, or with a JSON child:
 *   <house-globe>
 *     <script type="application/json">
 *       [{ "name":"Chicago","lat":41.88,"lon":-87.63,"count":16,
 *          "blurb":"…","origin":true,"url":"/?city=Chicago" }, …]
 *     </script>
 *   </house-globe>
 *
 * REACT / NEXT.JS: this is a client-only component. Import the file once
 * (e.g. in a useEffect, or `next/script` with strategy="afterInteractive"),
 * then use <house-globe /> in JSX. Pass a non-default city list by setting
 * the element's `.cities` property via a ref before it renders, or use the
 * JSON child above.
 * ========================================================================== */
(function () {
  if (typeof window === "undefined" || customElements.get("house-globe")) return;

  var DEFAULT_CITIES = [
    { name: "Chicago",      lat: 41.88,  lon: -87.63,  count: 16,   blurb: "Where house was born — The Warehouse", origin: true, url: "/?city=Chicago" },
    { name: "Detroit",      lat: 42.33,  lon: -83.05,  count: 84,   blurb: "Deep, soulful & machine-soul house", url: "/?city=Detroit" },
    { name: "New York",     lat: 40.71,  lon: -74.01,  count: 16,   blurb: "Garage, soulful & Latin house", url: "/?city=New%20York" },
    { name: "Los Angeles",  lat: 34.05,  lon: -118.24, count: 417,  blurb: "Deep, tech & West Coast house", url: "/la" },
    { name: "Toronto",      lat: 43.65,  lon: -79.38,  count: 5,    blurb: "Jackin house — Demuir", url: "/?city=Toronto" },
    { name: "London",       lat: 51.51,  lon: -0.13,   count: 34,   blurb: "Acid, tech & funky house", url: "/?city=London" },
    { name: "Manchester",   lat: 53.48,  lon: -2.24,   count: 3,    blurb: "Acid house & the Haçienda", url: "/?city=Manchester" },
    { name: "Paris",        lat: 48.86,  lon: 2.35,    count: 13,   blurb: "French touch / filter house", url: "/?city=Paris" },
    { name: "Berlin",       lat: 52.52,  lon: 13.40,   count: 33,   blurb: "Minimal & club culture", url: "/?city=Berlin" },
    { name: "Cologne",      lat: 50.94,  lon: 6.96,    count: null, blurb: "Microhouse — Kompakt", url: "/?city=Cologne" },
    { name: "Ibiza",        lat: 38.91,  lon: 1.43,    count: 1,    blurb: "The island that globalized house", url: "/?city=Ibiza" },
    { name: "Amsterdam",    lat: 52.37,  lon: 4.90,    count: 7,    blurb: "Future & dutch house", url: "/?city=Amsterdam" },
    { name: "Johannesburg", lat: -26.20, lon: 28.05,   count: 7,    blurb: "Afro house & amapiano", url: "/?city=Johannesburg" },
    { name: "Pretoria",     lat: -25.75, lon: 28.19,   count: 1,    blurb: "Amapiano ground zero", url: "/?city=Pretoria" },
    { name: "Lagos",        lat: 6.52,   lon: 3.38,    count: 4,    blurb: "Afro house & afrobeats crossover", url: "/?city=Lagos" },
    { name: "São Paulo",    lat: -23.55, lon: -46.63,  count: 2,    blurb: "Brazilian house & funk", url: "/?city=S%C3%A3o%20Paulo" },
    { name: "Tokyo",        lat: 35.68,  lon: 139.65,  count: 1,    blurb: "Deep & soulful house devotion", url: "/?city=Tokyo" }
  ];

  function hex2rgb(h) {
    h = (h || "#e9a23f").replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  function ll(lat, lon) {
    var p = lat * Math.PI / 180, l = lon * Math.PI / 180;
    return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
  }

  class HouseGlobe extends HTMLElement {
    connectedCallback() {
      this.accent = this.getAttribute("accent") || "#e9a23f";
      this.showArcs = this.getAttribute("arcs") !== "false";
      this.autoRotate = this.getAttribute("auto-rotate") !== "false";
      this.linkTarget = this.getAttribute("link-target") || "_self";
      this.showRail = this.getAttribute("rail") !== "false";

      // city data: .cities property > JSON child > defaults
      if (!this.cities) {
        var json = this.querySelector('script[type="application/json"]');
        if (json) { try { this.cities = JSON.parse(json.textContent); } catch (e) {} }
      }
      if (!this.cities) this.cities = DEFAULT_CITIES;

      this.rotX = 0.16; this.rotY = 1.0;
      this.target = null; this.dragging = false; this.moved = 0;
      this.last = { x: 0, y: 0 }; this.mouse = null;
      this.lastInteraction = 0; this.hoverIdx = -1; this.focusIdx = -1; this.dpr = 1;

      var root = this.attachShadow({ mode: "open" });
      root.innerHTML = this._markup();
      this.cv = root.getElementById("cv");
      this.ctx = this.cv.getContext("2d");
      this.railEl = root.getElementById("rail");

      for (var i = 0; i < this.cities.length; i++) this.cities[i].v = ll(this.cities[i].lat, this.cities[i].lon);
      this.dots = this._buildDots(960);
      this._buildArcs();
      this._buildRail();

      this._onDown = this._down.bind(this);
      this._onMove = this._move.bind(this);
      this._onUp = this._up.bind(this);
      this.cv.addEventListener("pointerdown", this._onDown);
      window.addEventListener("pointermove", this._onMove);
      window.addEventListener("pointerup", this._onUp);
      this.ro = new ResizeObserver(this._resize.bind(this));
      this.ro.observe(this.cv.parentElement);
      this._resize();
      this._draw();
      var self = this;
      var loop = function () { self._draw(); self.raf = requestAnimationFrame(loop); };
      this.raf = requestAnimationFrame(loop);
    }

    disconnectedCallback() {
      cancelAnimationFrame(this.raf);
      if (this.ro) this.ro.disconnect();
      window.removeEventListener("pointermove", this._onMove);
      window.removeEventListener("pointerup", this._onUp);
    }

    _markup() {
      var rail = this.showRail ? (
        '<aside id="rail-wrap">' +
          '<div class="rail-head"><span>SCENES</span><span class="ac">' + this.cities.length + '</span></div>' +
          '<div id="rail"></div>' +
        '</aside>'
      ) : "";
      return (
        '<style>' +
          ':host{display:block;font-family:"Space Grotesk",system-ui,sans-serif;color:#efe9dd;--ac:' + this.accent + ';}' +
          '.wrap{display:flex;gap:32px;align-items:center;justify-content:center;width:100%;height:100%;}' +
          '.globe{position:relative;flex:1 1 auto;min-width:0;max-width:660px;height:100%;min-height:300px;}' +
          '.glow{position:absolute;inset:6%;border-radius:50%;background:radial-gradient(circle at 38% 34%,rgba(233,162,63,.10),transparent 62%);filter:blur(8px);pointer-events:none;}' +
          'canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;cursor:grab;}' +
          '#rail-wrap{flex:0 0 256px;width:256px;}' +
          '.rail-head{display:flex;align-items:center;justify-content:space-between;padding:0 4px 12px;border-bottom:1px solid rgba(239,233,221,.08);margin-bottom:8px;font:500 10px "IBM Plex Mono",monospace;letter-spacing:.16em;color:#8f867a;}' +
          '.rail-head .ac{color:var(--ac);}' +
          '#rail{display:flex;flex-direction:column;gap:1px;max-height:62vh;overflow-y:auto;}' +
          '.row{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;border:1px solid transparent;cursor:pointer;transition:background .15s,border-color .15s;}' +
          '.row:hover{background:rgba(233,162,63,.08);border-color:rgba(233,162,63,.22);}' +
          '.row .nm{font:500 13.5px "Space Grotesk",sans-serif;color:#efe9dd;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
          '.row .bl{font:400 10px "IBM Plex Mono",monospace;color:#8f867a;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
          '.row .ct{font:500 12px "IBM Plex Mono",monospace;color:#c9a05a;flex:none;}' +
          '.tag{font:500 8px "IBM Plex Mono",monospace;letter-spacing:.1em;color:#0a0908;background:var(--ac);padding:2px 5px;border-radius:4px;flex:none;}' +
          '.lhs{flex:1;min-width:0;}.top{display:flex;align-items:center;gap:7px;}' +
          '@media(max-width:820px){.wrap{flex-direction:column;height:auto;}.globe{height:auto;aspect-ratio:1/1;}#rail-wrap{flex:none;width:100%;max-width:660px;}}' +
        '</style>' +
        '<div class="wrap">' +
          '<div class="globe"><div class="glow"></div><canvas id="cv"></canvas></div>' +
          rail +
        '</div>'
      );
    }

    _buildRail() {
      if (!this.railEl) return;
      var self = this;
      this.cities.forEach(function (c, i) {
        var row = document.createElement("div");
        row.className = "row";
        row.innerHTML =
          '<div class="lhs"><div class="top"><span class="nm"></span>' +
          (c.origin ? '<span class="tag">ORIGIN</span>' : "") + "</div>" +
          '<div class="bl"></div></div>' +
          '<span class="ct"></span>';
        row.querySelector(".nm").textContent = c.name;
        row.querySelector(".bl").textContent = c.blurb;
        row.querySelector(".ct").textContent = c.count != null ? String(c.count) : "";
        row.addEventListener("mouseenter", function () { self._focus(i); });
        row.addEventListener("click", function () { self._open(i); });
        self.railEl.appendChild(row);
      });
    }

    _buildDots(n) {
      var out = [], gr = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < n; i++) {
        var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = gr * i;
        out.push([Math.cos(t) * r, y, Math.sin(t) * r]);
      }
      return out;
    }
    _buildArcs() {
      var o = this.cities[0].v;
      for (var i = 1; i < this.cities.length; i++) {
        this.cities[i].arc = this._arc(o, this.cities[i].v, 50);
        this.cities[i].phase = Math.random();
      }
    }
    _arc(a, b, n) {
      var d = Math.max(-1, Math.min(1, a[0]*b[0]+a[1]*b[1]+a[2]*b[2]));
      var om = Math.acos(d), so = Math.sin(om), out = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, x, y, z;
        if (so < 1e-4) { x = a[0]; y = a[1]; z = a[2]; }
        else { var k0 = Math.sin((1-t)*om)/so, k1 = Math.sin(t*om)/so;
          x = k0*a[0]+k1*b[0]; y = k0*a[1]+k1*b[1]; z = k0*a[2]+k1*b[2]; }
        var m = Math.sqrt(x*x+y*y+z*z), lift = 1 + 0.19*Math.sin(Math.PI*t);
        out.push([x/m*lift, y/m*lift, z/m*lift]);
      }
      return out;
    }

    _resize() {
      var p = this.cv.parentElement, dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.dpr = dpr;
      var w = p.clientWidth, h = p.clientHeight;
      if (!w || !h) return;
      this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
      this.W = this.cv.width; this.H = this.cv.height;
      this.cx = this.W / 2; this.cy = this.H / 2;
      this.R = Math.min(this.W, this.H) / 2 * 0.84;
      if (this.dots) this._draw();
    }

    _down(e) {
      e.preventDefault();
      this.dragging = true; this.moved = 0;
      this.last = { x: e.clientX, y: e.clientY };
      this.lastInteraction = performance.now(); this.target = null;
      this.cv.style.cursor = "grabbing";
    }
    _move(e) {
      if (this.dragging) {
        var dx = e.clientX - this.last.x, dy = e.clientY - this.last.y;
        this.moved += Math.abs(dx) + Math.abs(dy);
        this.rotY += dx * 0.005;
        this.rotX = Math.max(-1.15, Math.min(1.15, this.rotX - dy * 0.005));
        this.last = { x: e.clientX, y: e.clientY };
        this.lastInteraction = performance.now();
        return;
      }
      var rect = this.cv.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
        this.mouse = { x: mx, y: my }; this._hover();
      } else { this.mouse = null; this._setHover(-1); }
    }
    _up() {
      if (!this.dragging) return;
      this.dragging = false;
      if (this.moved < 6 && this.hoverIdx >= 0) this._open(this.hoverIdx);
      this.lastInteraction = performance.now();
      this.cv.style.cursor = this.hoverIdx >= 0 ? "pointer" : "grab";
    }
    _setHover(i) {
      this.hoverIdx = i;
      if (!this.dragging) this.cv.style.cursor = i >= 0 ? "pointer" : "grab";
    }
    _hover() {
      if (!this.mouse) { this._setHover(-1); return; }
      var best = -1, bd = 18;
      for (var i = 0; i < this.cities.length; i++) {
        var c = this.cities[i];
        if (!c.front || c.sx == null) continue;
        var d = Math.hypot(c.sx - this.mouse.x, c.sy - this.mouse.y);
        if (d < bd) { bd = d; best = i; }
      }
      this._setHover(best);
    }
    _focus(i) {
      var c = this.cities[i];
      this.target = { x: c.lat * Math.PI / 180, y: -c.lon * Math.PI / 180 };
      this.focusIdx = i; this.hoverIdx = i;
      this.lastInteraction = performance.now();
    }
    _open(i) {
      var url = this.cities[i].url;
      if (this.linkTarget === "_blank") window.open(url, "_blank", "noopener");
      else window.location.href = url;
    }

    _roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    _draw() {
      var ctx = this.ctx;
      if (!ctx || !this.R) return;
      var now = performance.now(), accent = hex2rgb(this.accent);
      var A = accent.r + "," + accent.g + "," + accent.b;

      if (this.target) {
        var dy = this.target.y - this.rotY;
        while (dy > Math.PI) dy -= 2 * Math.PI;
        while (dy < -Math.PI) dy += 2 * Math.PI;
        this.rotY += dy * 0.1;
        this.rotX += (this.target.x - this.rotX) * 0.1;
        if (Math.abs(dy) < 0.002 && Math.abs(this.target.x - this.rotX) < 0.002) this.target = null;
      } else if (this.autoRotate && !this.dragging && now - this.lastInteraction > 2200) {
        this.rotY += 0.0015;
      }

      var cyaw = Math.cos(this.rotY), syaw = Math.sin(this.rotY);
      var cpit = Math.cos(this.rotX), spit = Math.sin(this.rotX);
      var R = this.R, cx = this.cx, cy = this.cy, dpr = this.dpr;
      function rot(x, y, z) {
        var x1 = x * cyaw + z * syaw, z1 = -x * syaw + z * cyaw;
        return [x1, y * cpit - z1 * spit, y * spit + z1 * cpit];
      }

      ctx.clearRect(0, 0, this.W, this.H);
      var g = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.32, R * 0.15, cx, cy, R);
      g.addColorStop(0, "rgba(32,27,22,0.95)"); g.addColorStop(1, "rgba(12,10,9,0.96)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fillStyle = g; ctx.fill();

      for (var di = 0; di < this.dots.length; di++) {
        var d = this.dots[di], p = rot(d[0], d[1], d[2]);
        if (p[2] <= 0) continue;
        ctx.beginPath();
        ctx.arc(cx + p[0] * R, cy - p[1] * R, 1.05 * dpr, 0, 7);
        ctx.fillStyle = "rgba(152,141,124," + (0.10 + p[2] * 0.40) + ")";
        ctx.fill();
      }

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7);
      ctx.strokeStyle = "rgba(" + A + ",0.16)"; ctx.lineWidth = 1.2 * dpr; ctx.stroke();

      if (this.showArcs) {
        for (var k = 1; k < this.cities.length; k++) {
          var c = this.cities[k];
          if (!c.arc) continue;
          ctx.lineWidth = 1.1 * dpr;
          for (var i = 0; i < c.arc.length - 1; i++) {
            var pp = rot(c.arc[i][0], c.arc[i][1], c.arc[i][2]);
            var q = rot(c.arc[i + 1][0], c.arc[i + 1][1], c.arc[i + 1][2]);
            if (pp[2] < -0.05 && q[2] < -0.05) continue;
            var za = Math.max(0, (pp[2] + q[2]) / 2);
            ctx.beginPath();
            ctx.moveTo(cx + pp[0] * R, cy - pp[1] * R);
            ctx.lineTo(cx + q[0] * R, cy - q[1] * R);
            ctx.strokeStyle = "rgba(" + A + "," + (0.05 + za * 0.30) + ")";
            ctx.stroke();
          }
          var t = (now * 0.00016 + c.phase) % 1;
          var pi = Math.floor(t * (c.arc.length - 1));
          var ps = rot(c.arc[pi][0], c.arc[pi][1], c.arc[pi][2]);
          if (ps[2] > 0) {
            ctx.beginPath();
            ctx.arc(cx + ps[0] * R, cy - ps[1] * R, 2.1 * dpr, 0, 7);
            ctx.fillStyle = "rgba(" + A + "," + (0.5 + 0.4 * ps[2]) + ")";
            ctx.shadowBlur = 8 * dpr; ctx.shadowColor = "rgba(" + A + ",0.85)";
            ctx.fill(); ctx.shadowBlur = 0;
          }
        }
      }

      for (var ci = 0; ci < this.cities.length; ci++) {
        var cc = this.cities[ci], pv = rot(cc.v[0], cc.v[1], cc.v[2]);
        cc.front = pv[2] > 0.02;
        cc.sx = (cx + pv[0] * R) / dpr; cc.sy = (cy - pv[1] * R) / dpr;
        if (!cc.front) continue;
        var sx = cx + pv[0] * R, sy = cy - pv[1] * R;
        var hot = (ci === this.hoverIdx) || (ci === this.focusIdx);
        var baseR = cc.origin ? 4.0 : 2.9;
        if (hot || cc.origin) {
          ctx.beginPath(); ctx.arc(sx, sy, (cc.origin ? 9 : 8) * dpr, 0, 7);
          ctx.strokeStyle = "rgba(" + A + "," + (hot ? 0.7 : 0.32) + ")";
          ctx.lineWidth = 1.2 * dpr; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(sx, sy, (hot ? baseR + 1.2 : baseR) * dpr, 0, 7);
        ctx.fillStyle = "rgba(" + A + "," + (0.72 + 0.28 * pv[2]) + ")";
        if (hot) { ctx.shadowBlur = 12 * dpr; ctx.shadowColor = "rgba(" + A + ",0.9)"; }
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(sx, sy, (cc.origin ? 1.6 : 1.2) * dpr, 0, 7);
        ctx.fillStyle = "rgba(10,9,8,0.92)"; ctx.fill();
      }

      if (this.hoverIdx >= 0 && this.cities[this.hoverIdx].front) {
        var h = this.cities[this.hoverIdx];
        var hsx = h.sx * dpr, hsy = h.sy * dpr;
        var meta = (h.count ? h.count + " artists" : "scene") + " · " + h.blurb;
        ctx.font = "600 " + (13 * dpr) + 'px "Space Grotesk", sans-serif';
        var w1 = ctx.measureText(h.name).width;
        ctx.font = (10 * dpr) + 'px "IBM Plex Mono", monospace';
        var w2 = ctx.measureText(meta).width;
        var pad = 10 * dpr, bw = Math.max(w1, w2) + pad * 2, bh = 44 * dpr;
        var bx = hsx + 13 * dpr, by = hsy - bh - 9 * dpr;
        if (bx + bw > this.W) bx = hsx - bw - 13 * dpr;
        if (by < 0) by = hsy + 11 * dpr;
        this._roundRect(ctx, bx, by, bw, bh, 7 * dpr);
        ctx.fillStyle = "rgba(10,9,8,0.94)"; ctx.fill();
        ctx.strokeStyle = "rgba(" + A + ",0.4)"; ctx.lineWidth = dpr; ctx.stroke();
        ctx.textBaseline = "top";
        ctx.font = "600 " + (13 * dpr) + 'px "Space Grotesk", sans-serif';
        ctx.fillStyle = "#efe9dd";
        ctx.fillText(h.name, bx + pad, by + pad);
        ctx.font = (10 * dpr) + 'px "IBM Plex Mono", monospace';
        ctx.fillStyle = "rgba(" + A + ",0.88)";
        ctx.fillText(meta, bx + pad, by + pad + 18 * dpr);
      }
    }
  }

  customElements.define("house-globe", HouseGlobe);
})();
