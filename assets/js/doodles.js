// 휴먼스킬아트 — 차시마다 소품과 표정으로 생각을 보여 주는 선 그림 친구들 (이 사이트를 위해 새로 그린 그림)
// 몸은 자연스럽게 서거나 앉고, 손에 든 소품과 표정으로 뜻을 드러냅니다.
// 1 판단: 두 작품 중 하나에 ✔ 팻말      2 발견: 돋보기로 반짝이는 것 발견
// 3 해석: 액자를 기울여 보며 갸웃, 전구    4 재구성: 앉아서 블록을 새로 쌓기
// 5 소통: 두 친구가 말풍선 주고받기        6 성찰: 의자에 앉아 스케치북에 돌아보며 쓰기
//
// 그리는 순서: 색 얼룩 → 뒤 소품 → 팔다리 테두리 → 몸 → 팔다리 속 → 머리·얼굴 → 앞 소품
// 팔다리는 검은 굵은 선 위에 흰 가는 선을 겹쳐 "속이 빈 관"처럼 보이게 합니다.

const BLOB = '<path class="blob" d="M18 84C14 50 46 30 76 34c32 4 54 28 48 60-6 30-40 44-70 36-22-6-34-22-36-46z"/>';

const figures = {
  1: [{ // 판단
    back: '<path class="ln" d="M8 130h124"/><rect class="fl" x="80" y="8" width="22" height="18" rx="1"/><circle class="ln" cx="91" cy="17" r="5"/><rect class="fl" x="108" y="8" width="22" height="18" rx="1"/><path class="ln" d="M112 23l7-11 7 11z"/>',
    limbs: ["M48 96l-2 32", "M58 96l2 32", "M64 70l30-16", "M40 70l-6 18 12-22"],
    body: '<ellipse class="fl" cx="53" cy="80" rx="15" ry="20"/>',
    head: [53, 40, 20],
    face: '<path class="ln" d="M43 29q5-4 10-1M58 31h8"/><circle class="dot" cx="50" cy="39" r="2.6"/><circle class="dot" cx="62" cy="39" r="2.6"/><path class="ln" d="M51 50q5 3 10-1"/>',
    front: '<path class="ln" d="M94 54l12-14"/><circle class="fl" cx="112" cy="36" r="10"/><path class="pink-ln" d="M107 36l4 4 7-8"/><path class="ln" d="M100 2l2-4M118 2v-4"/>',
  }],
  2: [{ // 발견
    back: '<path class="ln" d="M8 130h124"/><path class="ln" d="M120 18l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
    limbs: ["M50 96l-2 32", "M60 96l2 32", "M66 70l24-8", "M44 70l-14-14-2-12"],
    body: '<ellipse class="fl" cx="55" cy="80" rx="15" ry="20"/>',
    head: [55, 40, 20],
    face: '<path class="ln" d="M44 25q5-5 10-1M58 24q5-4 10 1"/><circle class="fl" cx="50" cy="37" r="5"/><circle class="dot" cx="52" cy="37" r="2.2"/><circle class="fl" cx="64" cy="37" r="5"/><circle class="dot" cx="66" cy="37" r="2.2"/><ellipse class="fl" cx="58" cy="50" rx="3.5" ry="4.5"/>',
    front: '<path class="ln" d="M90 62l8-8"/><circle class="lens" cx="106" cy="46" r="11"/><path class="pink-ln" d="M106 40l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"/><path class="ln" d="M40 14l3 5M54 10v6M68 14l-3 5"/>',
  }],
  3: [{ // 해석
    back: '<path class="ln" d="M8 130h124"/><path class="ln" d="M26 30c0-7 10-7 10 0 0 5-5 5-5 10"/><circle class="dot" cx="31" cy="46" r="1.8"/>',
    limbs: ["M54 96l-2 32", "M64 96l2 32", "M50 70l-4 26", "M70 70l12 22"],
    body: '<ellipse class="fl" cx="59" cy="80" rx="15" ry="20"/>',
    head: [59, 40, 20],
    headTilt: -14,
    face: '<path class="ln" d="M48 39q3-3 6 0"/><circle class="dot" cx="66" cy="39" r="2.6"/><path class="ln" d="M53 51q6 4 12-2"/><path class="ln" d="M64 29l7-1"/>',
    front: '<g transform="rotate(16 66 98)"><rect class="fl" x="44" y="84" width="44" height="30" rx="1.5"/><path class="ln" d="M50 108l10-14 8 9 5-6 9 11z"/><circle class="ln" cx="78" cy="92" r="3"/></g><circle class="fl" cx="98" cy="18" r="9"/><path class="ln" d="M95 27v4h6v-4M95 34h6M98 2v-4M84 8l-4-3M112 8l4-3M86 20h-5M110 20h5"/>',
  }],
  4: [{ // 재구성
    back: '<path class="ln" d="M8 130h124"/><rect class="fl" x="92" y="106" width="20" height="20" rx="1.5"/><rect class="fl" x="94" y="88" width="17" height="18" rx="1.5"/><path class="fl" d="M114 126l9-14 9 14z"/><rect class="fl" x="18" y="116" width="12" height="10" rx="1" transform="rotate(-12 24 121)"/>',
    limbs: ["M42 102c-16 8-10 18 12 16", "M60 102c16 8 10 18-12 18", "M62 78l30-8", "M60 86l32-6"],
    body: '<ellipse class="fl" cx="50" cy="86" rx="16" ry="20"/>',
    head: [50, 46, 20],
    face: '<circle class="dot" cx="48" cy="45" r="2.6"/><circle class="dot" cx="60" cy="45" r="2.6"/><path class="ln" d="M47 54q6 6 12 0"/><path class="ln" d="M38 52l4-1M64 51l4 1"/>',
    front: '<rect class="fl" x="92" y="62" width="17" height="16" rx="1.5" transform="rotate(10 100 70)"/><path class="ln" d="M118 60l5-4M120 70h6M100 52v-6"/>',
  }],
  5: [{ // 소통 — 왼쪽 친구
    back: '<path class="ln" d="M8 130h124"/>',
    limbs: ["M34 102l-2 26", "M42 102l2 26", "M48 82l12-10 2-10", "M28 82l-6 22"],
    body: '<ellipse class="fl" cx="38" cy="88" rx="12" ry="16"/>',
    head: [38, 56, 16],
    face: '<circle class="dot" cx="38" cy="54" r="2.2"/><circle class="dot" cx="47" cy="54" r="2.2"/><path class="fl" d="M39 62q5 7 10 0z"/><path class="ln" d="M31 61l3-1"/>',
    front: '<path class="fl" d="M12 20c0-8 8-12 16-12s16 4 16 12-8 12-16 12h-3l-5 6v-7c-5-2-8-6-8-11z"/><path class="pink" d="M22 18c0-4 6-4 6 0 0-4 6-4 6 0 0 4-6 7-6 10 0-3-6-6-6-10z"/>',
  }, { // 소통 — 오른쪽 친구
    back: "",
    limbs: ["M98 102l-2 26", "M106 102l2 26", "M92 82l-12 6", "M112 82l6 22"],
    body: '<ellipse class="fl" cx="102" cy="88" rx="12" ry="16"/>',
    head: [102, 56, 16],
    face: '<path class="ln" d="M91 54q3-4 6 0M100 54q3-4 6 0"/><path class="ln" d="M93 62q5 4 10 0"/><path class="ln" d="M108 61l3 1"/>',
    front: '<path class="fl" d="M96 20c0-8 8-12 16-12s16 4 16 12-8 12-16 12h-3l-5 6v-7c-5-2-8-6-8-11z"/><circle class="dot" cx="105" cy="20" r="1.8"/><circle class="dot" cx="112" cy="20" r="1.8"/><circle class="dot" cx="119" cy="20" r="1.8"/>',
  }],
  6: [{ // 성찰
    back: '<path class="ln" d="M8 130h124"/><rect class="fl" x="102" y="10" width="28" height="22" rx="1"/><path class="ln" d="M107 26q5-9 9-2t9-6"/><path class="ln" d="M34 100h40M38 100l-4 28M70 100l4 28"/>',
    limbs: ["M50 96l22 4 0 26", "M58 94l22 4 2 28", "M44 72l14 20 12 0", "M66 72l14 10 10 0"],
    body: '<ellipse class="fl" cx="54" cy="80" rx="15" ry="18"/>',
    head: [54, 42, 20],
    face: '<path class="ln" d="M44 42q4 3 8 0M58 42q4 3 8 0"/><path class="ln" d="M50 52q5 3 10 0"/><path class="ln" d="M41 48l3-1M64 47l3 1"/>',
    front: '<rect class="fl" x="66" y="80" width="30" height="20" rx="1.5" transform="rotate(-10 81 90)"/><path class="ln" d="M72 88l16-3M73 93l12-2"/><path class="ln" d="M90 82l10-12"/><circle class="ln" cx="84" cy="22" r="2"/><circle class="ln" cx="92" cy="16" r="3"/>',
  }],
};

