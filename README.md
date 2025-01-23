This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sentry 설정하기

1. [Sentry](https://sentry.io)에 가입 후 새 프로젝트 생성:

   - "Platform" 선택 시 "Next.js" 선택
   - Sentry 웹사이트에서 안내하는 설정 마법사를 따라가면 자동으로 기본 설정이 완료됩니다

2. 설정 마법사에서 제공하는 명령어를 실행:

   ```bash
   # Sentry CLI 및 SDK 설치
   npx @sentry/wizard@latest -i nextjs
   ```

   이 명령어는 자동으로:

   - @sentry/nextjs 패키지를 설치하고
   - 필요한 설정 파일들을 생성하며
   - next.config.mjs를 업데이트합니다

3. 환경변수 설정:

   - 설정 마법사가 제공하는 환경변수를 `.env.local` 파일에 복사
   - 제공되는 환경변수에는 이미 프로젝트의 DSN과 인증 정보가 포함되어 있습니다

4. 테스트:
   - 예제 코드의 "테스트 에러 발생시키기" 버튼을 클릭하여 에러를 발생시켜보세요
   - Sentry 대시보드에서 발생한 에러를 확인할 수 있습니다

더 자세한 설정 옵션은 [Sentry Next.js 문서](https://docs.sentry.io/platforms/javascript/guides/nextjs/)를 참조하세요.
