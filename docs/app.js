(() => {
const P = window.PORTFOLIO, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, a = {}, h = "") => { const e = document.createElement(t); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); e.innerHTML = h; return e; };
const NS = "http://www.w3.org/2000/svg";
const svg = (t, a = {}, h = "") => { const e = document.createElementNS(NS, t); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); e.innerHTML = h; return e; };
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const money = c => "$" + Math.floor(c / 100).toLocaleString() + "." + String(c % 100).padStart(2, "0");
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1600); };

// ---- header / links / theme
$("#tagline").textContent = P.tagline;
$("#about-text").textContent = P.about;
P.glance.forEach(([k, v]) => $("#glance").append(el("dt", {}, k), el("dd", {}, v)));
$("#li").href = $("#li2").href = P.linkedin; $("#gh").href = P.repo; $("#mail").href = "mailto:" + P.email;
$("#yr").textContent = new Date().getFullYear();
$("#theme").onclick = () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark"; drawAll(); };

// ---- stats count-up
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
P.stats.forEach(s => $("#stats").append(el("div", { class: "stat" }, `<div class="v" data-v="${s.value}" data-d="${s.decimals || 0}" data-s="${s.suffix}" data-c="${s.comma ? 1 : 0}">0</div><div class="l">${s.label}</div><div class="s">${s.sub}</div>`)));
const fmt = (v, d, c, s) => (c ? Math.round(v).toLocaleString() : v.toFixed(d)) + s;
$$(".stat .v").forEach(n => {
  const t = +n.dataset.v, d = +n.dataset.d, c = +n.dataset.c, s = n.dataset.s;
  if (reduce) { n.textContent = fmt(t, d, c, s); return; }
  new IntersectionObserver((es, o) => es.forEach(e => { if (!e.isIntersecting) return; o.disconnect(); const t0 = performance.now();
    const f = now => { const k = Math.min(1, (now - t0) / 1200), ease = 1 - Math.pow(1 - k, 3); n.textContent = fmt(t * ease, d, c, s); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); })).observe(n);
});

// ---- hero background (light particle network)
(() => { const c = $("#bg"), x = c.getContext("2d"); let w, h, pts;
  const init = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; pts = Array.from({ length: Math.min(60, w / 18) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })); };
  const draw = () => { x.clearRect(0, 0, w, h); const col = css("--blue");
    pts.forEach(p => { p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h; x.fillStyle = col; x.beginPath(); x.arc(p.x, p.y, 2, 0, 7); x.fill(); });
    pts.forEach((a, i) => pts.slice(i + 1).forEach(b => { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 120) { x.strokeStyle = col; x.globalAlpha = (1 - d / 120) * .35; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); x.globalAlpha = 1; } }));
    if (!reduce) requestAnimationFrame(draw); };
  init(); draw(); addEventListener("resize", init); })();

