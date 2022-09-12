import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RenterItem = ({ list }) => {
  const navigate = useNavigate();

  const renterItemLists = useSelector(
    (state) => state.renterItemListSlice.renterItemLists
  );
  console.log(renterItemLists);

  // const onClick = () => {
  //   console.log("눌림");
  //   navigate(`/owner/${vId}/modi`);
  // };

  return (
    <div>
      <StRenterItemList>
        {renterItemLists.output && renterItemLists.output.length === 0 ? (
          <p>등록된 차량이 없습니다.</p>
        ) : (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem
                onClick={() => {
                  navigate(`/vdetail/${list.vid}`);
                }}
                key={i}>
                <img src={list.thumbnail} alt="차량" />
                <div className="carInfo">
                  <p>{list.vname}</p>
                  <span>
                    {list.startDate} ~ {list.endDate}
                  </span>
                  <p>{list.price}/1일</p>
                  <p>{list.location}</p>
                </div>
                <div className="dateBtn">{list.createdAt}</div>
              </StRenterItem>
            );
          })
        )}
      </StRenterItemList>
    </div>
  );
};

const StRenterItemList = styled.div`
  width: 790px;
  height: 890px;
  margin-top: 65px;
`;

const StRenterItem = styled.div`
  width: 100%;
  height: 134px;
  /* background-color: skyblue; */
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  img {
    width: 250px;
    height: 134px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin-bottom: 11px;
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      margin-bottom: 13px;
    }
  }
  .dateBtn {
    width: 97px;
    height: 20px;
    /* background-color: yellowgreen; */
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default RenterItem;
