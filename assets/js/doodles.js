// 휴먼스킬아트 — 차시마다 자세와 표정이 다른 선 그림 친구들 (이 사이트를 위해 새로 그린 그림)
// 1 판단: 앉아서 턱 괴고 저울 들기        2 발견: 엎드려 돋보기로 꽃 보기
// 3 해석: 물구나무로 거꾸로 보기          4 재구성: 허리 접고 블록 쌓기, 뒤집기
// 5 소통: 팔다리 벌려 점프, 하트 말풍선    6 성찰: 물 위에 누워 떠 있기, 비친 모습
//
// 그리는 순서: 색 얼룩 → 뒤 소품 → 팔다리 테두리 → 몸 → 팔다리 속 → 머리 → 얼굴 → 앞 소품
// 팔다리는 검은 굵은 선 위에 흰 가는 선을 겹쳐 "속이 빈 관"처럼 보이게 합니다.

const BLOB = '<path class="blob" d="M18 84C14 50 46 30 76 34c32 4 54 28 48 60-6 30-40 44-70 36-22-6-34-22-36-46z"/>';

const poses = {
  1: { // 판단 — 앉아서 턱 괴고, 한 손엔 저울
    back: '<path class="ln" d="M10 128h120"/>',
    limbs: [
      "M54 100c-20 8-14 20 14 18",      // 왼다리 (책상다리)
      "M76 100c20 8 14 20-14 20",       // 오른다리
      "M50 74l-18 8-8-6",               // 저울 든 팔
      "M80 72l8 20-16-28",              // 턱 괸 팔 (팔꿈치는 무릎 위)
    ],
    body: '<ellipse class="fl" cx="65" cy="82" rx="17" ry="22"/>',
    head: [62, 42, 22],
    face: '<path class="ln" d="M51 33l9 3M66 36l9-3"/><circle class="dot" cx="56" cy="42" r="2.6"/><path class="ln" d="M66 42h7"/><path class="ln" d="M58 53q3-3 6 0t6 0"/>',
    front: '<path class="ln" d="M24 76V54M10 50l28 8M10 50l-4 12M10 50l4 12M38 58l-4 12M38 58l4 12"/><path class="fl" d="M3 62q7 9 14 0z"/><path class="fl" d="M31 70q7 9 14 0z"/><circle class="ln" cx="92" cy="22" r="2"/><circle class="ln" cx="99" cy="13" r="3"/><circle class="ln" cx="108" cy="6" r="3.5"/>',
  },
  2: { // 발견 — 엎드려서 돋보기로 작은 꽃 보기
    back: '<path class="ln" d="M4 126h132"/><path class="ln" d="M16 126v-10"/><circle class="fl" cx="16" cy="112" r="4"/><circle class="ln" cx="10" cy="112" r="3"/><circle class="ln" cx="22" cy="112" r="3"/><circle class="ln" cx="16" cy="106" r="3"/>',
    limbs: [
      "M100 104l18 4 8-22",             // 위로 찬 다리
      "M104 110l20 4 10-16",            // 위로 찬 다리
      "M70 106l-8 14",                  // 받친 팔
      "M60 104l-18 14-8-6",             // 돋보기 든 팔
    ],
    body: '<ellipse class="fl" cx="82" cy="108" rx="28" ry="13"/>',
    head: [50, 80, 22],
    face: '<path class="ln" d="M36 66q5-5 10-1M52 64q5-4 10 1"/><circle class="fl" cx="42" cy="78" r="5"/><circle class="dot" cx="41" cy="79" r="2.2"/><circle class="fl" cx="57" cy="77" r="5"/><circle class="dot" cx="56" cy="78" r="2.2"/><ellipse class="fl" cx="48" cy="91" rx="3.5" ry="4.5"/>',
    front: '<path class="ln" d="M34 112l-6-6"/><circle class="lens" cx="20" cy="98" r="10"/><path class="ln" d="M8 80l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path class="ln" d="M70 54l4-6M80 60l7-3"/>',
  },
  3: { // 해석 — 물구나무서서 거꾸로 보기
    back: '<path class="ln" d="M10 130h120"/>',
    limbs: [
      "M60 84l-12 44",                  // 땅 짚은 팔
      "M80 84l12 44",                   // 땅 짚은 팔
      "M64 54l-14-32 6-4",              // 하늘로 뻗은 다리
      "M76 54l18-30-4-6",               // 하늘로 뻗은 다리
    ],
    body: '<ellipse class="fl" cx="70" cy="70" rx="15" ry="20"/>',
    head: [70, 108, 20],
    face: '<path class="ln" d="M60 96q10-9 20 0"/><path class="ln" d="M66 101q3 4 6 0"/><circle class="dot" cx="63" cy="111" r="2.6"/><circle class="dot" cx="77" cy="111" r="2.6"/><path class="ln" d="M58 104l-4 2M82 104l4 2"/>',
    front: '<path class="ln" d="M104 30c0-9 13-9 13 0 0 6-6 6-6 12"/><circle class="dot" cx="111" cy="49" r="2"/><path class="ln" d="M36 20q-5 5 0 10M30 14q-8 8 0 18"/>',
  },
  4: { // 재구성 — 허리 접고 블록 쌓기
    back: '<path class="ln" d="M6 130h128"/><rect class="fl" x="98" y="108" width="22" height="22" rx="1.5"/><rect class="fl" x="100" y="88" width="20" height="20" rx="1.5" transform="rotate(-6 110 98)"/><path class="fl" d="M12 130l10-16 10 16z"/>',
    limbs: [
      "M44 92l-6 38",                   // 다리
      "M52 94l4 36",                    // 다리
      "M64 70l34 0",                    // 블록 든 팔
      "M60 76l34 8",                    // 블록 든 팔
    ],
    body: '<ellipse class="fl" cx="56" cy="80" rx="23" ry="14" transform="rotate(-38 56 80)"/>',
    head: [74, 38, 20],
    face: '<path class="ln" d="M66 28h7M78 27h7"/><circle class="dot" cx="70" cy="36" r="2.6"/><circle class="dot" cx="82" cy="36" r="2.6"/><path class="ln" d="M70 46q6 3 12 0"/><path class="fl" d="M76 47q2 7 5 0"/>',
    front: '<rect class="fl" x="96" y="62" width="18" height="16" rx="1.5" transform="rotate(-14 105 70)"/><path class="ln" d="M100 50q10-12 22-2"/><path class="ln" d="M116 44l6 4-4 6"/>',
  },
  5: { // 소통 — 팔다리 벌려 점프, 하트 말풍선
    back: '<path class="ln" d="M42 132h12M62 135h14M86 132h12"/>',
    limbs: [
      "M58 70l-24-20-6-12",             // 팔 위로
      "M82 70l24-20 6-12",              // 팔 위로
      "M62 98l-14 22",                  // 다리 벌리기
      "M78 98l14 22",                   // 다리 벌리기
    ],
    body: '<ellipse class="fl" cx="70" cy="80" rx="16" ry="20"/>',
    head: [70, 40, 22],
    face: '<path class="ln" d="M57 38q4-6 9 0M74 38q4-6 9 0"/><path class="fl" d="M59 48q11 15 22 0z"/><path class="ln" d="M52 46l4-2M84 44l4 2"/>',
    front: '<path class="fl" d="M6 16c0-8 8-12 16-12s16 4 16 12-8 12-16 12c-2 0-4 0-6-1l-7 5 2-7c-3-2-5-5-5-9z"/><path class="pink" d="M16 14c0-4 6-4 6 0 0-4 6-4 6 0 0 4-6 7-6 10 0-3-6-6-6-10z"/><path class="ln" d="M120 14v10M120 30v1"/><path class="ln" d="M116 46l6-2M118 54h6"/>',
  },
  6: { // 성찰 — 물 위에 누워 떠 있기
    back: '<path class="ln" d="M124 18a11 11 0 1 0 6 18 8 8 0 1 1-6-18z"/><path class="ln" d="M96 14l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"/>',
    limbs: [
      "M100 94l28-4 2-6",               // 뻗은 다리
      "M100 100l26 4",                  // 뻗은 다리
    ],
    body: '<ellipse class="fl" cx="78" cy="96" rx="28" ry="12"/>',
    head: [38, 86, 20],
    face: '<path class="ln" d="M27 83q4 4 8 0M41 83q4 4 8 0"/><path class="ln" d="M33 93q5 3 10 0"/><path class="ln" d="M24 90l3-1M50 89l3 1"/>',
    front: '<path class="limb-o" d="M56 92q10-12 24-8"/><path class="limb-i" d="M56 92q10-12 24-8"/><path class="water" d="M2 104q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0"/><path class="echo" d="M20 116h22M54 120h34M98 116h22M34 128h16M70 130h28"/>',
  },
};

function render(p) {
  const outer = p.limbs.map((d) => `<path class="limb-o" d="${d}"/>`).join("");
  const inner = p.limbs.map((d) => `<path class="limb-i" d="${d}"/>`).join("");
  const [cx, cy, r] = p.head;
  return `${p.back}${outer}${p.body}${inner}<circle class="fl" cx="${cx}" cy="${cy}" r="${r}"/>${p.face}${p.front}`;
}

export function doodle(no, label = "") {
  const p = poses[no];
  if (!p) return "";
  const title = label ? `<title>${label}</title>` : "";
  const aria = label ? 'role="img"' : 'aria-hidden="true"';
  return `<svg class="doodle" viewBox="0 0 140 140" ${aria}>${title}${BLOB}<g filter="url(#wobble)">${render(p)}</g></svg>`;
}

// 첫 화면 제목 밑 손글씨 밑줄
export const squiggle = '<svg class="squiggle" viewBox="0 0 240 18" aria-hidden="true"><path filter="url(#wobble)" d="M4 12C30 4 50 4 70 10s44 6 66-1 48-6 70 1 22 4 26 2"/></svg>';
