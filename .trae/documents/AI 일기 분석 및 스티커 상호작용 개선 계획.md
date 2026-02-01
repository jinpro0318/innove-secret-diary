# AI 일기 분석 및 스티커 상호작용 개선 계획

사용자 피드백을 반영하여 AI의 일기 수정 방식을 개선하고, 스티커의 조작 편의성을 높이겠습니다.

## 1. AI 일기 수정 로직 개선 (Gentle Refinement)
기존의 "완전히 새로 쓰기(Rewrite)" 방식에서 **"원본의 뉘앙스를 유지하며 다듬기(Polishing)"** 방식으로 변경합니다.
- **Backend (`/api/diary/analyze`)**:
    - Gemini 프롬프트 수정: "Rewrite" 대신 "Polish" 또는 "Refine" 지시어 사용.
    - 제약 조건 추가: "사용자의 원래 문체와 내용을 최대한 보존하되, 맞춤법을 교정하고 문장을 조금 더 매끄럽게 다듬어라."

## 2. 스티커 인터랙션 개선 (Interactive Stickers)
이미 구현된 드래그 기능에 더해, 사용자가 스티커를 더 자유롭게 다룰 수 있도록 개선합니다. (이미 드래그 기능은 `DraggableSticker`에 구현되어 있으나, 사용성을 점검하고 강화합니다.)
- **현재 상태 확인**: `DraggableSticker`는 이미 `framer-motion`의 `drag` 속성을 사용하여 이동이 가능함.
- **추가 개선**:
    - AI가 자동 배치한 스티커도 사용자가 즉시 이동할 수 있도록 상태 관리 로직 재확인.
    - "테마도 스티커를 선택해서 직접 옮길 수 있도록"이라는 요청은 이미 구현된 기능을 재확인하거나, 혹시 배경 요소(Theme Elements)까지 움직이길 원하는지 고려해야 함. -> 현재는 **스티커** 이동에 집중.

## 3. 실행 계획
1.  **API 수정**: `src/app/api/diary/analyze/route.ts`의 프롬프트를 "살짝만 변경"하도록 수정.
2.  **UI 점검**: `DiaryEditor.tsx`에서 스티커 드래그 동작 확인 및 보완.

## 변경될 프롬프트 예시
```text
Task: Polish the user's diary entry.
Constraint: Keep the original tone and content. Only fix grammar and make sentences slightly smoother. Do not dramatically change the meaning or length.
```
