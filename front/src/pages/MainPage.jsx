import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>MAP</div>
      <div>FOLDER</div>
      <button onClick={() => navigate("/map")}>MapPage</button>
      <button onClick={() => navigate("/main/detail")}>MainDetialPage</button>
    </div>
  );
};

// export const postNewChallenge = async () => {
//   try {
//     const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/new`, {
//       title: "챌린지 제목",
//       period: "20221113",
//       price: "1233312",
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("An error occurred while fetching data: ", error);
//   }
// };

export default MainPage;
