// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  __postVehicleComments,
  __getReviewedComment,
  __deleteComment,
  reviewedOptions,
} from "../../redux/modules/vehicleDetailSlice";

import { AiOutlineClose } from "react-icons/ai";
import { ImStarFull } from "react-icons/im";

const CommentModal = ({ showCommentModal, singleVehicle }) => {
  // console.log(singleVehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vid = parseInt(singleVehicle.vid);
  // console.log("vid", vid);

  // get reviewed comment
  const reviewedComment = useSelector(
    (state) => state.vehicleDetailSlice.reviewedComment
  );
  // console.log("reviewedComment :", reviewedComment);

  const [rating, setRating] = useState(reviewedComment?.rating);
  const [hover, setHover] = useState(reviewedComment?.rating);

  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(reviewedComment?.comment);

  const onChangeHandler = (e) => {
    setCount(e.target.value.length);
    setComment(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (comment !== "" && rating !== 0) {
      dispatch(__postVehicleComments({ comment, rating, vid }));
      setComment("");
      setRating(0);
      setHover(0);
      navigate(`/vehicle/${vid}`);
    }
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    dispatch(__deleteComment(vid));
    setComment("");
    setRating(0);
    showCommentModal();
  };

  useEffect(() => {
    dispatch(__getReviewedComment(vid));
    return () => {
      dispatch(reviewedOptions());
    };
  }, [dispatch, vid]);

  useEffect(() => {
    if (reviewedComment?.comment !== undefined) {
      setCount(reviewedComment?.comment.length);
      setRating(reviewedComment?.rating);
      setHover(reviewedComment?.rating);
      setComment(reviewedComment?.comment);
    }
  }, [reviewedComment]);

  return (
    <StCommentModal>
      <div className="commentModal_title">리뷰 쓰기</div>
      <AiOutlineClose className="icon" onClick={showCommentModal} />
      <div className="vehicle__desc">
        <div className="lineL"></div>
        <div className="text">렌트차량</div>
        <div className="lineR"></div>
      </div>
      <StCommentVehicleInfo>
        <div className="vehicleImage">
          <img src={singleVehicle.thumbnail} alt="vehicleImage" />
        </div>
        <div className="vehicleInfo">
          <div>
            <div className="vehicleAddress">{singleVehicle.location}</div>
            <div className="vehicleFullName">
              {singleVehicle.vbrand} {singleVehicle.vname}
            </div>
          </div>
          <div className="vehicleRentPeriod">
            {singleVehicle.startDate} ~ {singleVehicle.endDate}
          </div>
        </div>
      </StCommentVehicleInfo>
      <div className="vehicle__desc">
        <div className="lineL"></div>
        <div className="text">별점 및 리뷰</div>
        <div className="lineR"></div>
      </div>
      <StCommentTextContainer>
        <StCommentRating>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= ((rating && hover) || hover) ? "on" : "off"}
                onClick={() => {
                  setRating(index);
                  setHover(index);
                }}>
                <span className="star">
                  <ImStarFull size={31} />
                </span>
              </button>
            );
          })}
          <div className="ratingNum">{rating}/5점</div>
        </StCommentRating>
        <form>
          <StCommentTextArea
            type="text"
            id="commentTextarea"
            maxLength={50}
            value={comment}
            placeholder="등록 혹은 수정하세요"
            onChange={onChangeHandler}></StCommentTextArea>
          <div className="textCount">{count}/50자</div>
          <div className="buttonContainer">
            <button className="reviewButton" onClick={onSubmitHandler}>
              리뷰 등록하기
            </button>
            <button className="reviewButton" onClick={onDeleteHandler}>
              리뷰삭제
            </button>
          </div>
        </form>
      </StCommentTextContainer>
    </StCommentModal>
  );
};

const StCommentModal = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 688px;
  /* height: 800px; */
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  padding: 40px;
  box-sizing: border-box;
  .commentModal_title {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    margin-bottom: 47px;
  }
  .icon {
    font-size: 22px;
    position: absolute;
    top: 48px;
    right: 30px;
    cursor: pointer;
  }
  .vehicle__desc {
    width: 100%;
    height: 22px;
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .lineL {
      width: 260px;
      height: 1px;
      background-color: #8b8b8b;
    }
    .text {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
    }
    .lineR {
      width: 240px;
      height: 1px;
      background-color: #8b8b8b;
    }
  }
`;

const StCommentVehicleInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  .vehicleImage {
    height: 100%;
    min-height: 1px;
    img {
      width: 240px;
      height: 160px;
      object-fit: cover;
      border-radius: 20px;
      margin-right: 24px;
    }
  }
  .vehicleInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 12px;
    box-sizing: border-box;
    box-sizing: border-box;
    .vehicleAddress {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(113, 113, 113);
    }
    .vehicleFullName {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-word;
      margin-top: 4px;
    }
    .vehicleRentPeriod {
      box-sizing: border-box;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-word;
      margin-top: 4px;
    }
  }
`;

const StCommentRating = styled.div`
  margin-bottom: 29px;
  display: flex;
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    height: 34px;
  }
  .ratingNum {
    margin-left: 20px;
    line-height: 34px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #cccccc;
  }
  .on {
    color: #ff881b;
  }
  .off {
    color: #ccc;
  }
`;

const StCommentTextContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 335px;
  form {
    display: flex;
    flex-direction: column;
    .textCount {
      position: absolute;
      right: 10px;
      bottom: 90px;
    }
    .buttonContainer {
      display: flex;
      justify-content: center;
      .reviewButton {
        background: #ff881b;
        border-radius: 12px;
        width: 200px;
        height: 56px;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
        color: white;
        margin: 30px auto;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

const StCommentTextArea = styled.textarea`
  height: 171px;
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 12px;
  padding: 10px;
  resize: none;
`;

export default CommentModal;
