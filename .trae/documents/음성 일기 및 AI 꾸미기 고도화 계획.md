# 음성 일기 및 AI 꾸미기 고도화 계획

사용자 요청에 따라 음성 인식 일기 작성, AI 자동 정리, 그리고 테마/스티커 꾸미기 기능을 구현하겠습니다.

## 1. 음성 인식 및 AI 일기 정리 (Voice to AI Diary)
- **기능**:
    - **음성 녹음**: Web Speech API (`SpeechRecognition`)를 사용하여 사용자의 음성을 실시간으로 텍스트로 변환합니다.
    - **AI 정리**: 변환된 텍스트와 사용자가 입력한 텍스트를 합쳐 Gemini에게 전송하면, AI가 자연스러운 일기 형태로 정리(Rewrite)해줍니다.
- **UI**:
    - `DiaryEditor`에 '마이크' 버튼 추가.
    - 녹음 중 시각적 피드백(파동 애니메이션 등) 제공.
- **Backend (`/api/diary/analyze`)**:
    - 기존 분석 로직에 `rewritten_content` 필드를 추가하여, AI가 정리한 일기 내용을 반환하도록 수정합니다.

## 2. 테마 자동 꾸미기 (Auto Theme)
- **기능**: AI 분석 결과(`mood`, `color`)를 바탕으로 일기장의 배경색과 패턴을 자동으로 변경합니다.
- **구현**:
    - 분석된 `color`를 `Card` 컴포넌트의 배경 스타일로 적용.
    - 감정에 따른 패턴(비, 햇살 등 CSS 오버레이) 적용.

## 3. 스티커 시스템 (Sticker System)
- **기능**:
    - **자동 배치**: AI가 제안한 위치(`x`, `y`)에 스티커 자동 배치.
    - **수동 배치**: 사용자가 스티커 샵에서 스티커를 골라 드래그 앤 드롭으로 배치.
    - **프리미엄**: 일부 스티커는 `is_premium` 유저만 사용 가능하도록 잠금 처리.
- **컴포넌트**:
    - `StickerShop`: 스티커 목록을 보여주는 사이드바/모달.
    - `DraggableSticker`: Framer Motion을 이용한 드래그 가능한 스티커 컴포넌트.

## 4. 실행 계획 (Execution Steps)
1.  **Dependencies**: `regenerator-runtime` (음성 인식 호환성용) 등 확인.
2.  **Hooks**: `useSpeechRecognition` 커스텀 훅 구현 (라이브러리 없이 네이티브 API 사용 권장).
3.  **Components**:
    - `src/features/diary/VoiceRecorder.tsx`: 음성 녹음 버튼.
    - `src/features/diary/StickerShop.tsx`: 스티커 선택 UI.
    - `src/features/diary/StickerCanvas.tsx`: 스티커가 배치될 레이어.
4.  **Update Editor**: `DiaryEditor.tsx`에 위 기능 통합.
5.  **Update API**: Gemini 프롬프트 수정.
