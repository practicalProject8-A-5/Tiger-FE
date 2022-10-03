// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TestCalender from "./TestCalender";

const PaymentInfo = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [isOpenPayInfo, setIsOpenPayInfo] = useState(true);
  const [isShow, setIsShow] = useState(false);

  const openHandler = () => {
    // console.log("눌림");
    setIsShow(!isShow);
    // setIsOpenPayInfo(!isOpenPayInfo);
  };
  // console.log("IsShow :", isShow);
  // console.log(isOpenPayInfo);

  // useEffect(setIsOpenPayInfo(), [isOpenPayInfo]);
  return (
    <>
      {!isOpenPayInfo ? (
        <StPaymentInfo>
          <h1>결제 정보</h1>
          <div className="pay__month">2021년 9월</div>
          <div className="pay__calenderBox">
            <p>렌트 가능 날짜가 선택되었습니다.</p>
            <div className="calender" onClick={openHandler}></div>
          </div>

          <div className="price_box">
            <div className="renter_price">
              <label htmlFor="price">렌트 요금</label>
              <div className="flex_wrap">
                <input
                  type="text"
                  id="price"
                  placeholder="가격을 입력해주세요."
                  // placeholder={errors.price.message}
                  className="error_input"
                  {...register("price", {
                    required: "가격 입력은 필수 입니다.",
                  })}
                />
                {errors.price ? (
                  <div className="error">{errors.price.message}</div>
                ) : null}
                <span>₩/24시간</span>
              </div>
            </div>

            <div className="total_price">
              <p>총 렌트 금액</p>
              <span>12345₩</span>
            </div>
          </div>

          <button>등록하기</button>
        </StPaymentInfo>
      ) : (
        <StPaymentInfo>
          <h1>결제 정보</h1>
          <div className="pay__month">2021년 9월</div>
          <div className="pay__calenderBox">
            <p>렌트 가능 날짜를 선택해주세요.</p>
            <div className="calender" onClick={openHandler}></div>
          </div>
          <div className="price_box">
            <div className="renter_price">
              <label htmlFor="price">렌트 요금</label>
              <div className="flex_wrap">
                <input
                  type="text"
                  id="price"
                  placeholder="가격을 입력해주세요."
                  // placeholder={errors.price.message}
                  className="error_input"
                  {...register("price", {
                    required: "가격 입력은 필수 입니다.",
                  })}
                />
                {errors.price ? (
                  <div className="error">{errors.price.message}</div>
                ) : null}
                <span>₩/24시간</span>
              </div>
            </div>

            <div className="total_price">
              <p>총 렌트 금액</p>
              <span>12345₩</span>
            </div>
          </div>
          <button>등록하기</button>
          {/* isOpenPayInfo, setIsOpenPayInfo */}
          {isShow ? (
            <TestCalender
              isOpenPayInfo={isOpenPayInfo}
              setIsOpenPayInfo={setIsOpenPayInfo}
              isShow={isShow}
              setIsShow={setIsShow}
            />
          ) : null}
        </StPaymentInfo>
      )}

      {/* after */}
    </>
  );
};

export default PaymentInfo;

const StPaymentInfo = styled.div`
  width: 520px;
  height: 550px;
  box-shadow: 0px -2px 80px rgba(0, 0, 0, 0.04),
    0px -0.6px 30px rgba(0, 0, 0, 0.04),
    0px -0.375647px 17.7806px rgba(0, 0, 0, 0.04),
    0px -0.1px 6.4309px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  padding: 60px 60px 40px 60px;
  /* background-color: skyblue; */
  box-sizing: border-box;
  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #8b8b8b;
    margin-bottom: 32px;
  }
  .pay__month {
    width: 100%;
    height: 38px;
    /* background-color: yellow; */
    font-weight: 500;
    font-size: 18px;
    color: #000;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 24px;
  }
  .pay__calenderBox {
    width: 100%;
    height: 47px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    p {
      font-weight: 600;
      font-size: 16px;
      color: #cccccc;
    }
    .calender {
      width: 18px;
      height: 20px;
      background-color: pink;
    }
  }
  .price_box {
    margin-top: 78px;
    margin-bottom: 53px;
    /* background-color: pink; */
    /* display: flex;
    align-items: center; */
    .renter_price {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      /* border-bottom: 1px solid; */

      label {
        font-weight: 500;
        font-size: 18px;
        height: 100%;
        /* background-color: skyblue; */
        line-height: 40px;
      }
      .flex_wrap {
        input {
          width: 160px;
          height: 38px;
          border: 1px solid #8b8b8b;
          border-radius: 12px;
          outline: none;
          background-color: #fff;
          padding: 0 13px;
          box-sizing: border-box;
          margin-right: 7px;
        }
        span {
          font-weight: 500;
          font-size: 16px;
          color: #000;
        }
      }
    }
    .total_price {
      display: flex;
      justify-content: space-between;
      p {
        font-weight: 500;
        font-size: 18px;
        color: #000;
      }
      span {
        font-weight: 700;
        font-size: 16px;
        color: #ff881b;
      }
    }
  }
  button {
    width: 380px;
    height: 60px;
    background-color: #ff881b;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 22px;
  }
`;