// ---- bar chart (zero baseline, rounded data ends, hover, table fallback)
function barChart(host, rows, { max, unit = "%", colors }) {
  host.innerHTML = ""; const W = 460, H = 220, pad = { l: 12, r: 12, t: 24, b: 44 }, bw = Math.min(80, (W - pad.l - pad.r) / rows.length - 24);
  const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": rows.map(r => `${r.label} ${r.text || r.value + unit}`).join(", ") });
  s.append(svg("line", { x1: pad.l, x2: W - pad.r, y1: H - pad.b, y2: H - pad.b, stroke: css("--line"), "stroke-width": 1 }));
  rows.forEach((r, i) => { const x = pad.l + (i + .5) * (W - pad.l - pad.r) / rows.length - bw / 2, bh = (H - pad.t - pad.b) * r.value / max, y = H - pad.b - bh;
    const g = svg("g", { tabindex: 0 }); g.append(svg("title", {}, `${r.label}: ${r.text || r.value + unit}`));
    g.append(svg("path", { d: `M${x},${H - pad.b} V${y + 4} Q${x},${y} ${x + 4},${y} H${x + bw - 4} Q${x + bw},${y} ${x + bw},${y + 4} V${H - pad.b} Z`, fill: colors[i % colors.length] }));
    g.append(svg("text", { x: x + bw / 2, y: y - 6, "text-anchor": "middle", style: "font-weight:700" }, r.text || r.value + unit));
    g.append(svg("text", { x: x + bw / 2, y: H - pad.b + 18, "text-anchor": "middle", class: "m" }, r.label));
    if (r.sub) g.append(svg("text", { x: x + bw / 2, y: H - pad.b + 33, "text-anchor": "middle", class: "m", style: "font-size:11px" }, r.sub));
    s.append(g); });
  host.append(s);
  host.append(el("details", {}, `<summary class="note">Data table</summary><table style="width:100%;font-size:14px">${rows.map(r => `<tr><td>${r.label} ${r.sub || ""}</td><td>${r.text || r.value + unit}</td></tr>`).join("")}</table>`));
}
const drawCharts = () => {
  const BA = [
    { t: "Crash-free rate · GOAT Fawkes rewrite", n: "Within 2 months of release.", rows: [["Before", 91.9, "91.9%"], ["After", 99.2, "99.2%"]], max: 100 },
    { t: "Crash-free rate · DIRECTV NFL Sunday Ticket", n: "On the rewritten flows.", rows: [["Before", 85, "85%"], ["After", 98, "98%"]], max: 100 },
    { t: "Play Store rating · DIRECTV NFL Sunday Ticket", n: "Within 6 months of the relaunch.", rows: [["Before", 2.3, "2.3 ★"], ["After", 3.8, "3.8 ★"]], max: 5 },
    { t: "Ad delivery rate · Seventy9 AppJacket SDK", n: "Ad delivery rate to devices, before vs after.", rows: [["Before", 48, "48%"], ["After", 100, "100%"]], max: 100 }];
  const ba = $("#ba"); ba.innerHTML = "";
  BA.forEach((c, i) => { const card = el("div", { class: "card" }, `<h3 style="font-size:16px">${c.t}</h3><p class="note">${c.n}</p><div id="ba${i}"></div>`); ba.append(card);
    barChart($("#ba" + i), c.rows.map(([label, value, text]) => ({ label, value, text })), { max: c.max, colors: [css("--orange"), css("--blue")] }); });
  barChart($("#chart-lift"), [{ label: "Klarna + Affirm", sub: "order completion", value: 20, text: "20%+" }, { label: "In-Venue Seating", sub: "order completion", value: 40, text: "40%+" }, { label: "In-Venue Seating", sub: "engagement", value: 60, text: "60%+" }], { max: 66, colors: [css("--aqua"), css("--blue"), css("--violet")] });
};

// ---- timeline
const groups = ["All", "GOAT", "Other"]; let gsel = "All";
groups.forEach(g => { const b = el("button", { class: "chip" + (g === gsel ? " on" : "") }, g); b.onclick = () => { gsel = g; $$("#role-filter .chip").forEach(c => c.classList.toggle("on", c.textContent === g)); drawTL(); }; $("#role-filter").append(b); });
function drawTL() { const tl = $("#tl"); tl.innerHTML = "";
  P.roles.filter(r => gsel === "All" || (gsel === "GOAT") === (r.group === "GOAT")).forEach((r, i) => {
    const d = el("div", { class: "role" + (r.group === "GOAT" ? " goat" : "") + (i === 0 ? " open" : "") });
    d.innerHTML = `<button aria-expanded="${i === 0}"><div class="t">${r.title}</div><div class="o">${r.org} · ${r.period}${r.place ? " · " + r.place : ""}</div>${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</button><div class="body">${r.points.length ? "<ul>" + r.points.map(p => `<li>${p}</li>`).join("") + "</ul>" : "<p class='note'>Details on request.</p>"}${hasDetail(r) ? `<p><button class="btn detail" data-i="${P.roles.indexOf(r)}">View project details →</button></p>` : ""}</div>`;
    const db = d.querySelector(".detail"); if (db) db.onclick = e => { e.stopPropagation(); openProject(P.roles[+db.dataset.i], db); };
    d.firstChild.onclick = () => { d.classList.toggle("open"); d.firstChild.setAttribute("aria-expanded", d.classList.contains("open")); };
    tl.append(d); }); }

