import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import picture from "../assets/picture.svg";
import SquareCard from "../components/SquareCard";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Picture src={picture}></Picture>
      <Title>
        제주에서
        <br /> 12개의 기록
      </Title>
      <ContentLayer>
        <Secetion1>
          <Folder>4개의 폴더</Folder>
          <FolderBtn onClick={() => navigate("/detail")}>+ 폴더</FolderBtn>
        </Secetion1>
        <Secetion2>
          <SquareCard />
          <SquareCard />
          <SquareCard />
          <SquareCard />
          <SquareCard />
        </Secetion2>
      </ContentLayer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  background: #f5f5f5;
`;
const Picture = styled.img`
  height: 30%;
  width: 100%;
  object-fit: cover;
`;
const Title = styled.div`
  position: absolute;
  top: 46px;
  left: 26px;

  color: #fff;
  font-family: Pretendard;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 117.647% */
`;

const ContentLayer = styled.div`
  background: #f5f5f5;
  margin: 0 auto;
  height: 68%;
  width: 95%;
`;

const Secetion1 = styled.div`
  padding-top: 26px;
  padding-bottom: 14px;

  display: flex;
  justify-content: space-between;
`;
const Folder = styled.div`
  color: #b9b9b9;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 187.5% */
`;
const FolderBtn = styled.button`
  width: 57px;
  height: 24px;
  border-radius: 30px;
  background: #00d67c;
  border: none;

  color: #fff;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Secetion2 = styled.div`
  display: flex;
  flex-wrap: wrap; /* 자식 요소들을 여러 행으로 나눔 */
  justify-content: space-between;
  /* height: 90%; 최대 높이 설정 (원하는 값으로 조절) */
  height: 90%;
  overflow-y: scroll;
`;
export default MainPage;