function renderFigure(f) {
  const outer = f.limbs.map((d) => `<path class="limb-o" d="${d}"/>`).join("");
  const inner = f.limbs.map((d) => `<path class="limb-i" d="${d}"/>`).join("");
  const [cx, cy, r] = f.head;
  const head = `<circle class="fl" cx="${cx}" cy="${cy}" r="${r}"/>${f.face}`;
  const tilted = f.headTilt ? `<g transform="rotate(${f.headTilt} ${cx} ${cy + r})">${head}</g>` : head;
  return `${f.back}${outer}${f.body}${inner}${tilted}${f.front}`;
}

export function doodle(no, label = "") {
  const list = figures[no];
  if (!list) return "";
  const title = label ? `<title>${label}</title>` : "";
  const aria = label ? 'role="img"' : 'aria-hidden="true"';
  return `<svg class="doodle" viewBox="0 0 140 140" ${aria}>${title}${BLOB}<g filter="url(#wobble)">${list.map(renderFigure).join("")}</g></svg>`;
}

// 첫 화면 제목 밑 손글씨 밑줄
export const squiggle = '<svg class="squiggle" viewBox="0 0 240 18" aria-hidden="true"><path filter="url(#wobble)" d="M4 12C30 4 50 4 70 10s44 6 66-1 48-6 70 1 22 4 26 2"/></svg>';