// ---- architecture explorer
const N = (id, x, y, label, sub, color) => ({ id, x, y, label, sub, color });
const ARCH = {
  "MVI + Compose": { nodes: [N("v", 20, 30, "Compose UI", "renders State", "blue"), N("i", 200, 30, "Intent", "user / system", "violet"), N("h", 380, 30, "ViewModel.handle", "Intent → Flow<Result>", "aqua"), N("e", 560, 30, "Effect", "nav / toast, once", "orange"), N("s", 20, 170, "State", "immutable", "blue"), N("r", 200, 170, "reduce()", "pure function", "violet"), N("x", 380, 170, "Result", "Loading/Loaded/Failed", "aqua")],
    edges: [["v", "i"], ["i", "h"], ["h", "x"], ["x", "r"], ["r", "s"], ["s", "v"], ["h", "e"]],
    info: ["Fawkes: one architecture", "Led a 9-engineer team over 11 months to consolidate fragmented legacy codebases into MVI + Jetpack Compose.", ["Crash-free rate 91.9% → 99.2% within 2 months of release", "~50% faster feature development and rollout", "iOS feature parity within 3 months", "Wrote the MVI standards and documentation, mentored engineers"], "samples/mvi-core"] },
  "Checkout & payments": { nodes: [N("o", 10, 30, "Order", "total, country", "blue"), N("g", 160, 30, "Registry", "eligibility rules", "violet"), N("rv", 310, 30, "Reviewing", "pick a method", "aqua"), N("p", 460, 30, "Processing", "authorize()", "aqua"), N("a", 460, 170, "ActionRequired", "hosted flow / 3DS", "orange"), N("ok", 610, 100, "Success", "", "aqua"), N("f", 310, 170, "Failed", "retry allowed", "red")],
    edges: [["o", "g"], ["g", "rv"], ["rv", "p"], ["p", "ok"], ["p", "a"], ["a", "ok"], ["a", "f"], ["f", "rv"]],
    info: ["Provider-agnostic checkout", "Owned the Checkout pod and payments architecture across Klarna, Affirm, GOAT Pay and Google Pay.", ["Klarna + Affirm integration drove 20%+ order completion", "Each provider declares its own eligibility; the UI renders what the registry returns", "Explicit state machine: illegal transitions are ignored, not crashes"], "samples/checkout-payments"] },
  "BFF & backend": { nodes: [N("m", 20, 100, "Mobile app", "one request", "blue"), N("b", 220, 100, "BFF aggregator", "parallel fan-out", "violet"), N("u", 440, 20, "User service", "critical", "aqua"), N("od", 440, 100, "Orders service", "optional, 400 ms", "orange"), N("rc", 440, 180, "Recommendations", "optional, 400 ms", "orange")],
    edges: [["m", "b"], ["b", "u"], ["b", "od"], ["b", "rc"]],
    info: ["Backend-for-frontend", "Built a custom backend service at Ticketmaster and collaborated on Java / Spring Boot REST services at GOAT. The sample shows the BFF pattern I apply.", ["Latency ≈ slowest call, not the sum", "Optional dependencies degrade instead of failing the screen", "Explicit Ok / Degraded sections let the client render the right UI"], "samples/bff-core"] },
  "Kotlin Multiplatform": { nodes: [N("an", 20, 30, "Android UI", "Jetpack Compose", "blue"), N("io", 20, 170, "iOS UI", "SwiftUI", "violet"), N("sh", 280, 100, "Shared commonMain", "rules, reducers, formatting", "aqua"), N("t", 520, 100, "Tests", "written once", "orange")],
    edges: [["an", "sh"], ["io", "sh"], ["sh", "t"]],
    info: ["Share logic, keep UI native", "Prototyped Kotlin Multiplatform for the Sneakers.com vertical to enable synchronized Android/iOS feature development.", ["Business rules live in one place", "UI stays platform-native", "Expand sharing only where it pays off"], "samples/kmp-shared"] },
  "React Native bridge": { nodes: [N("js", 20, 100, "React Native (TS)", "navigation, checkout", "blue"), N("br", 250, 100, "ViewManager", "bridge", "violet"), N("nv", 480, 100, "Native venue map", "pan / zoom, seat hit-test", "aqua"), N("cp", 20, 195, "CodePush OTA", "ship JS fast", "orange")],
    edges: [["js", "br"], ["br", "nv"], ["nv", "js"], ["cp", "js"]],
    info: ["Native performance inside React Native", "Led the Ticketmaster migration to a unified cross-platform codebase and bridged the interactive venue map as a native module.", ["In-Venue Seating: 40%+ order completion, 60%+ engagement", "Custom backend service, then Microsoft CodePush OTA updates", "A/B tests across checkout to cut drop-off"], "samples/rn-native-module"] },
  "AI-driven engineering": { nodes: [N("fg", 20, 100, "Figma frame", "layers, tokens", "blue"), N("ag", 220, 100, "figma-to-compose agent", "Claude Code", "violet"), N("ds", 220, 20, "Design system", "tokens + components", "aqua"), N("cs", 460, 100, "Compose screen", "stateless + previews", "aqua"), N("ck", 460, 190, "Review checklist", "deviations, a11y", "orange")],
    edges: [["fg", "ag"], ["ds", "ag"], ["ag", "cs"], ["cs", "ck"]],
    info: ["Agents that ship UI faster", "Built and deployed custom Claude Code agents, skills and prompt engineering across the engineering organization.", ["50%+ reduction in UI development time", "Automated Figma-to-Compose workflows", "Skills encode MVI conventions so new features start correct"], "samples/claude-agents"] },
};
let arch = Object.keys(ARCH)[0];
function renderArch(s, A) {
  s.innerHTML = `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${css("--muted")}"/></marker></defs>`;
  const W = 130, H = 50, byId = Object.fromEntries(A.nodes.map(n => [n.id, n]));
  const edge = (a, b) => { const ax = a.x + W / 2, ay = a.y + H / 2, bx = b.x + W / 2, by = b.y + H / 2, dx = bx - ax, dy = by - ay;
    const t = n => Math.min(Math.abs((W / 2 + 4) / (dx || 1e-9)), Math.abs((H / 2 + 4) / (dy || 1e-9)));
    const k = t(); return [ax + dx * k, ay + dy * k, bx - dx * k, by - dy * k]; };
  A.edges.forEach(([f, t]) => { const [x1, y1, x2, y2] = edge(byId[f], byId[t]); s.append(svg("line", { x1, y1, x2, y2, stroke: css("--muted"), "stroke-width": 1.6, class: "flow", "marker-end": "url(#ar)" })); });
  A.nodes.forEach(n => { const g = svg("g"); g.append(svg("rect", { x: n.x, y: n.y, width: W, height: H, rx: 10, fill: css("--surface2"), stroke: css("--" + n.color), "stroke-width": 2 }));
    g.append(svg("text", { x: n.x + W / 2, y: n.y + (n.sub ? 21 : 30), "text-anchor": "middle", style: "font-weight:700;font-size:12px" }, n.label));
    if (n.sub) g.append(svg("text", { x: n.x + W / 2, y: n.y + 38, "text-anchor": "middle", class: "m", style: "font-size:10.5px" }, n.sub)); s.append(g); });
}
function drawArch() {
  const A = ARCH[arch]; renderArch($("#arch-svg"), A);
  const [t, d, pts, path] = A.info;
  $("#arch-info").innerHTML = `<h3>${t}</h3><p>${d}</p><ul>${pts.map(p => `<li>${p}</li>`).join("")}</ul><p><a href="${P.repo}/tree/main/${path}" target="_blank" rel="noopener">View sample code → <code>${path}</code></a></p>`;
}
Object.keys(ARCH).forEach(k => { const b = el("button", { class: "tab", role: "tab", "aria-selected": k === arch }, k); b.onclick = () => { arch = k; $$("#arch-tabs .tab").forEach(x => x.setAttribute("aria-selected", x.textContent === k)); drawArch(); }; $("#arch-tabs").append(b); });

