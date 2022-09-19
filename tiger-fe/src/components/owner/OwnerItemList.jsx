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

const OwnerItemList = ({ category }) => {
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
      {OwnerItemLists.output && OwnerItemLists.output.length === 0 ? (
        <p>등록된 차량이 없습니다.</p>
      ) : (
        OwnerItemLists.output &&
        OwnerItemLists.output.map((list, i) => {
          return (
            <OwnerItem key={i} list={list} category={category} vid={list.vid} />
          );
        })
      )}
    </StOwnerItemList>
  );
};

const StOwnerItemList = styled.div`
  width: 790px;
  padding-top: 65px;
`;

export default OwnerItemList;
