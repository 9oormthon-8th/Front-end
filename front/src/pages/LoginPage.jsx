import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import mainLogo from "../assets/mainLogo.svg";
import titleLogo from "../assets/titleLogo.svg";
import kakaoTalkLogo from "../assets/icons/kakaoTalkLogo.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Top>
        <Img src={titleLogo} />
        <div>AI기반 제주도 여행기록서비스</div>
      </Top>
      <Img1 src={mainLogo} />
      <Bottom>
        <Btn onClick={() => navigate("/main")}>
          <Img2 src={kakaoTalkLogo} />
          카카오톡에서 로그인
        </Btn>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;

  position: relative;
`;
const Top = styled.div`
  height: 60%;
  background: #ffebb6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    color: #b9b9b9;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 187.5% */
    margin-top: 1px;
  }
`;
const Img = styled.img``;
const Img1 = styled.img`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Img2 = styled.img``;
const Bottom = styled.div`
  height: 40%;
  background: #ddecff;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.button`
  width: 390px;
  height: 54px;
  background-color: #ffe90a;
  border: none;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 200% */

  gap: 14px;
`;
