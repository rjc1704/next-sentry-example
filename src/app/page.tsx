"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { User } from "@/types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 사용자 목록을 가져오는 함수
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("사용자 데이터를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      // 클라이언트 사이드 에러를 Sentry에 보고
      Sentry.captureException(error);
      setError("사용자 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 새로운 사용자를 생성하는 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // 폼 요소를 미리 저장
    const formData = new FormData(form);

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("사용자 생성에 실패했습니다.");
      }

      alert("사용자가 생성되었습니다!");
      form.reset(); // 저장해둔 폼 요소 사용
    } catch (error) {
      Sentry.captureException(error);
      setError("사용자 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 의도적으로 에러를 발생시키는 테스트 함수
  const generateError = () => {
    try {
      throw new Error("이것은 테스트 에러입니다!");
    } catch (error) {
      Sentry.captureException(error);
      setError("테스트 에러가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Sentry 에러 모니터링 예제</h1>

      {/* 사용자 생성 폼 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">새 사용자 생성</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">이름:</label>
            <input
              type="text"
              name="name"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">이메일:</label>
            <input
              type="email"
              name="email"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "처리중..." : "사용자 생성"}
          </button>
        </form>
      </div>

      {/* 사용자 목록 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">사용자 목록</h2>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "로딩중..." : "사용자 목록 가져오기"}
        </button>

        {users.length > 0 && (
          <ul className="mt-4 space-y-2">
            {users.map((user: User) => (
              <li key={user.id} className="border p-2 rounded">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 테스트 에러 발생 버튼 */}
      <div>
        <button
          onClick={generateError}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          테스트 에러 발생시키기
        </button>
      </div>

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}
