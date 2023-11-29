import React from "react";
import KakaoMap from "../components/KakaoMap";
import { useLocation } from "react-router-dom";

const MapPage = () => {
  const location = useLocation();

  return (
    <div>
      <KakaoMap />
    </div>
  );
};

export default MapPage;
