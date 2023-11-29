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

const KakaoMap = () => {
  const navigate = useNavigate();

  useKakaoLoader();

  // 마커 상세정보 모달, 선택된 마커 표시
  const [isMarkerOpen, setIsMarkerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 마커 클릭
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsMarkerOpen(true);
  };

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

  const [level, setLevel] = useState(11);
  const [curLocation, setCurLocation] = useState({ latitude: 0, longitude: 0 });

  // 현위치
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCurLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0,
        }
      );
    }
  }, []);
  console.log(curLocation);

  // 맵 화면 위치
  const [state, setState] = useState({
    center: { lat: 33.450705, lng: 126.570677 },
    isPanto: true,
  });

  return (
    <div>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "400px", height: "600px" }}
        level={level}
      >
        {dummyLoactions.map((loc, idx) => (
          <MapMarker
            key={`${loc.title}-${loc.latlng}`}
            position={loc.latlng}
            image={{
              src:
                selectedMarker && loc.title === selectedMarker.title
                  ? "image/KakaoMap/SelectedMarker.png"
                  : "image/KakaoMap/Marker.png",
              size:
                selectedMarker && loc.title === selectedMarker.title
                  ? { width: 30, height: 30 }
                  : { width: 15, height: 15 },
            }}
            title={loc.title}
            onClick={() => handleMarkerClick(loc)}
          />
        ))}

        {curLocation && (
          <MapMarker
            position={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          />
        )}
      </Map>
      {setIsMarkerOpen && selectedMarker && (
        <div>
          <p>{selectedMarker.title}</p>
          <p>{selectedMarker.message}</p>
        </div>
      )}

      <div
        onClick={() => (
          setState({
            center: { lat: curLocation.latitude, lng: curLocation.longitude },
            isPanto: true,
          }),
          setLevel(9)
        )}
      >
        <img
          src="image/KakaoMap/MyLocation.png"
          alt="현위치"
          style={{ width: 25, heigh: 25 }}
        />
      </div>

      <div onClick={() => navigate("/writing")}>
        <img
          src="image/KakaoMap/WriteButton.png"
          alt="글쓰기"
          style={{ width: 75, heigh: 28 }}
        />
      </div>
    </div>
  );
};

export default KakaoMap;

// 위경도, 도로명주소
