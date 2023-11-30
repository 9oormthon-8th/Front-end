import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LongCard from "../components/LongCard";
import arrow_back from "../assets/icons/arrow_back.svg";
import KakaoSimpleMap from "../components/KakaoSimpleMap";

export default function MainDetailPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <img src={arrow_back} onClick={() => window.history.go(-1)} />
      </Header>
      <KakaoSimpleMap onClick={() => navigate("/map")} />
      <ContentLayer>
        <Head1>
          <Info>
            <Box></Box>
            <Info1>
              <div>구름톤</div>
              <div>2000.00.00 ~ 00,00</div>
            </Info1>
          </Info>
          <button onClick={() => navigate("/writing")}>+ 글쓰기</button>
        </Head1>
        <Content1>8개의 기록</Content1>
        <Content2>
          <LongCard />
          <LongCard />
          <LongCard />
          <LongCard />
          <LongCard />
        </Content2>
      </ContentLayer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;

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

const Box = styled.div`
  width: 44px;
  height: 44px;

  background: #d9d9d9;
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
