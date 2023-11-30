import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LongCard from "../components/LongCard";
import cardImage2 from "../assets/cardImage2.svg";
import ArrowBack from "../components/ArrowBack";
import KakaoSimpleMap from "../components/KakaoSimpleMap";
import axios from "axios";
import Arrow from "../assets/icons/arrow_back2.svg";

export default function MainDetailPage() {
  const navigate = useNavigate();
  const [dairyList, setDairyList] = useState([]);

  // 다이어리 목록 불러오기
  const getDairyAll = async () => {
    try {
      const response = await axios.get(
        `https://www.sopt-demo.p-e.kr/dairy/all`,
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

  // 최초 위치 갱신
  const [curLocation, setCurLocation] = useState({ latitude: 0, longitude: 0 });
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
        }
      );
    }
  }, []);

  return (
    <Wrapper>
      <Img2 src={Arrow} />
      <KakaoSimpleMap onClick={() => navigate("/map")} />
      <ContentLayer>
        <Head1>
          <Info>
            <Box src={cardImage2}></Box>
            <Info1>
              <div>구름톤</div>
              <div>2023.11.20 ~ 11.30</div>
            </Info1>
          </Info>
          <button
            onClick={() =>
              navigate("/writing", { state: { address, curLocation } })
            }
          >
            + 글쓰기
          </button>
        </Head1>
        <Content1>8개의 기록</Content1>
        <Content2>
          {dairyList.map((item, idx) => (
            <LongCard item={item} />
          ))}
        </Content2>
      </ContentLayer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  background: #f5f5f5;
`;

const Header = styled.div`
  height: 5%;

  background: #ffffff;
`;
const MAP = styled.div`
  height: 20%;
  background-color: pink;
`;
const ContentLayer = styled.div`
  margin: 0 auto;
  height: 60%;
  width: 95%;
`;
const Head1 = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 26px;
  margin-bottom: 36px;

  button {
    border-radius: 30px;
    background: #00c472;
    width: 110px;
    height: 44px;
    flex-shrink: 0;

    color: #fff;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    border: none;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 10px;
`;

const Box = styled.img`
  width: 44px;
  height: 44px;
`;
const Info1 = styled.div`
  display: flex;
  flex-direction: column;

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

const Content1 = styled.div`
  margin-bottom: 9px;

  color: #b9b9b9;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 187.5% */
`;
const Content2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 80%;
  min-height: 80%;
  overflow-y: scroll;
`;

const Img = styled.img`
  width: 142px;
  height: 98px;
  margin-top: 20px;
`;

const Img2 = styled.img`
  position: absolute;
  z-index: 10;
`;
