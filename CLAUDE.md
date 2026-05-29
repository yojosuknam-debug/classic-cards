# 고전 전략 카드덱 — 에이전트 규칙

설계서: `d:\YH\APP\nexis-lab-home\docs\고전전략카드덱_설계서_v0.1.md`

## 콘텐츠 규칙 (최우선)

1. **원문 인용**: 저작재산권 만료 원문(BCE~17C)만 사용. 시중 번역본 문장 복붙 금지.
2. **해설**: `commentary`, `applyTip` 필드는 반드시 오리지널 창작. 타 해설서·유튜브 스크립트 모방 금지.
3. **수치화 금지**: 진단 결과에 점수·확률·퍼센트 표기 금지. 유형 분류(텍스트)만 허용.

## 아키텍처 규칙

- **외부 API·서버 없음** (MVP). `fetch()` 로 외부 엔드포인트를 호출하는 코드 추가 금지.
- 모든 데이터는 `src/content/*.json` 번들 또는 `localStorage` 에서만.
- 이미지 생성은 `html-to-image` 만 사용 (react-native-view-shot 사용 금지 — 웹 전용).

## 스택

- Vite + React 18 + JavaScript (TypeScript 아님)
- Tailwind CSS (tailwind.config.js 기준 ink/gold 색상 팔레트)
- React Router DOM v6
- lucide-react 아이콘

## 마일스톤 현황

- [x] M0: 프로젝트 셋업 + BottomNav + 테마
- [x] M1: 카드 데이터 + 홈/상세
- [x] M2: 즐겨찾기·메모 (localStorage)
- [x] M3: 공유 (Web Share API + 클립보드 fallback)
- [ ] M4: 스토어 결제 (웹: 토스페이먼츠/Stripe)
- [ ] M5: 전략 스타일 진단 (P1)
- [ ] M6: 배포 (Vercel)
