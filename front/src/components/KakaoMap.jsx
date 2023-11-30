import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../hooks/useKakaoLoader";
import { useGeoLocation } from "../hooks/useGeoLocation";
import ArrowBack from "../components/ArrowBack";
import axios from "axios";
import { styled, css } from "styled-components";
import search from "../assets/search.svg";
import profile from "../assets/img1.svg";
import LongCard from "./LongCard";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

const KakaoMap = () => {
  const [dairyList, setDairyList] = useState([]);

  // 다이어리 목록 불러오기
  const getDairyAll = async () => {
    try {
      const response = await axios.get(
        `https://kea3f874ea848a.user-app.krampoline.com/api/dairy/all`,
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
    console.log(marker);
    setSelectedMarker(marker);
    setState({ center: { lat: marker.latitude, lng: marker.longitude } });
    setLevel(8);
    setMarkerOpen(true);
    setOnBar(true);
  };
  // 현주소
  const [address, setAddress] = useState();

  // 도로명 주소 불러오기
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(
      curLocation.latitude,
      curLocation.longitude
    );
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

  const [onBar, setOnBar] = useState(false);
  const clickBar = () => setOnBar((prev) => !prev);

  return (
    <Wrapper>
      {/* <ArrowBack title="" /> */}
      <Map
        id="map"
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "835px" }}
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
        {dairyList.map((loc, idx) => (
          <MapMarker
            key={`${idx}-${loc.location}-${loc.dairyContent}`}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            image={{
              src:
                selectedMarker && loc.location === selectedMarker.location
                  ? "image/KakaoMap/SelectedMarker.png"
                  : "image/KakaoMap/Marker.png",
              size:
                selectedMarker && loc.location === selectedMarker.location
                  ? { width: 30, height: 30 }
                  : { width: 15, height: 15 },
            }}
            title={loc.location}
            onClick={() => handleMarkerClick(loc)}
          />
        ))}

        {/* 내 위치 */}
        {curLocation && (
          <MapMarker
            position={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          />
        )}
      </Map>

      <Content $isActive={onBar}>
        <Top>
          <img
            src={search}
            onClick={() => (
              setState({
                center: {
                  lat: curLocation.latitude,
                  lng: curLocation.longitude,
                },
                isPanto: true,
              }),
              setLevel(9)
            )}
          />
          {!onBar && (
            <Btn
              onClick={() =>
                navigate("/writing", { state: { address, curLocation } })
              }
            >
              + 글쓰기
            </Btn>
          )}
        </Top>
        <Bar onClick={clickBar} $isActive={onBar}>
          <Line></Line>
          {onBar && (
            <>
              <Info>
                <Box1>
                  <img src={profile} />
                  <Box2>
                    <div>구름톤</div>
                    <div>2023.11.20 ~ 11.30</div>
                  </Box2>
                </Box1>
                <button
                  onClick={() =>
                    navigate("/writing", { state: { address, curLocation } })
                  }
                >
                  + 글쓰기
                </button>
              </Info>
              <Card>
                {dairyList.map((item, idx) => (
                  <LongCard item={item} />
                ))}
              </Card>
            </>
          )}
        </Bar>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const Content = styled.div`
  position: absolute;

  width: 100%;
  height: 120px;

  bottom: 0px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: height 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    css`
      height: 520px;
    `}
`;
const Top = styled.div`
  width: 85%;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;
`;
const Btn = styled.button`
  width: 110px;
  height: 44px;
  border-radius: 30px;
  background: #00d67c;

  color: #fff;

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border: none;
`;
const Bar = styled.div`
  border-radius: 16px 16px 0px 0px;

  height: 62px;

  background: #ffffff;

  transition: height 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    css`
      height: 460px;
    `}
`;
const Line = styled.div`
  background: #d9d9d9;
  width: 46px;
  height: 2px;

  margin: 0 auto;

  margin-top: 15px;
  margin-bottom: 32px;
`;
const Info = styled.div`
  width: 90%;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;

  button {
    width: 110px;
    height: 44px;

    border-radius: 30px;
    background: #00d67c;

    border: none;

    color: #fff;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const Box1 = styled.div`
  display: flex;

  gap: 7px;
`;

const Box2 = styled.div`
  div:nth-child(1) {
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  div:nth-child(2) {
    color: #b5b5b5;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 70%;
  overflow-y: scroll;

  margin-top: 15px;
`;
export default KakaoMap;