// ---- demo 1: MVI
(() => { const items = [{ id: "1", name: "Air Runner", p: 12000 }, { id: "2", name: "Court Classic", p: 9000 }, { id: "3", name: "Trail Hiker", p: 15000 }];
  let st = { isLoading: false, query: "", products: [], error: null }; const log = [];
  const reduce_ = (s, r) => ({ Loading: { ...s, isLoading: true, error: null }, Loaded: { ...s, isLoading: false, products: r.items }, Failed: { ...s, isLoading: false, error: r.message }, QueryChanged: { ...s, query: r.query } })[r.type];
  const render = () => { const vis = st.query ? st.products.filter(p => p.name.toLowerCase().includes(st.query.toLowerCase())) : st.products;
    $("#mvi-list").innerHTML = st.isLoading ? "<p class='note'>Loading…</p>" : st.error ? `<p style="color:var(--red)">${st.error}</p>` : vis.map(p => `<div class="row"><span>${p.name}</span><button class="chip" data-id="${p.id}">Select · ${money(p.p)}</button></div>`).join("") || "<p class='note'>Nothing yet. Press Load.</p>";
    $$("#mvi-list [data-id]").forEach(b => b.onclick = () => { push("Intent Select(" + b.dataset.id + ") → Effect OpenDetail (state unchanged)"); toast("Effect: navigate to detail " + b.dataset.id); });
    $("#mvi-state").textContent = JSON.stringify({ ...st, products: st.products.length + " items" }, null, 2); $("#mvi-log").textContent = log.slice(-8).join("\n"); };
  const push = m => { log.push(m); $("#mvi-log").textContent = log.slice(-8).join("\n"); };
  const apply = r => { push("  Result " + r.type); st = reduce_(st, r); render(); };
  const load = fail => { push("Intent Load"); apply({ type: "Loading" }); setTimeout(() => fail ? apply({ type: "Failed", message: "offline" }) : apply({ type: "Loaded", items }), 600); };
  $("#mvi-load").onclick = () => load(false); $("#mvi-fail").onclick = () => load(true);
  $("#mvi-q").oninput = e => { push("Intent Search(" + e.target.value + ")"); apply({ type: "QueryChanged", query: e.target.value }); }; render(); })();

