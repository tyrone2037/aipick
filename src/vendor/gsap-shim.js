// Minimal gsap shim — pure JS, no TypeScript
class Tween {
  constructor(t, f, tv, d, delay, cb) {
    this.target = t; this.fromVars = f || {}; this.toVars = tv || {};
    this.duration = (d || 0) * 1000; this.delay = (delay || 0) * 1000;
    this.elapsed = 0; this._rafId = null; this._onComplete = cb || null;
  }
  _cv(k) {
    const s = this.target.style;
    if (k === "opacity") return parseFloat(s.opacity || "1");
    if (k === "y") { const m = /translateY\(([-\d.]+)/.exec(s.transform || ""); return m ? parseFloat(m[1]) : 0; }
    if (k === "scale") { const m = /scale\(([-\d.]+)/.exec(s.transform || ""); return m ? parseFloat(m[1]) : 1; }
    if (k === "xPercent") { const m = /translateX\(([-\d.]+)/.exec(s.transform || ""); return m ? parseFloat(m[1]) : 0; }
    if (k === "height") return this.target.offsetHeight;
    return 0;
  }
  _set(t, k, v) {
    if (k === "y") t.style.transform = "translateY(" + v + "px)";
    else if (k === "opacity") t.style.opacity = "" + v;
    else if (k === "scale") t.style.transform = "scale(" + v + ")";
    else if (k === "xPercent") t.style.transform = "translateX(" + v + "%)";
    else if (k === "rotate") t.style.transform = "rotate(" + v + "deg)";
    else t.style[k] = v;
  }
  _apply(p) {
    if (!this.target) return;
    for (const k in this.toVars) {
      if (k === "ease" || k === "overwrite" || k === "transformOrigin") continue;
      const fv = this.fromVars[k] !== undefined ? this.fromVars[k] : this._cv(k);
      this._set(this.target, k, fv + (this.toVars[k] - fv) * p);
    }
  }
  start() {
    this.elapsed = 0;
    for (const k in this.fromVars) { if (k === "ease" || k === "overwrite" || k === "transformOrigin") continue; this._set(this.target, k, this.fromVars[k]); }
    const t0 = performance.now();
    const loop = (now) => {
      this.elapsed = now - t0;
      if (this.elapsed < this.delay) { this._rafId = requestAnimationFrame(loop); return; }
      const p = this.duration > 0 ? Math.min((this.elapsed - this.delay) / this.duration, 1) : 1;
      this._apply(p);
      if (p < 1) this._rafId = requestAnimationFrame(loop);
      else { this._rafId = null; this._onComplete && this._onComplete(); }
    };
    this._rafId = requestAnimationFrame(loop);
  }
  kill() { if (this._rafId !== null) cancelAnimationFrame(this._rafId); this._rafId = null; this.elapsed = 0; }
}
class TL {
  constructor(opts = {}) {
    this.segments = [];
    this._onReverseComplete = null;
    this._onComplete = null;
    this._rafId = null;
    this._startTime = null;
  }
  to(target, vars, position) {
    const dur = vars.duration || 0;
    const delay = vars.delay || 0;
    const stagger = vars.stagger || 0;
    const targets = Array.isArray(target) ? target : [target];
    const startTime = typeof position === "number" ? position : 0;
    targets.forEach((t, i) => {
      const fromVars = {};
      const toVars = {};
      for (const k in vars) {
        if (["ease","overwrite","transformOrigin","duration","delay","stagger"].indexOf(k) !== -1) continue;
        if (k === "y") fromVars[k] = 50;
        else if (k === "opacity") fromVars[k] = 0;
        else fromVars[k] = 0;
        toVars[k] = vars[k];
      }
      const st = Math.max(0, startTime + (stagger * i));
      this.segments.push({ target: t, fromVars, toVars, startTime: st, dur, delay });
    });
    return this;
  }
  duration() {
    let m = 0;
    this.segments.forEach(s => { m = Math.max(m, s.startTime + s.dur + s.delay); });
    return m;
  }
  eventCallback(type, cb) {
    if (type === "onReverseComplete") this._onReverseComplete = cb;
    if (type === "onComplete") this._onComplete = cb;
    return this;
  }
  play(position) {
    this._startTime = null;
    const total = this.duration();
    const startFrom = (position || 0);
    const loop = (now) => {
      if (!this._startTime) this._startTime = now - startFrom * 1000;
      const elapsed = (now - this._startTime) / 1000;
      this.segments.forEach(s => {
        const segStart = s.startTime + s.delay;
        const p = s.dur > 0 ? Math.max(0, Math.min(1, (elapsed - segStart) / s.dur)) : 1;
        if (elapsed >= segStart && s.target) {
          for (const k in s.toVars) {
            if (k === "ease" || k === "overwrite" || k === "transformOrigin") continue;
            const fv = s.fromVars[k] !== undefined ? s.fromVars[k] : 0;
            const val = fv + (s.toVars[k] - fv) * p;
            if (k === "y") s.target.style.transform = "translateY(" + val + "px)";
            else if (k === "opacity") s.target.style.opacity = "" + val;
            else if (k === "scale") s.target.style.transform = "scale(" + val + ")";
            else if (k === "xPercent") s.target.style.transform = "translateX(" + val + "%)";
            else if (k === "height") s.target.style.height = val + "px";
            else s.target.style[k] = val;
          }
        }
      });
      if (elapsed < total) { this._rafId = requestAnimationFrame(loop); }
      else { this._rafId = null; if (this._onComplete) this._onComplete(); }
    };
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = requestAnimationFrame(loop);
  }
  reverse() {
    this._startTime = null;
    const total = this.duration();
    const loop = (now) => {
      if (!this._startTime) this._startTime = now;
      const elapsed = (now - this._startTime) / 1000;
      const reversedTime = total - elapsed;
      this.segments.forEach(s => {
        const segStart = s.startTime + s.delay;
        const p = s.dur > 0 ? Math.max(0, Math.min(1, (reversedTime - segStart) / s.dur)) : 1;
        if (reversedTime >= segStart && s.target) {
          for (const k in s.toVars) {
            if (k === "ease" || k === "overwrite" || k === "transformOrigin") continue;
            const fv = s.fromVars[k] !== undefined ? s.fromVars[k] : 0;
            const val = fv + (s.toVars[k] - fv) * p;
            if (k === "y") s.target.style.transform = "translateY(" + val + "px)";
            else if (k === "opacity") s.target.style.opacity = "" + val;
            else if (k === "height") s.target.style.height = val + "px";
            else s.target.style[k] = val;
          }
        }
      });
      if (elapsed < total) { this._rafId = requestAnimationFrame(loop); }
      else { this._rafId = null; if (this._onReverseComplete) this._onReverseComplete(); }
    };
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = requestAnimationFrame(loop);
  }
  kill() { if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; } }
}
function _set(el, v) {
  if (!el || !v) return;
  const apply = (e) => {
    if (!e) return;
    for (const k in v) {
      if (k === "xPercent") e.style.transform = "translateX(" + v[k] + "%)";
      else if (k === "y") e.style.transform = "translateY(" + v[k] + "px)";
      else if (k === "scale") e.style.transform = "scale(" + v[k] + ")";
      else if (k === "rotate") e.style.transform = "rotate(" + v[k] + "deg)";
      else if (k !== "overwrite" && k !== "transformOrigin") e.style[k] = v[k];
    }
  };
  if (Array.isArray(el)) el.forEach(apply); else apply(el);
}
function _get(el, p) {
  if (p === "opacity") return parseFloat(el.style.opacity || "1");
  const m = /translateY\(([-\d.]+)/.exec(el.style.transform || ""); if (p === "y" && m) return parseFloat(m[1]);
  const m2 = /scale\(([-\d.]+)/.exec(el.style.transform || ""); if (p === "scale" && m2) return parseFloat(m2[1]);
  return 0;
}
export const gsap = {
  set: (t, v) => { _set(t, v); },
  to: (t, v) => { const fv = {}; for (const k in v) { if (["ease","overwrite","transformOrigin","duration","delay"].indexOf(k) !== -1) continue; fv[k] = _get(t, k); } const tw = new Tween(t, fv, v, v.duration || 0, v.delay || 0, v.onComplete); tw.start(); return tw; },
  fromTo: (t, fv, tv) => { _set(t, fv); const tw = new Tween(t, fv, tv, tv.duration || 0, tv.delay || 0, tv.onComplete); tw.start(); return tw; },
  timeline: (opts) => new TL(opts),
};