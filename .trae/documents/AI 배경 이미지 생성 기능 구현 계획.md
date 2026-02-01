# AI 배경 이미지 생성 기능 구현 계획

사용자 요청("제미나이에서 이미지를 만들어서 넣어주도록")을 반영하여, AI가 일기 내용에 어울리는 배경 이미지를 자동으로 생성하고 적용하는 기능을 구현하겠습니다. ("나노바나나"는 "나만의 배너" 혹은 AI 모델의 애칭으로 이해하고, **생성형 AI를 통한 이미지 생성**으로 구현합니다.)

## 1. AI 이미지 프롬프트 생성 (Backend)
Gemini는 텍스트 생성에 특화되어 있으므로, Gemini에게 직접 이미지를 생성하게 하는 대신 **"이미지 생성용 프롬프트(Image Prompt)"**를 작성하도록 시킵니다.
- **파일**: `src/app/api/diary/analyze/route.ts`
- **수정 내용**:
    - Gemini에게 `image_prompt` 필드를 추가로 요청합니다.
    - 예: "A soft watercolor painting of a peaceful night sky with a crescent moon, pastel tones" (영어로 요청해야 이미지 생성기 성능이 좋음).

## 2. 이미지 생성 및 적용 (Frontend)
Gemini가 만든 프롬프트를 받아 실제 이미지를 생성해주는 무료 생성형 AI 서비스(Pollinations.ai 등)를 활용하여 배경을 적용합니다. (별도의 API 키 없이 MVP에 즉시 적용 가능)
- **파일**: `src/features/diary/DiaryEditor.tsx`
- **수정 내용**:
    - `analyze` API 응답에서 `image_prompt`를 받습니다.
    - `https://image.pollinations.ai/prompt/{image_prompt}` 형태의 URL을 생성합니다.
    - `Card` 컴포넌트의 스타일을 업데이트하여 `backgroundColor` 대신 `backgroundImage`를 적용합니다.

## 3. 실행 계획
1.  **Backend**: `route.ts` 프롬프트 수정 (image_prompt 추가).
2.  **Frontend**: `DiaryEditor.tsx`에서 이미지 URL 생성 및 배경 적용 로직 구현.
