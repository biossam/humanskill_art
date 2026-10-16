// 휴먼스킬아트 — 선생님 자료실 + 학생용 영상 보기
// 내용은 data/course.json 한 파일에서 관리합니다.
// 학생용 화면: 주소 끝에 ?view=student (선생님 자료 칸이 숨겨집니다)

const app = document.getElementById("app");
const isStudent = new URLSearchParams(location.search).get("view") === "student";
document.documentElement.dataset.view = isStudent ? "student" : "teacher";

let course = null;
let units = [];

/* ---------- 도구 ---------- */

function esc(text) {
  return String(text ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

const pad = (n) => String(n).padStart(2, "0");

function safeUrl(url) {
  if (!url || !String(url).trim()) return "";
  try {
    const u = new URL(url, location.href);
    return ["http:", "https:"].includes(u.protocol) ? u.href : "";
  } catch { return ""; }
}

const svg = (path, size = 20) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;

const icon = {
  download: svg('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),
  screen: svg('<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8"/><path d="M12 17v4"/>'),
  left: svg('<path d="m15 18-6-6 6-6"/>', 28),
  right: svg('<path d="m9 18 6-6-6-6"/>', 28),
  close: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 24),
  arrow: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>', 18),
  external: svg('<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>', 16),
};

function findLesson(unitId, no) {
  const unit = units.find((u) => u.id === unitId);
  const lesson = unit?.lessons.find((l) => String(l.no) === String(no));
  return unit && lesson ? { unit, lesson } : null;
}

function allLessons() {
  return units.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })));
}

const lessonHref = (unit, lesson) => `#/lesson/${encodeURIComponent(unit.id)}/${lesson.no}`;

function teacherFileCount(lesson) {
  const t = lesson.teacher ?? {};
  return [t.ppt, t.planHwp, t.planPdf].filter(Boolean).length;
}

function lessonStatus(lesson) {
  const v = lesson.videos?.length ?? 0;
  const f = teacherFileCount(lesson);
  const parts = [];
  if (v) parts.push(`영상 ${v}개`);
  if (f && !isStudent) parts.push(`자료 ${f}개`);
  return parts.length ? parts.join(", ") : "준비 중";
}

// 차시마다 정해 둔 물감 색 (없으면 흑연색)
function colorVars(lesson) {
  const c = lesson.color ?? {};
  const hex = /^#[0-9a-f]{3,8}$/i.test(c.hex ?? "") ? c.hex : "#2b2b30";
  const ink = /^#[0-9a-f]{3,8}$/i.test(c.ink ?? "") ? c.ink : "#ffffff";
  return `--c:${hex};--ink:${ink}`;
}

/* ---------- 첫 화면 ---------- */

function renderHome() {
  const multiUnit = units.length > 1;

  const unitBlocks = units.map((unit) => `
    <section class="unit">
      ${multiUnit ? `<h2 class="unit-title">${esc(unit.title)}</h2>` : ""}
      <ol class="swatches">
        ${unit.lessons.map((lesson) => {
          const ready = (lesson.videos?.length ?? 0) + (isStudent ? 0 : teacherFileCount(lesson)) > 0;
          return `
          <li>
            <a class="swatch" href="${lessonHref(unit, lesson)}" style="${colorVars(lesson)}">
              <span class="chip"><span class="chip-no">${lesson.no}</span></span>
              <span class="label">
                <span class="label-title">${esc(lesson.title)}</span>
                ${lesson.color?.name ? `<span class="label-pigment">${esc(lesson.color.name)}</span>` : ""}
                <span class="label-status${ready ? "" : " is-empty"}">${esc(lessonStatus(lesson))}</span>
              </span>
            </a>
          </li>`;
        }).join("")}
      </ol>
    </section>`).join("");

  const lessonCount = allLessons().length;

  app.innerHTML = `
    <section class="intro">
      <h1>${esc(course.title)}</h1>
      <p class="lede">${esc(course.tagline)}</p>
      <p class="intro-note">${esc(course.grade)} ${esc(course.subject)}, ${lessonCount}차시.
        ${isStudent
          ? "차시를 골라 수업 영상을 다시 볼 수 있어요."
          : "차시마다 수업 영상과 PPT, 지도안을 무료로 받을 수 있습니다."}</p>
      ${isStudent ? "" : `<a class="text-link" href="#/qr">학생용 QR 코드 보기</a>`}
    </section>
    ${unitBlocks}`;
  document.title = course.title;
}

/* ---------- 차시 화면 ---------- */

