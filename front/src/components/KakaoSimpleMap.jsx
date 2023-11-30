import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../hooks/useKakaoLoader";
import { useGeoLocation } from "../hooks/useGeoLocation";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const KakaoSimpleMap = () => {
  const dummyLoactions = [
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
      message: "카카오에 대한 기록",
    },
    {
      title: "성산일출봉",
      latlng: { lat: 33.459219, lng: 126.940698 },
      message: "성산일출봉에 대한 기록",
    },
    {
      title: "월정리",
      latlng: { lat: 33.5564749, lng: 126.79586 },
      message: "월정리에 대한 기록",
    },
    {
      title: "신창풍차해안",
      latlng: { lat: 33.345346, lng: 126.17766 },
      message: "신창풍차차차차차차차.",
    },
  ];

  const navigate = useNavigate();

  useKakaoLoader();

  const [level, setLevel] = useState(11);
  const [curLocation, setCurLocation] = useState({ latitude: 0, longitude: 0 });

  // 맵 화면 위치
  const [state, setState] = useState({
    center: { lat: 33.37666, lng: 126.54245 },
    isPanto: true,
  });

  return (
    <div>
      <Map
        center={state.center}
        style={{ width: "400px", height: "400px" }}
        level={level}
        draggable={false}
        zoomable={false}
      >
        {dummyLoactions.map((loc, idx) => (
          <MapMarker
            key={`${loc.title}-${loc.latlng}`}
            position={loc.latlng}
            image={{
              src: "image/KakaoMap/Marker.png",
              size: { width: 15, height: 15 },
            }}
            title={loc.title}
          />
        ))}

        {curLocation && <MapMarker position={{ lat: curLocation.latitude, lng: curLocation.longitude }} />}
      </Map>
    </div>
  );
};

export default KakaoSimpleMap;
