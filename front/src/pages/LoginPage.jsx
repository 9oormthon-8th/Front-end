import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [location, setLoacation] = useState(0);

  return (
    <div>
      <div>로고</div>
      <button onClick={() => navigate("/map")}>로그인</button>
    </div>
  );
}