// ---- demo 2: checkout
(() => { const providers = [
    { t: "CARD", n: "Card", ok: () => true }, { t: "WALLET", n: "Wallet", ok: o => o.cur === "USD" },
    { t: "INSTALLMENTS_4", n: "Pay in 4", ok: o => o.country === "US" && o.total >= 3500 && o.total <= 100000 },
    { t: "FINANCING", n: "Financing", ok: o => o.country === "US" && o.total >= 5000 }];
  let order, state, log = [];
  const split = t => { const b = Math.floor(t / 4), r = t - b * 4; return [b + r, b, b, b]; };
  const reducer = (s, e) => { const k = s.k;
    if (k === "Reviewing" && e.k === "Select") return s.avail.includes(e.t) ? { ...s, sel: e.t } : s;
    if (k === "Reviewing" && e.k === "Pay") return s.sel ? { ...s, k: "Processing" } : s;
    if ((k === "Processing" || k === "ActionRequired") && e.k === "Auth") return { Approved: { k: "Success" }, Declined: { ...s, k: "Failed" }, NeedsAction: k === "Processing" ? { ...s, k: "ActionRequired" } : s }[e.r];
    if (k === "Failed" && e.k === "Retry") return { ...s, k: "Reviewing", sel: null }; return s; };
  const send = e => { const before = state.k; state = reducer(state, e); log.push(`${e.k}${e.t ? "(" + e.t + ")" : e.r ? "(" + e.r + ")" : ""}: ${before} → ${state.k}`); draw(); };
  const reset = () => { const [country, cur] = $("#co-country").value.split("|"); order = { total: +$("#co-total").value, country, cur };
    $("#co-total-v").textContent = money(order.total); const avail = providers.filter(p => p.ok(order)).map(p => p.t);
    state = { k: "Reviewing", sel: null, avail }; log = ["order → registry → " + avail.length + " methods"]; draw(); };
  const draw = () => { $("#co-methods").innerHTML = ""; providers.forEach(p => { const on = state.avail.includes(p.t); const b = el("button", { class: "chip" + (state.sel === p.t ? " on" : ""), style: on ? "" : "opacity:.35;text-decoration:line-through" }, p.n);
      b.disabled = !on; b.onclick = () => state.k === "Reviewing" && send({ k: "Select", t: p.t }); $("#co-methods").append(b); });
    $("#co-split").textContent = split(order.total).map(money).join("  +  ") + "  =  " + money(split(order.total).reduce((a, b) => a + b, 0));
    $("#co-state").textContent = state.k + (state.sel ? " · " + state.sel : "");
    const acts = { Reviewing: [["Pay", { k: "Pay" }]], Processing: [["Approved", { k: "Auth", r: "Approved" }], ["Needs action", { k: "Auth", r: "NeedsAction" }], ["Declined", { k: "Auth", r: "Declined" }]], ActionRequired: [["Approved", { k: "Auth", r: "Approved" }], ["Declined", { k: "Auth", r: "Declined" }]], Failed: [["Retry", { k: "Retry" }]], Success: [["Start over", null]] }[state.k];
    $("#co-actions").innerHTML = ""; acts.forEach(([l, e]) => { const b = el("button", { class: "chip" }, l); b.onclick = () => e ? send(e) : reset(); $("#co-actions").append(b); });
    $("#co-log").textContent = log.slice(-8).join("\n"); };
  $("#co-total").oninput = reset; $("#co-country").onchange = reset; reset(); })();

