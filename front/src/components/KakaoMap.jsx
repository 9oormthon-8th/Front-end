import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";

const KakaoMap = ({ location }) => {
  const dummyLoactions = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "성산일출봉", latlng: { lat: 33.459219, lng: 126.940698 } },
    { title: "월정리", latlng: { lat: 33.5564749, lng: 126.79586 } },
    { title: "신창풍차해안", latlng: { lat: 33.345346, lng: 126.17766 } },
  ];

  const [level, setLevel] = useState(10);

  return (
    <div>
      <Map
        center={{ lat: location.latitude, lng: location.longitude }}
        style={{ width: "400px", height: "600px" }}
        level={level}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        {dummyLoactions.map((loc, idx) => (
          <MapMarker
            key={`${loc.title}-${loc.latlng}`}
            position={loc.latlng}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 24, height: 35 },
            }}
            title={loc.title}
          />
        ))}
        <MapMarker
          position={{ lat: location.latitude, lng: location.longitude }}
        />
      </Map>
    </div>
  );
};

export default KakaoMap;

// 위경도, 도로명주소
