import React from "react";
import TextArea from "../components/TextArea";

export default function VariationPage() {
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
      </div>
    </div>
  );
}
