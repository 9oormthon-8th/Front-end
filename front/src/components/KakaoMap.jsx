import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../hooks/useKakaoLoader";
import { useGeoLocation } from "../hooks/useGeoLocation";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const KakaoMap = () => {
  useKakaoLoader();

  const dummyLoactions = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "성산일출봉", latlng: { lat: 33.459219, lng: 126.940698 } },
    { title: "월정리", latlng: { lat: 33.5564749, lng: 126.79586 } },
    { title: "신창풍차해안", latlng: { lat: 33.345346, lng: 126.17766 } },
  ];

  const [level, setLevel] = useState(11);
  const [curLocation, setCurLocation] = useState();

  const { location, error } = useGeoLocation(geolocationOptions); // 현위치

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

  console.log("ㅇ", curLocation);

  useEffect(() => {
    setCurLocation(location);
  }, [location]);

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
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 24, height: 35 },
            }}
            title={loc.title}
          />
        ))}
      </Map>
      <button
        onClick={() => (
          setState({
            center: { lat: curLocation.latitude, lng: curLocation.longitude },
            isPanto: true,
          }),
          setLevel(9)
        )}
      >
        현위치
      </button>
    </div>
  );
};

export default KakaoMap;

// 위경도, 도로명주소
