import React from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";

const MapPage = () => {
  const location = useLocation();

  return (
    <div>
      <KakaoMap />
    </div>
  );
};

export default MapPage;