// ---- demo 3: BFF
(() => { const ids = ["u", "o", "r"], names = { u: "User", o: "Orders", r: "Recos" }; const colors = { u: "--aqua", o: "--orange", r: "--violet" };
  const draw = () => { const v = Object.fromEntries(ids.map(i => [i, +$("#b-" + i).value])); ids.forEach(i => $("#b-" + i + "-v").textContent = v[i] + " ms");
    const out = {}; const eff = { u: Math.min(v.u, 1500), o: Math.min(v.o, 400), r: Math.min(v.r, 400) };
    const parallel = Math.max(eff.u, eff.o, eff.r), seq = eff.u + eff.o + eff.r, critFail = v.u > 1500;
    const W = 460, H = 170, sc = (W - 90) / 2200; const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": "Latency timeline" });
    ids.forEach((i, k) => { const y = 14 + k * 30; s.append(svg("text", { x: 0, y: y + 14, class: "m", style: "font-size:12px" }, names[i]));
      s.append(svg("rect", { x: 56, y, width: Math.max(2, eff[i] * sc), height: 20, rx: 3, fill: i !== "u" && v[i] > 400 ? css("--yellow") : css(colors[i]) }));
      s.append(svg("text", { x: 60 + eff[i] * sc, y: y + 14, style: "font-size:11px" }, (i !== "u" && v[i] > 400) ? "timed out → degraded" : eff[i] + " ms")); });
    s.append(svg("text", { x: 0, y: 118, style: "font-size:12px;font-weight:700" }, `Parallel (BFF): ${parallel} ms`)); s.append(svg("rect", { x: 0, y: 124, width: Math.max(2, parallel * sc), height: 10, rx: 2, fill: css("--blue") }));
    s.append(svg("text", { x: 0, y: 156, class: "m", style: "font-size:12px" }, `Sequential from phone: ${seq} ms`)); s.append(svg("rect", { x: 0, y: 160, width: Math.max(2, seq * sc), height: 6, rx: 2, fill: css("--muted") }));
    $("#bff-chart").innerHTML = ""; $("#bff-chart").append(s);
    $("#bff-out").textContent = critFail ? "502 Bad Gateway\n{ error: 'user service timed out' }" : JSON.stringify({ user: "ok", orders: v.o > 400 ? { degraded: "orders timed out" } : "ok", recommendations: v.r > 400 ? { degraded: "recommendations timed out" } : "ok" }, null, 2); };
  ids.forEach(i => $("#b-" + i).oninput = draw); window.__bff = draw; draw(); })();


// ---- project detail overlay
const hasDetail = r => !!(r.metrics || r.arch || r.code || (r.media && r.media.length));
function openProject(r, opener) {
  const dlg = $("#proj"), body = $("#proj-body");
  $("#proj-title").textContent = r.title + " · " + r.org; $("#proj-sub").textContent = r.period + (r.place ? " · " + r.place : "");
  body.innerHTML = `<div>${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>`;
  if (r.metrics) { body.append(el("h4", {}, "Results")); const g = el("div", { class: "grid2" }); body.append(g);
    r.metrics.forEach((m, i) => { const c = el("div", { class: "card" }, `<b>${m.t}</b><p class="note" style="margin:2px 0 6px">${m.n}</p><div id="pm${i}" style="max-width:440px;margin:0 auto"></div>`); g.append(c);
      barChart($("#pm" + i, c), m.rows.map(([label, value, text]) => ({ label, value, text })), { max: m.max, colors: [css("--orange"), css("--blue")] }); }); }
  if (r.arch) { body.append(el("h4", {}, "Architecture (pattern diagrams)")); r.arch.forEach(k => { const A = ARCH[k]; const c = el("div", { class: "card", style: "margin-bottom:12px" }, `<b>${A.info[0]}</b><svg viewBox="0 0 760 250" width="100%" role="img" aria-label="${k} diagram"></svg><p class="note">${A.info[1]}</p>`); body.append(c); renderArch($("svg", c), A); }); }
  body.append(el("h4", {}, "What I did")); body.append(el("ul", {}, r.points.map(p => `<li>${p}</li>`).join("")));
  if (r.code) { body.append(el("h4", {}, "Code samples")); body.append(el("ul", {}, r.code.map(([n, p]) => `<li><a href="${P.repo}/tree/main/${p}" target="_blank" rel="noopener">${n}</a> <span class="note">${p}</span></li>`).join(""))); }
  if (r.media && r.media.length) { body.append(el("h4", {}, "Screens")); body.append(el("div", { class: "gallery" }, r.media.map(m => `<figure><img loading="lazy" src="${m.src}" alt="${m.caption || r.org}"><figcaption>${m.caption || ""}</figcaption></figure>`).join(""))); }
  dlg.showModal(); dlg.scrollTop = 0; dlg._opener = opener;
}
$("#proj-close").onclick = () => $("#proj").close();
$("#proj").addEventListener("click", e => { if (e.target.id === "proj") e.target.close(); });
$("#proj").addEventListener("close", e => e.target._opener && e.target._opener.focus());

