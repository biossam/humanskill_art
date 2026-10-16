// 휴먼스킬아트 — 차시마다 표정이 다른 선 그림 친구들 (이 사이트를 위해 새로 그린 그림)
// 1 판단: 턱 괴고 생각하기 · 2 발견: 깜짝 놀라기 · 3 해석: 갸웃하기
// 4 재구성: 블록 들고 다시 짓기 · 5 소통: 손 흔들며 말하기 · 6 성찰: 눈 감고 돌아보기

const BLOB = '<path class="blob" d="M16 82C12 52 40 34 66 38c28 4 46 24 40 54-6 28-36 40-62 32-20-6-26-20-28-42z"/>';
const BODY = '<path class="fl" d="M40 74c-7 22-6 44 0 60h14c1-8 3-13 6-13s5 5 6 13h14c6-16 7-38 0-60"/>';
const HEAD = '<circle class="fl" cx="60" cy="44" r="32"/>';

const parts = {
  1: { // 판단
    arms: '<path class="ln" d="M40 84c-8 12-8 24-4 32"/><path class="ln" d="M80 84c14-4 12-18-2-18-4 0-6 4-4 7"/>',
    face: '<path class="ln" d="M45 35l9 2M66 37l9-2"/><circle class="dot" cx="50" cy="45" r="2.8"/><circle class="dot" cx="70" cy="45" r="2.8"/><path class="ln" d="M54 58h10"/>',
    extra: '<circle class="ln" cx="97" cy="20" r="2"/><circle class="ln" cx="104" cy="11" r="3"/><circle class="ln" cx="113" cy="4" r="3.5"/>',
  },
  2: { // 발견
    arms: '<path class="ln" d="M40 82c-10-8-8-20 0-22"/><path class="ln" d="M80 82c10-8 8-20 0-22"/>',
    face: '<circle class="ln" cx="50" cy="43" r="5"/><circle class="dot" cx="51" cy="44" r="2"/><circle class="ln" cx="70" cy="43" r="5"/><circle class="dot" cx="71" cy="44" r="2"/><ellipse class="ln" cx="60" cy="60" rx="4" ry="5"/>',
    extra: '<path class="ln" d="M101 8l2 9 9 2-9 2-2 9-2-9-9-2 9-2z"/><path class="ln" d="M17 22l6 6M13 34l8 2M24 13l4 8"/>',
  },
  3: { // 해석
    arms: '<path class="ln" d="M40 84c-8 12-8 24-4 32"/><path class="ln" d="M80 82c16-8 18-32 8-48"/>',
    face: '<path class="ln" d="M46 45q4-4 8 0"/><circle class="dot" cx="70" cy="45" r="2.8"/><path class="ln" d="M52 59q4-3 8 0t8 0"/>',
    extra: '<path class="ln" d="M100 16c0-9 13-9 13 0 0 6-6 6-6 12"/><circle class="dot" cx="107" cy="35" r="2"/>',
  },
  4: { // 재구성
    arms: '<path class="ln" d="M40 84c-8 6-14 10-20 12"/><path class="ln" d="M80 84c8 4 14 6 20 6"/>',
    face: '<circle class="dot" cx="50" cy="45" r="2.8"/><circle class="dot" cx="70" cy="45" r="2.8"/><path class="ln" d="M52 56q8 7 16 0"/>',
    extra: '<rect class="fl" x="4" y="90" width="18" height="18" rx="1.5"/><rect class="fl" x="97" y="76" width="16" height="16" rx="1.5" transform="rotate(14 105 84)"/><path class="ln" d="M103 60l6-8 6 8z"/>',
  },
  5: { // 소통
    arms: '<path class="ln" d="M40 84c-8 12-8 24-4 32"/><path class="ln" d="M80 82c12-8 18-20 18-30"/><path class="ln" d="M104 46l6-4M106 55h7"/>',
    face: '<path class="ln" d="M46 44q4-5 8 0M66 44q4-5 8 0"/><path class="fl" d="M52 55q8 12 16 0z"/>',
    extra: '<path class="fl" d="M8 22c0-8 8-13 17-13s17 5 17 13-8 13-17 13c-2 0-4 0-6-1l-8 6 2-8c-3-2-5-6-5-10z"/><circle class="dot" cx="18" cy="22" r="1.8"/><circle class="dot" cx="25" cy="22" r="1.8"/><circle class="dot" cx="32" cy="22" r="1.8"/>',
  },
  6: { // 성찰
    arms: '<path class="ln" d="M40 82c2 12 12 16 18 14"/><path class="ln" d="M80 82c-2 12-12 16-18 14"/>',
    face: '<path class="ln" d="M45 44q5 4 10 0M65 44q5 4 10 0"/><path class="ln" d="M55 58q5 3 10 0"/><path class="ln" d="M40 52l4-2M76 50l4 2"/>',
    extra: '<path class="ln" d="M100 24c0-6 8-6 8 0 0-6 8-6 8 0 0 6-8 10-8 14 0-4-8-8-8-14z"/>',
  },
};

export function doodle(no, label = "") {
  const p = parts[no];
  if (!p) return "";
  const title = label ? `<title>${label}</title>` : "";
  const aria = label ? 'role="img"' : 'aria-hidden="true"';
  return `<svg class="doodle" viewBox="0 0 120 140" ${aria}>${title}${BLOB}<g filter="url(#wobble)">${BODY}${HEAD}${p.arms}${p.face}${p.extra}</g></svg>`;
}

// 첫 화면 제목 밑 손글씨 밑줄
export const squiggle = '<svg class="squiggle" viewBox="0 0 240 18" aria-hidden="true"><path filter="url(#wobble)" d="M4 12C30 4 50 4 70 10s44 6 66-1 48-6 70 1 22 4 26 2"/></svg>';
