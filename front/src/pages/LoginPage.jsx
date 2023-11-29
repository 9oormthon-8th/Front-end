import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [location, setLoacation] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  return (
    <div>
      <div>로고</div>
      <button onClick={() => navigate("/map", { state: location })}>
        로그인
      </button>
    </div>
  );
}
