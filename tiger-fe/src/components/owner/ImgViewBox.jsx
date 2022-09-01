import React from "react";
import { useState } from "react";
import styled from "styled-components";

const ImgViewBox = ({ files }) => {
  //트러블 슈팅 하나짜리 이후에 여러개 다시 수정하면 버튼이 안눌림
  const [currImg, setCurrImg] = useState(0);
  const [lastImg, setLastImg] = useState(files.length - 1);

  // const [isOne, setIsOne] = useState(false);
  // if (isOne === false) {
  //   setIsOne();
  // }

  const clickPrev = () => {
    setCurrImg((prevCount) => (prevCount - 1 < 0 ? lastImg : prevCount - 1));
  };

  const clickNext = () => {
    setCurrImg((prevCount) => (prevCount + 1 > lastImg ? 0 : prevCount + 1));
  };

  const imgLength = files.length;
  return (
    <StImgViewBox>
      {imgLength === 1 ? (
        <img src={files[0]} alt="img" />
      ) : (
        <div>
          <button onClick={clickPrev}>이전</button>
          <img src={files[currImg]} alt="img" />
          <button onClick={clickNext}>다음</button>
        </div>
      )}
    </StImgViewBox>
  );
};

export default ImgViewBox;
const StImgViewBox = styled.div`
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`;
