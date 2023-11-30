import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../hooks/useKakaoLoader";
import { useGeoLocation } from "../hooks/useGeoLocation";
import ArrowBack from "../components/ArrowBack";
import axios from "axios";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

const KakaoMap = () => {
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

  // 확대 수준
  const [level, setLevel] = useState(10);
  // 현재 위치
  const [curLocation, setCurLocation] = useState({ latitude: 0, longitude: 0 });
  // 맵 화면 위치
  const [state, setState] = useState({
    center: { lat: 33.450705, lng: 126.570677 },
    isPanto: true,
  });
  // 마커 상세정보 모달
  const [MarkerOpen, setMarkerOpen] = useState(false);
  // 선택된 마커 표시
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 마커 클릭
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMarkerOpen(true);
  };
  // 현주소
  const [address, setAddress] = useState();

  // 도로명 주소 불러오기
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
    const callback = function (result, status) {
      console.log(result);
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [curLocation]);

  // 현위치
  useEffect(() => {
    let polling = setInterval(() => {
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

      return () => {
        clearInterval(polling);
      };
    }, 3000);
  }, []);

  useEffect(() => {}, [curLocation]);

  // 최초 위치 갱신
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          setCurLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div>
      <ArrowBack title="" />
      <Map
        id="map"
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "400px", height: "600px" }}
        level={level}
        onDragEnd={(map) =>
          setState({
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
          })
        }
      >
        {/* 내가 기록한 곳 */}
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

        {/* 내 위치 */}
        {curLocation && <MapMarker position={{ lat: curLocation.latitude, lng: curLocation.longitude }} />}
        <div>
          {curLocation.latitude} / {curLocation.longitude}
        </div>
        <div>{address}</div>
      </Map>

      {/* 마커 누를 때 나오는 바텀 */}
      {setMarkerOpen && selectedMarker && (
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
        <img src="image/KakaoMap/MyLocation.png" alt="현위치" style={{ width: 25, heigh: 25 }} />
      </div>

      <div onClick={() => navigate("/writing", { state: { address, curLocation } })}>
        <img src="image/KakaoMap/WriteButton.png" alt="글쓰기" style={{ width: 75, heigh: 28 }} />
      </div>
    </div>
  );
};

export default KakaoMap;
