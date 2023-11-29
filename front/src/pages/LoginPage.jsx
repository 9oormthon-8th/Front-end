import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>로고</div>
      <button onClick={() => navigate("/map")}>로그인</button>
    </div>
  );
}
