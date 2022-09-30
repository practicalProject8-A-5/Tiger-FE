// eslint-disable-next-line

import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/ta,iger_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentModal = ({ showPaymentModal, vehicleDetails }) => {
  const navigate = useNavigate();
  const serverApi = process.env.REACT_APP_SERVER;
  // console.log(vehicleDetails);
  const vehicleImage = vehicleDetails.imageList[0];

  const startDate = vehicleDetails.startDate;
  const endDate = vehicleDetails.endDate;

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const totalDays =
    (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1;
  const paidAmount = totalDays * vehicleDetails.price;

  const [payMethod, setPayMethod] = useState();
  // console.log(payMethod);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(errorMessage);

  const confirmPayment = async (e) => {
    console.log(payMethod);
    const confirm = window.confirm("결제하시겠습니까?");
    console.log("222");
    // e.preventDefault();
    console.log("111");
    if (confirm === true && payMethod === undefined) {
      console.log(confirm);
      toast.warn("결제방식을 선택해주세요.", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
        className: "toatst_warn",
        // bodyClassName: "",
        progressClassName: "warn_progress",
      });
    } else if (confirm === false) {
      console.log("null");
      return null;
    } else if (confirm === true && payMethod !== undefined) {
      const vid = vehicleDetails.vid;
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      try {
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
          .then(() => {
            // console.log(resp);
            // navigate("/renter");
          });
      } catch (error) {
        setErrorMessage(error.response.data.code);
        navigate(-1);
      }
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
              {vehicleDetails.startDate === null &&
              vehicleDetails.endDate === null ? (
                <div className="vehicleRentPeriod"></div>
              ) : (
                <div className="vehicleRentPeriod">
                  {vehicleDetails.startDate} ~ {vehicleDetails.endDate}
                </div>
              )}
            </div>
          </div>
          <div className="vehicle__payment">
            <div className="lineL"></div>
            <div className="text">결제정보</div>
            <div className="lineR"></div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">대여요금</div>
            <div className="price">
              ₩ {vehicleDetails.price}/{totalDays}일{" "}
            </div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">보험료</div>
            <div className="price">무료</div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">수수료</div>
            <div className="price">무료</div>
          </div>
          <div className="vehiclePrice">
            <div className="priceInfo">총액</div>
            <div className="price">₩ {paidAmount}</div>
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
              }}
            >
              <option value="default" disabled>
                결제방식
              </option>
              <option value="CARD">CARD</option>
              <option value="CASH">CASH</option>
            </select>
            {vehicleDetails.startDate === null &&
            vehicleDetails.endDate === null ? (
              <div className="noneSearched">검색후 이용해주세요</div>
            ) : (
              <button type="submit" onClick={confirmPayment}>
                결제하기
              </button>
            )}
            {errorMessage === "DUPLICATE_ORDERDATE"
              ? toast.info("이미 예약을 한 차량입니다.", {
                  theme: "dark",
                  autoClose: 1500,
                  position: toast.POSITION.TOP_CENTER,
                  className: "toatst_info",
                  progressClassName: "info_progress",
                })
              : null}
          </form>
          <StyledContainer />
        </div>
      </StPaymentInfo>
    </StPaymentModal>
  );
};

const StPaymentModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
    .noneSearched {
      width: 100%;
      height: 56px;
      background: #ff881b;
      color: #ffffff;
      font-weight: 600;
      font-size: 19px;
      border: none;
      margin-bottom: 20px;
      padding: 0;
      margin-top: 15px;
      text-align: center;
      line-height: 56px;
      border-radius: 10px;
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
const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    position: relative;
  }
  .Toastify__toast-body {
    height: 100px;
    .Toastify__toast-icon > svg {
      fill: #fff;
    }
  }
  .Toastify__progress-bar {
  }
  .Toastify__close-button {
    border-radius: 12px !important;
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px !important;
    height: 25px !important;
    margin: 0;
    background-color: transparent !important;
  }
`;

export default PaymentModal;