// ---- skills
const cats = ["All", ...P.skills.map(s => s.cat)]; let csel = "All";
cats.forEach(c => { const b = el("button", { class: "chip" + (c === csel ? " on" : "") }, c); b.onclick = () => { csel = c; $$("#skill-filter .chip").forEach(x => x.classList.toggle("on", x.textContent === c)); drawSkills(); }; $("#skill-filter").append(b); });
function drawSkills() { const g = $("#skills-grid"); g.innerHTML = ""; P.skills.filter(s => csel === "All" || s.cat === csel).forEach(s => g.append(el("div", { class: "card" }, `<h3 style="font-size:18px;margin-bottom:10px">${s.cat}</h3>` + s.items.map(([n, w]) => `<div class="row"><span>${n}</span><span class="note">${w}</span></div>`).join("")))); }

// ---- AI engineering
const AI = P.ai, mine = new Set(AI.mine);
const ICON = { crash: "M12 3v10M12 17v.5M4 20h16L12 4z", pr: "M6 3v12M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9v3a3 3 0 0 1-3 3H9", code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12", design: "M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" };
AI.stories.forEach(st => {
  const ext = st.link && st.link.startsWith("http");
  $("#ai-stories").append(el("article", { class: "card story" },
    `<div class="story-top"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="${ICON[st.icon]}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${st.metric ? `<span class="story-metric">${st.metric}</span>` : ""}</div>
     <h3>${st.title}</h3><p>${st.body}</p>
     <div class="pieces">${st.pieces.map(p => `<code>${p}</code>`).join("")}</div>
     ${st.link ? `<a class="story-link" href="${st.link}"${ext ? ' target="_blank" rel="noopener"' : ""}>${st.cta} →</a>` : ""}`));
});
AI.kit.forEach(([stage, items]) => $("#kit").append(el("div", { class: "kit-col" },
  `<h4>${stage}</h4>${items.map(n => `<code class="${mine.has(n) ? "mine" : ""}">${n}</code>`).join("")}`)));

// crash-correlator demo (simulated data)
const CC = {
  play: [["NullPointerException", "CartPresenter.bind", 1, "412 users"], ["OutOfMemoryError", "ImageDecoder.decode", 2, "88 users"], ["IllegalStateException", "FragmentManager.commit", 3, "51 users"], ["ANR", "ProfileRepo.load", 4, "23 users"]],
  emb: [["NullPointerException", "CartPresenter.bind", 1, "389 sessions"], ["IllegalStateException", "FragmentManager.commit", 3, "47 sessions"], ["OutOfMemoryError", "ImageDecoder.decode", 2, "102 sessions"]],
  tickets: { 1: ["AND-214", "NPE in CartPresenter.bind", "Play + Embrace", 1], 2: ["AND-198", "OOM in ImageDecoder.decode", "Play + Embrace", 0], 3: ["AND-215", "IllegalState in FragmentManager.commit", "Play + Embrace", 1], 4: ["AND-216", "ANR in ProfileRepo.load", "Play only", 1] },
};
let ccTimers = [];
const ccReset = () => {
  ccTimers.forEach(clearTimeout); ccTimers = [];
  const card = r => `<div class="cc-crash" data-g="${r[2]}"><span>${r[0]}</span><small>${r[1]} · ${r[3]}</small></div>`;
  $("#cc-play").innerHTML = CC.play.map(card).join(""); $("#cc-emb").innerHTML = CC.emb.map(card).join("");
  $("#cc-out").innerHTML = ""; $("#cc-status").textContent = "7 crash reports from 2 sources."; $("#cc-run").disabled = false;
};
const later = (ms, f) => ccTimers.push(setTimeout(f, reduce ? 0 : ms));
$("#cc-run").onclick = () => {
  ccReset(); $("#cc-run").disabled = true; $("#cc-status").textContent = "Fetching from Play Console and Embrace…";
  later(600, () => { $$(".cc-crash").forEach(c => c.classList.add("g" + c.dataset.g)); $("#cc-status").textContent = "Matched by exception and top app frame: 4 unique crashes."; });
  later(1400, () => { $("#cc-status").textContent = "Checking Jira for existing tickets…"; });
  [1, 2, 3, 4].forEach((g, i) => later(2100 + i * 550, () => {
    const [key, sum, src, isNew] = CC.tickets[g];
    const row = el("div", { class: "cc-ticket g" + g }, `<code>${key}</code><span>${sum}<small>${src}</small></span><b class="${isNew ? "new" : "upd"}">${isNew ? "Created" : "Updated, not duplicated"}</b>`);
    $("#cc-out").append(row); requestAnimationFrame(() => row.classList.add("on"));
    $$(`.cc-crash[data-g="${g}"]`).forEach(c => c.classList.add("done"));
    if (i === 3) { $("#cc-status").textContent = "7 reports became 4 tickets: 3 created, 1 updated, 0 duplicates."; $("#cc-run").disabled = false; }
  }));
};
$("#cc-reset").onclick = ccReset; ccReset();

// presenter migration demo
const MG = [
  ["del", "class LegacyCartPresenter("], ["del", "    private val coordinator: CartCoordinator,"], ["del", ") : LegacyStatePresenter<CartState, CartEvent>() {"],
  ["add", "class CartPresenter :", 0], ["add", "    BasePresenter<CartState, CartEvent, CartEffect>(CartState()) {", 0],
  ["same", ""],
  ["del", "    override fun bind(lastState: CartState?, events: Flow<CartEvent>) ="], ["del", "        events.scan(lastState ?: CartState()) { state, event ->"],
  ["add", "    override fun bind(events: Flow<CartEvent>) =", 2], ["add", "        events.scan(state.value) { state, event ->", 2],
  ["same", "            when (event) {"], ["same", "                is CartEvent.Add -> state.copy(items = state.items + event.priceCents)"], ["same", "                CartEvent.Checkout -> {"],
  ["del", "                    coordinator.openCheckout(state.total)"], ["add", "                    sendEffect(CartEffect.OpenCheckout(state.total))", 3],
  ["same", "                    state"], ["same", "                }"], ["same", "            }"], ["same", "        }"], ["same", "}"],
];
const MG_STEPS = ["Add a typed Effect and move initial state to the constructor", "Drop the nullable lastState from bind()", "Seed scan() from state.value", "Replace coordinator calls with sendEffect()", "Remove the coordinator; tests prove the same states"];
let mgTimers = [];
const mgReset = () => {
  mgTimers.forEach(clearTimeout); mgTimers = [];
  const code = $("#mg-code"); code.innerHTML = "";
  MG.forEach(([k, t, step]) => { const l = el("span", { class: "ln " + k + (k === "add" ? " hidden" : "") }); l.textContent = t || " "; if (step !== undefined) l.dataset.step = step; code.append(l); });
  $("#mg-steps").innerHTML = MG_STEPS.map(s => `<li>${s}</li>`).join(""); $("#mg-run").disabled = false;
};
const mgLater = (ms, f) => mgTimers.push(setTimeout(f, reduce ? 0 : ms));
$("#mg-run").onclick = () => {
  mgReset(); $("#mg-run").disabled = true;
  mgLater(200, () => $$("#mg-code .del").forEach(l => l.classList.add("strike")));
  MG_STEPS.forEach((_, i) => mgLater(900 + i * 700, () => {
    $$("#mg-steps li")[i].classList.add("ok");
    $$(`#mg-code .add[data-step="${i}"]`).forEach(l => l.classList.remove("hidden"));
    if (i === 4) { $$("#mg-code .del").forEach(l => l.classList.add("gone")); $("#mg-run").disabled = false; }
  }));
};
$("#mg-reset").onclick = mgReset; mgReset();

function drawAll() { drawCharts(); drawArch(); window.__bff && window.__bff(); }
drawTL(); drawSkills(); drawAll();
})();
