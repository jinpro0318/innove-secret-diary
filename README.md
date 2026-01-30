# Innove Secret Diary

This project is an AI-based secret diary application, set up with Next.js, Tailwind CSS, and a Figma Token pipeline.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Generate Tokens**:
    Run this command whenever you update `tokens/design-tokens.json`:
    ```bash
    npm run tokens
    ```
    This transforms your tokens into CSS variables in `app/variables.css`.

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Connecting Figma

1.  **Export from Figma**: Use a plugin like "Tokens Studio for Figma" or "Variables2CSS".
2.  **Export Format**: JSON.
3.  **Save**: Replace the content of `tokens/design-tokens.json` with your exported JSON.
4.  **Build**: Run `npm run tokens`.

## Structure
- `tokens/`: Contains the source of truth for design tokens.
- `build-tokens.js`: Script to transform tokens using Style Dictionary.
- `tailwind.config.ts`: Mapped to use the generated CSS variables.
