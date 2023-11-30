import React from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import KakaoSimpleMap from "../components/KakaoSimpleMap";

const MapPage = () => {
  const location = useLocation();

  return (
    <div>
      <KakaoMap />
      <KakaoSimpleMap />
    </div>
  );
};

export default MapPage;
