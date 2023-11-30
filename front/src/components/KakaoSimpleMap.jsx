import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../hooks/useKakaoLoader";
import { useGeoLocation } from "../hooks/useGeoLocation";
import arrow_expand from "../assets/icons/arrow-expand.svg";
import { styled } from "styled-components";
import axios from "axios";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const KakaoSimpleMap = () => {
  const navigate = useNavigate();
  useKakaoLoader();

  const [dairyList, setDairyList] = useState([]);

  // 다이어리 목록 불러오기
  const getDairyAll = async () => {
    try {
      const response = await axios.get(
        `/api/dairy/all`,
        {},
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response.data.data);
      setDairyList(response.data.data);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };
  useEffect(() => {
    getDairyAll();
  }, []);

  const [level, setLevel] = useState(11);
  const [curLocation, setCurLocation] = useState({ latitude: 0, longitude: 0 });

  // 맵 화면 위치
  const [state, setState] = useState({
    center: { lat: 33.37666, lng: 126.54245 },
    isPanto: true,
  });

  return (
    <Wrapper>
      <Img src={arrow_expand} onClick={() => navigate("/map")} />
      <Map
        center={state.center}
        style={{ width: "430px", height: "235px" }}
        level={level}
        draggable={false}
        zoomable={false}
        disableDoubleClickZoom={true}
      >
        {dairyList.map((loc, idx) => (
          <MapMarker
            key={`${idx}-${loc.location}-${loc.dairyContent}`}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            image={{
              src: "image/KakaoMap/Marker.png",
              size: { width: 15, height: 15 },
            }}
            title={loc.title}
          />
        ))}

        {curLocation && (
          <MapMarker
            position={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          />
        )}
      </Map>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
`;
const Img = styled.img`
  position: absolute;

  top: 200px;
  right: 10px;
  z-index: 99;
`;
export default KakaoSimpleMap;
