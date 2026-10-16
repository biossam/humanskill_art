# 휴먼스킬아트 (biossam_art_class)

미술 교재 **휴먼스킬아트**(초등 6학년, 6차시)의 수업 영상과 선생님 자료를 제공하는 웹사이트입니다.

- 선생님 자료실: https://biossam.github.io/humanskill_art/
- 학생용 화면: https://biossam.github.io/humanskill_art/?view=student

## 무엇이 있나

| 화면 | 내용 |
|---|---|
| 첫 화면 | 교재 소개, 6개 차시 목록 (판단 → 발견 → 해석 → 재구성 → 소통 → 성찰) |
| 차시 화면 | 수업 영상, 학습 목표, 준비물, 활동 순서, 생각해 볼 질문, 선생님 자료(PPT·지도안) |
| 수업 모드 | 교실 TV용 전체 화면. 화살표·리모컨으로 활동 단계를 한 단계씩 넘김 |
| 학생용 화면 | 주소 끝 `?view=student`. 선생님 자료 칸이 숨겨짐 |
| QR 코드 | 학생용 화면으로 가는 QR 코드. 인쇄 가능 |

## 자료 추가

모든 내용은 `data/course.json`에서 관리합니다. 방법은 [docs/자료추가방법.md](docs/자료추가방법.md)를 보세요.

- 영상: YouTube(직접 찍은 영상은 일부공개)에 올리고 영상 ID만 기록
- PPT·지도안: 구글 드라이브에 올리고 공유 링크를 기록

## 구조

```
index.html              화면 틀
assets/css/style.css    디자인
assets/js/app.js        동작 (차시 목록, 차시 화면, 수업 모드, QR)
data/course.json        ★ 교재·차시·영상·자료 링크
docs/자료추가방법.md     자료 추가 안내
```

빌드 과정이 없는 정적 사이트이며 GitHub Pages로 무료 운영합니다.

## 내 컴퓨터에서 미리 보기

`data/course.json`을 불러오므로 파일을 더블클릭하면 열리지 않습니다. 폴더에서 아래 명령을 실행한 뒤 http://localhost:8000 에 접속하세요.

```
python -m http.server 8000
```

## 이용 조건

- 수업 자료(영상 정보, PPT, 지도안): **CC BY-NC 4.0**. 출처(휴먼스킬아트·장혜림)를 밝히면 자유롭게 고쳐 쓸 수 있으며, 영리 목적으로는 사용할 수 없습니다.
- 개발: 장혜림
