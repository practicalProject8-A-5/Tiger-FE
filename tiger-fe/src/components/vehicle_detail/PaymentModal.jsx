// eslint-disable-next-line

import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/ta,iger_logo.png";
import axios from "axios";

const PaymentModal = ({ showPaymentModal, vehicleDetails, vehicleDates }) => {
  const serverApi = process.env.REACT_APP_SERVER;

  console.log(vehicleDetails);

  const vehicleImage = vehicleDetails.imageList[0];
  const totalCost = vehicleDetails.price + 500 + 500;

  const [payMethod, setPayMethod] = useState();
  console.log(payMethod);

  const confirmPayment = async () => {
    const confirm = window.confirm("결제하시겠습니까?");

    if (confirm === true && payMethod === undefined) {
      alert("결제방식을 선택해주세요");
    } else if (confirm === false) {
      return null;
    } else if (confirm === true && payMethod !== undefined) {
      const vid = vehicleDetails.vid;
      const paidAmount = vehicleDetails.price;
      const startDate = vehicleDates.startDate;
      const endDate = vehicleDates.endDate;

      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      await axios
        .post(
          serverApi + `/order/${vid}`,
          {
            // id: "01010101",
            paidAmount,
            startDate,
            endDate,
            payMethod,
            // impUid: "0000",
          },
          { headers: headers }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <StPaymentModal>
      <StPaymentInfo>
        <div className="wrap">
          <AiOutlineClose className="icon" onClick={showPaymentModal} />
          <div className="login__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="vehicle__desc">
            <div className="lineL"></div>
            <div className="text">차량정보</div>
            <div className="lineR"></div>
          </div>
          <div className="vehicleWrap">
            <div className="vehicleImage">
              <img src={vehicleImage} alt="vehicleImage" />
            </div>
            <div className="vehicleInfo">
              <div>
                <div className="vehicleAddress">{vehicleDetails.location}</div>
                <div className="vehicleFullName">
                  {vehicleDetails.vbrand} {vehicleDetails.vname}
                </div>
              </div>
              <div className="vehicleRentPeriod">
                {vehicleDates.startDate} ~ {vehicleDates.endDate}
              </div>
            </div>
          </div>
          <div className="vehicle__payment">
            <div className="lineL"></div>
            <div className="text">결제정보</div>
            <div className="lineR"></div>
          </div>
          {/* <div className="vehiclePaymentInfo">
            <div className="title">요금 세부정보</div>
          </div> */}
          <div className="vehiclePrice">
            <div className="priceInfo">대여요금</div>
            <div className="price">₩ {vehicleDetails.price}</div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">보험료</div>
            <div className="price">₩ 500</div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">수수료</div>
            <div className="price">₩ 500</div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">총액</div>
            <div className="price">₩ {totalCost}</div>
          </div>
          <form className="vehiclePayMethod">
            <select
              required
              value={payMethod}
              defaultValue="default"
              name="payMethod"
              id="payMethod"
              onChange={(e) => {
                setPayMethod(e.target.value);
              }}>
              <option value="default" disabled>
                결제방식
              </option>
              <option value="CARD">CARD</option>
              <option value="CASH">CASH</option>
            </select>
            <button type="submit" onClick={confirmPayment}>
              결제하기
            </button>
          </form>
        </div>
      </StPaymentInfo>
    </StPaymentModal>
  );
};

const StPaymentModal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 519px;
  height: 549px;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
`;

const StPaymentInfo = styled.div`
  z-index: 100;
  .wrap {
    width: 100%;
    height: 549px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      font-size: 22px;
      position: absolute;
      top: 18px;
      left: 30px;
      cursor: pointer;
    }
    .login__logo {
      width: 100%;
      height: 40px;
      /* background-color: pink; */
      text-align: center;
      margin: 25px 0 25px 0;
      img {
        width: 121px;
        height: 100%;
        object-fit: cover;
      }
    }
    .vehicleWrap {
      display: flex;
      flex-direction: row;
      .vehicleImage {
        display: inline-block;
        vertical-align: bottom;
        height: 100%;
        min-height: 1px;
        img {
          width: 250px;
          height: 134px;
          object-fit: cover;
          border-radius: 12px;
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
          font-size: 12px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          color: rgb(113, 113, 113);
        }
        .vehicleFullName {
          font-size: 18px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-word;
          margin-top: 4px;
        }
        .vehicleRentPeriod {
          box-sizing: border-box;
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-word;
          margin-top: 4px;
        }
      }
    }
    .vehicle__desc {
      width: 100%;
      height: 22px;
      text-align: center;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lineL {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
        color: #8b8b8b;
        margin: 0 14px;
      }
      .lineR {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
    }
    .vehicle__payment {
      margin-top: 20px;
      width: 100%;
      height: 22px;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lineL {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
        color: #8b8b8b;
        margin: 0 14px;
      }
      .lineR {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
    }
    .vehiclePaymentInfo {
      box-sizing: border-box;
      width: 100%;
      .title {
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
      }
    }
    .vehiclePrice {
      -webkit-box-align: center !important;
      -webkit-box-pack: justify !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      width: 100%;
      margin-top: 10px;
      .priceInfo {
        font-size: 16px !important;
        line-height: 20px !important;
        color: rgb(34, 34, 34) !important;
        display: inline !important;
      }
      .price {
        white-space: nowrap !important;
        font-size: 16px !important;
        line-height: 20px !important;
        color: rgb(34, 34, 34) !important;
      }
    }
    .vehiclePayMethod {
      margin-top: 10px;
      width: 100%;
      float: right;
      text-align: right;
    }
    button {
      width: 100%;
      height: 56px;
      background: #ff881b;
      color: #ffffff;
      font-weight: 600;
      font-size: 18px;
      border: none;
      cursor: pointer;
      margin-bottom: 20px;
      padding: 0;
      margin-top: 15px;
    }
  }
`;

export default PaymentModal;
