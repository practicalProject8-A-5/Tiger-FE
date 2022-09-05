// import axios from "axios";
import React, { useState } from "react";
// import { useState } from "react";
import { useEffect } from "react";
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

  // const [loading, setLoading] = useState(false);
  console.log("List category:", category);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(__registeredItemList());
    if (category === "Registration") {
      // setLoading(true);
      dispatch(__registeredItemList());
      // setLoading(false);
    } else if (category === "Reservation") {
      // setLoading(true);
      dispatch(__reservedItemList());
      // setLoading(false);
    } else if (category === "progress") {
      // setLoading(true);
      dispatch(__useItemList());
      // setLoading(false);
    } else if (category === "return") {
      // setLoading(true);
      dispatch(__returnItemList());
      // setLoading(false);
    } else if (category === "Refund") {
      // setLoading(true);
      dispatch(__cancleItemList());
      // setLoading(false);
    }
  }, [dispatch, category]);

  console.log(OwnerItemLists);
  // console.log(OwnerItemLists.output);
  // if (loading) {
  //   // console.log(loading);
  //   return <StOwnerItemList>대기중...</StOwnerItemList>;
  // }
  return (
    <StOwnerItemList>
      {OwnerItemLists.output && OwnerItemLists.output.length === 0 ? (
        <p>등록된 차량이 없습니다.</p>
      ) : (
        OwnerItemLists.output &&
        OwnerItemLists.output.map((list, i) => {
          return <OwnerItem key={i} list={list} />;
        })
      )}
    </StOwnerItemList>
  );
};

export default OwnerItemList;
const StOwnerItemList = styled.div`
  width: 790px;
  height: 890px;
  margin-top: 65px;
`;

// const Loading = styled.div``;
