import React from "react";
import TextArea from "../components/TextArea";
import axios from "axios";

export default function VariationPage() {
  const patchDairyDetail = async () => {
    try {
      const response = await axios.patch(
        `https://www.sopt-demo.p-e.kr/dairy/4`,
        {
          // body
          dairyContent: "화이팅화이팅화이팅",
        },
        {
          // header
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  const getDairyDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.sopt-demo.p-e.kr/dairy/detail/4`,
        {
          // body
        },
        {
          // header
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  return (
    <div>
      <button>뒤로 가기</button>
      <div>
        <div>성산</div>
        <div>2023.10.11</div>
      </div>
      <div>성산 일출봉</div>
      <div>제주 서귀포시 성산읍 성산리 78</div>
      <div>
        <div>키워드</div>
        <div>#추위</div>
      </div>
      <div>내용</div>
      <TextArea />
      <div>
        <button>새로고침</button>
        <button>등록하기</button>
        <button onClick={() => patchDairyDetail()}>다이어리 수정 API</button>
        <button onClick={() => getDairyDetail()}>다이어리 조회 API</button>
      </div>
    </div>
  );
}
