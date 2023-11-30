import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MAP>
        <div>카카오맵 컴포넌트 자리</div>
      </MAP>
      <ContentLayer>
        <Secetion1>
          <div>4개의 폴더</div>
          <div>+폴더</div>
        </Secetion1>
        <Secetion2>
          <Item>
            <button onClick={() => navigate("/detail")}>MainDetailPage</button>
          </Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </Secetion2>
      </ContentLayer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;
const MAP = styled.div`
  height: 30%;
  background-color: red;
`;
const ContentLayer = styled.div`
  background-color: blue;
  margin: 0 auto;
  height: 70%;
  width: 95%;
`;

const Secetion1 = styled.div`
  padding-top: 26px;
  padding-bottom: 14px;
  background-color: pink;

  display: flex;
  justify-content: space-between;
`;
const Secetion2 = styled.div`
  display: flex;
  flex-wrap: wrap; /* 자식 요소들을 여러 행으로 나눔 */
  justify-content: space-between;
  height: 90%; /* 최대 높이 설정 (원하는 값으로 조절) */
  overflow: auto; /* 스크롤을 허용하는 설정 */
`;
const Item = styled.div`
  /* 각 그리드 아이템에 스타일을 추가할 수 있습니다. */
  background-color: white;
  width: 48%;
  height: 190px;

  margin-bottom: 10px; /* 세로 간격 조절 */

  border: 1px solid red;
`;
export default MainPage;
