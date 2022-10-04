// eslint-disable-next-line

import React, { useEffect } from "react";
import styled from "styled-components";
import OwnerItem from "./OwnerItem";
import { useDispatch, useSelector } from "react-redux";
import { __registeredItemList } from "../../redux/modules/ownerItemListSlice";
import { __reservedItemList } from "../../redux/modules/ownerItemListSlice";
import { __useItemList } from "../../redux/modules/ownerItemListSlice";
import { __returnItemList } from "../../redux/modules/ownerItemListSlice";
import { __cancleItemList } from "../../redux/modules/ownerItemListSlice";
import Profit from "./accounting/Profit";
import { useNavigate } from "react-router-dom";
import Calculate from "./accounting/Calculate";
import OwnerInfo from "./OwnerInfo";
// import ProfitTest from "./accounting/ProfitTest";

const OwnerItemList = ({ category }) => {
  const navigate = useNavigate();

  const OwnerItemLists = useSelector(
    (state) => state.ownerItemListSlice.OwnerItemList
  );
  const dispatch = useDispatch();

  // console.log();
  useEffect(() => {
    if (category === "Registration") {
      dispatch(__registeredItemList());
    } else if (category === "Reservation") {
      dispatch(__reservedItemList());
    } else if (category === "progress") {
      dispatch(__useItemList());
    } else if (category === "return") {
      dispatch(__returnItemList());
    } else if (category === "Refund") {
      dispatch(__cancleItemList());
    }
  }, [dispatch, category]);

  return (
    <StOwnerItemList>
      {OwnerItemLists.output &&
      OwnerItemLists.output.length === 0 &&
      category !== "Profit" &&
      category !== "Calculate" ? (
        <p>등록된 차량이 없습니다.</p>
      ) : (
        OwnerItemLists.output &&
        OwnerItemLists.output.map((list, i) => {
          return (
            <OwnerItem key={i} list={list} category={category} vid={list.vid} />
            //  <OwnerInfo />
          );
        })
      )}
      {category === "Profit" && (
        <div>
          <Profit />
        </div>
      )}
      {/* {category === "Calculate" && (
        <div>
          <Calculate />
        </div>
      )} */}
    </StOwnerItemList>
  );
};

const StOwnerItemList = styled.div`
  width: 57%;
  padding-top: 65px;
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default OwnerItemList;
