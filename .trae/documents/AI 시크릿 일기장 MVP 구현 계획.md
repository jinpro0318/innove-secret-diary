# AI 시크릿 일기장 (MVP) 구현 계획

사용자의 요구사항에 맞춰 감성적이고 부드러운 UI/UX를 가진 'AI 시크릿 일기장'의 기본 구조와 핵심 컴포넌트를 구현하겠습니다.

## 1. 프로젝트 초기 설정 (Environment Setup)

* **Tailwind CSS 초기화**: `tailwind.config.ts` 및 `globals.css` 생성.

* **필수 라이브러리 설치**:

  * `@google/generative-ai`: Google Gemini API 연동.

  * `react-markdown`: 마크다운 렌더링.

  * `date-fns`: 날짜 처리 유틸리티.

  * `framer-motion`: (이미 설치됨) 애니메이션 효과.

## 2. 폴더 구조 설계 (Folder Structure)

Next.js App Router에 적합한 기능 중심(Feature-based) 구조를 제안합니다.

```
src/
├── app/                  # 페이지 및 레이아웃
│   ├── layout.tsx        # 전역 레이아웃 (폰트, 테마 설정)
│   ├── page.tsx          # 메인(랜딩) 페이지
│   └── diary/            # 일기장 관련 페이지 (작성, 조회)
├── components/           # 공용 컴포넌트
│   ├── ui/               # 기본 UI (Button, Card, Input)
│   └── shared/           # 공통 모듈 (Header, Navigation)
├── features/             # 기능별 컴포넌트
│   └── diary/            # 일기 관련 (DiaryEditor, MoodSelector)
├── lib/                  # 유틸리티 및 설정
│   ├── gemini.ts         # AI API 클라이언트
│   ├── supabase.ts       # DB/Auth 클라이언트
│   └── utils.ts          # 기타 유틸리티
├── hooks/                # 커스텀 훅
└── types/                # TypeScript 타입 정의
```

## 3. 상세 구현 내용 (Implementation Details)

### A. 디자인 시스템 설정 (`tailwind.config.ts`, `globals.css`)

* **Color Palette**: 파스텔 톤 위주의 색상 정의 (`pastel-pink`, `pastel-blue`, `paper-texture` 등).

* **Typography**: 손글씨 느낌의 한글 폰트 적용 (`Nanum Pen Script` 또는 `Gamja Flower` via `next/font/google`).

* **Texture**: 종이 질감 배경 적용을 위한 CSS 클래스 추가.

### B. 메인 페이지 (`src/app/page.tsx`)

* 사용자가 처음 마주하는 '비밀 일기장' 대문.

* **Design**: 다이어리 표지 느낌의 UI.

* **Interaction**: '일기장 열기' 버튼 클릭 시 인증(MVP에선 모의 인증) 후 작성 페이지로 이동하는 부드러운 애니메이션.

### C. 일기 작성 컴포넌트 (`src/features/diary/DiaryEditor.tsx`)

* **Editor**: 제목, 본문(마크다운 지원), 날짜 입력.

* **Photo Upload**: 이미지 첨부 UI.

* **AI Action**: '저장 및 꾸미기' 버튼. (클릭 시 Gemini가 분석한다는 시각적 피드백 구현).

## 4. 실행 단계 (Execution Steps)

1. **Dependencies & Config**: 필요한 패키지 설치 및 Tailwind 설정 파일 생성.
2. **Scaffold Structure**: 폴더 구조 생성.
3. **Styles & Fonts**: 글로벌 스타일 및 폰트 설정.
4. **UI Components**: 버튼, 카드 등 기본 컴포넌트 작성.
5. **Feature Implementation**: DiaryEditor 및 메인 페이지 작성.

