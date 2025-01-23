import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    // JSONPlaceholder API를 사용하여 사용자 데이터 가져오기
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    // 에러 발생 시 Sentry에 에러 보고
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "사용자 데이터를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 의도적으로 에러를 발생시키는 테스트 케이스
    if (!body.name) {
      throw new Error("이름은 필수 입력 항목입니다.");
    }

    // JSONPlaceholder API로 POST 요청
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "사용자 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}