function videoBlock(video, index, total) {
  const id = String(video.youtubeId ?? "").trim();
  const player = id
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0"
         title="${esc(video.title || "수업 영상")}" loading="lazy" allowfullscreen
         allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`
    : `<div class="player-empty">영상 준비 중</div>`;

  const sourceUrl = safeUrl(video.url);
  const credit = video.external
    ? `<p class="credit">출처: ${esc(video.channel || "외부 영상")}${sourceUrl
        ? ` · <a href="${esc(sourceUrl)}" target="_blank" rel="noopener">원본 보기 ${icon.external}</a>` : ""}</p>`
    : "";

  const caption = total > 1 || video.title
    ? `<p class="video-title">${total > 1 ? `<span>영상 ${index + 1}</span>` : ""}${esc(video.title || "")}</p>`
    : "";

  return `<figure class="video"><div class="player">${player}</div>${caption}${credit}</figure>`;
}

function listSection(title, items, ordered = false) {
  if (!items?.length) return "";
  const tag = ordered ? "ol" : "ul";
  return `<section class="detail"><h2>${title}</h2><${tag}>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</${tag}></section>`;
}

function teacherSection(lesson) {
  if (isStudent) return "";
  const t = lesson.teacher ?? {};
  const files = [
    { label: "수업 PPT", format: "PPTX", url: t.ppt },
    { label: "수업 지도안", format: "HWP", url: t.planHwp },
    { label: "수업 지도안", format: "PDF", url: t.planPdf },
  ];
  const items = files.map((f) => {
    const url = safeUrl(f.url);
    return url
      ? `<li><a class="file" href="${esc(url)}" target="_blank" rel="noopener">${icon.download}<span>${f.label}</span><span class="format">${f.format}</span></a></li>`
      : `<li><span class="file is-empty" aria-disabled="true">${icon.download}<span>${f.label}</span><span class="format">준비 중</span></span></li>`;
  }).join("");

  return `
    <section class="teacher">
      <h2>선생님 자료</h2>
      <ul class="files">${items}</ul>
      <p class="license">${esc(course.license.summary)}
        <a href="${esc(course.license.url)}" target="_blank" rel="noopener">${esc(course.license.name)}</a></p>
    </section>`;
}

function renderLesson(unitId, no) {
  const found = findLesson(unitId, no);
  if (!found) {
    app.innerHTML = `<p class="status">차시를 찾을 수 없어요. <a href="#/">처음으로</a></p>`;
    return;
  }
  const { unit, lesson } = found;
  const list = allLessons();
  const i = list.findIndex((x) => x.lesson === lesson);
  const prev = list[i - 1];
  const next = list[i + 1];

  const videos = lesson.videos?.length
    ? lesson.videos.map((v, k) => videoBlock(v, k, lesson.videos.length)).join("")
    : videoBlock({}, 0, 1);

  const details = [
    listSection("준비물", lesson.materials),
    listSection("활동 순서", lesson.steps, true),
    listSection("생각해 볼 질문", lesson.questions),
  ].join("");

  const canClassMode = !isStudent && (lesson.videos?.length || lesson.steps?.length);

  app.innerHTML = `
    <header class="lesson-band" style="${colorVars(lesson)}">
      <div class="band-inner">
        <nav class="crumb"><a href="#/">${esc(course.title)}</a>${units.length > 1 ? ` <span>/</span> ${esc(unit.title)}` : ""}</nav>
        <div class="band-title">
          <span class="band-no">${lesson.no}</span>
          <div>
            <p class="band-kicker">${lesson.no}차시${lesson.color?.name ? `, ${esc(lesson.color.name)}` : ""}</p>
            <h1>${esc(lesson.title)}</h1>
          </div>
        </div>
        ${lesson.goal ? `<p class="goal"><span>학습 목표</span>${esc(lesson.goal)}</p>` : ""}
        ${canClassMode ? `<button class="btn-band" id="class-mode" type="button">${icon.screen}수업 모드</button>` : ""}
      </div>
    </header>

    <div class="videos">${videos}</div>

    ${details
      ? `<div class="details">${details}</div>`
      : `<p class="empty-note">이 차시의 활동 안내는 준비 중입니다.</p>`}

    ${teacherSection(lesson)}

    <nav class="pager">
      ${prev ? `<a href="${lessonHref(prev.unit, prev.lesson)}"><span>이전 차시</span>${esc(prev.lesson.title)}</a>` : "<span></span>"}
      ${next ? `<a class="next" href="${lessonHref(next.unit, next.lesson)}"><span>다음 차시</span>${esc(next.lesson.title)}</a>` : ""}
    </nav>`;

  document.getElementById("class-mode")?.addEventListener("click", () => openClassMode(lesson));
  document.title = `${lesson.no}차시 ${lesson.title} · ${course.title}`;
  window.scrollTo(0, 0);
}

/* ---------- 수업 모드 (교실 TV) ---------- */

function openClassMode(lesson) {
  const steps = lesson.steps ?? [];
  const video = (lesson.videos ?? []).find((v) => v.youtubeId);
  let current = 0;

  const overlay = document.createElement("div");
  overlay.className = "classmode";
  overlay.setAttribute("style", colorVars(lesson));
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `${lesson.title} 수업 모드`);
  overlay.innerHTML = `
    <div class="cm-top">
      <p><span>${lesson.no}차시</span> ${esc(lesson.title)}</p>
      <button class="cm-close" type="button" aria-label="수업 모드 닫기">${icon.close}</button>
    </div>
    <div class="cm-body${video ? "" : " no-video"}">
      ${video ? `<div class="cm-player"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?rel=0"
        title="${esc(video.title || "수업 영상")}" allowfullscreen
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe></div>` : ""}
      <div class="cm-steps">
        ${lesson.goal ? `<p class="cm-goal">${esc(lesson.goal)}</p>` : ""}
        ${steps.length ? `<ol>${steps.map((s, k) => `<li data-k="${k}">${esc(s)}</li>`).join("")}</ol>` : ""}
      </div>
    </div>
    ${steps.length ? `
    <div class="cm-nav">
      <button type="button" data-move="-1" aria-label="이전 단계">${icon.left}</button>
      <span class="cm-count" aria-live="polite"></span>
      <button type="button" data-move="1" aria-label="다음 단계">${icon.right}</button>
    </div>` : ""}`;

  const update = () => {
    overlay.querySelectorAll(".cm-steps li").forEach((li, k) => {
      li.classList.toggle("is-current", k === current);
      li.classList.toggle("is-done", k < current);
      if (k === current) li.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
    const count = overlay.querySelector(".cm-count");
    if (count) count.textContent = `${current + 1} / ${steps.length}`;
  };

  const move = (d) => {
    if (!steps.length) return;
    current = Math.min(steps.length - 1, Math.max(0, current + d));
    update();
  };

  const close = () => {
    document.removeEventListener("keydown", onKey);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    overlay.remove();
    document.body.classList.remove("no-scroll");
    document.getElementById("class-mode")?.focus();
  };

  const onKey = (e) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); move(1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); move(-1); }
    else if (e.key === "Escape") close();
  };

  overlay.querySelector(".cm-close").addEventListener("click", close);
  overlay.querySelectorAll("[data-move]").forEach((b) =>
    b.addEventListener("click", () => move(Number(b.dataset.move))));
  overlay.querySelectorAll(".cm-steps li").forEach((li) =>
    li.addEventListener("click", () => { current = Number(li.dataset.k); update(); }));
  document.addEventListener("keydown", onKey);

  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");
  overlay.requestFullscreen?.().catch(() => {});
  update();
  overlay.querySelector(".cm-close").focus();
}

/* ---------- QR 코드 화면 ---------- */

function renderQR() {
  const studentUrl = `${location.origin}${location.pathname}?view=student`;
  const shortText = studentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  let qrSvg = `<p class="status">QR 코드를 만들 수 없어요. 아래 주소를 알려 주세요.</p>`;
  if (typeof window.qrcode === "function") {
    const qr = window.qrcode(0, "M");
    qr.addData(studentUrl);
    qr.make();
    qrSvg = qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true, alt: "학생용 화면 QR 코드" });
  }

  app.innerHTML = `
    <nav class="crumb"><a href="#/">${esc(course.title)}</a></nav>
    <section class="qr-page">
      <div class="qr-box">${qrSvg}</div>
      <div class="qr-text">
        <h1>학생용 화면</h1>
        <p>휴대폰 카메라로 찍으면 영상만 보이는 학생용 화면이 열립니다. 교실 화면에 띄우거나 인쇄해 알림장에 붙여 쓰세요.</p>
        <p class="qr-url">${esc(shortText)}</p>
        <div class="qr-actions">
          <button class="btn-primary" type="button" id="qr-print">인쇄하기</button>
          <a class="btn-ghost" href="${esc(studentUrl)}" target="_blank" rel="noopener">학생용 화면 열기</a>
        </div>
      </div>
    </section>`;
  document.getElementById("qr-print").addEventListener("click", () => window.print());
  document.title = `QR 코드 · ${course.title}`;
}

/* ---------- 시작 ---------- */

function route() {
  const hash = location.hash;
  const m = hash.match(/^#\/lesson\/([^/]+)\/(\d+)$/);
  if (m) return renderLesson(decodeURIComponent(m[1]), m[2]);
  if (hash === "#/qr" && !isStudent) return renderQR();
  renderHome();
}

function renderChrome() {
  document.getElementById("view-label").textContent = isStudent ? "학생용" : "선생님 자료실";
  document.getElementById("footer").innerHTML = `
    <p>${esc(course.title)}, 개발 ${esc(course.author)}</p>
    <p>수업 자료는 <a href="${esc(course.license.url)}" target="_blank" rel="noopener">${esc(course.license.name)}</a> 조건으로 무료 공개합니다.</p>`;
}

async function init() {
  try {
    const res = await fetch("data/course.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    course = data.course;
    units = data.units ?? [];
    renderChrome();
    window.addEventListener("hashchange", route);
    route();
  } catch (e) {
    console.error(e);
    app.innerHTML = `<p class="status">수업 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p>`;
  }
}

init();
