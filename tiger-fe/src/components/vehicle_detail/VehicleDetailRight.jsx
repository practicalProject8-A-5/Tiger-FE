// eslint-disable-next-line

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../../global_elements/Button";
import PaymentModal from "./PaymentModal";
import styled from "styled-components";
// import win from "global";

const VehicleDetailRight = () => {
  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetails
  );
  const userInfo = useSelector((state) => state.memberSlice.userInfo);

  const startDate = vehicleDetails.startDate;
  const endDate = vehicleDetails.endDate;

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const totalDays =
    (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1;
  const paidAmount = totalDays * vehicleDetails.price;

  const [paymentModalOpen, setPaymentModalOpen] = useState();
  const showPaymentModal = () => {
    setPaymentModalOpen(!paymentModalOpen);
  };

  return (
    <div className="box">
      <StPaymentBox>
        <h1>결제 정보</h1>
        <StPaymentPeriod>
          <div className="paymentTime">대여시간</div>
          {vehicleDetails.startDate === null &&
          vehicleDetails.endDate === null ? (
            <div className="paymentDates">
              <div>검색후 이용해주세요</div>
            </div>
          ) : (
            <div className="paymentDates">
              {vehicleDetails.startDate} ~ {vehicleDetails.endDate}
            </div>
          )}
        </StPaymentPeriod>
        <StPaymentPriceInfo>
          <div className="rentCost">대여요금</div>
          <div className="rentPrice">
            ₩ {vehicleDetails.price}/{totalDays}일
          </div>
        </StPaymentPriceInfo>
        <StPaymentTax>
          <div className="paymentTax">기타 수수료</div>
          <div className="paymentTaxInfo">무료</div>
        </StPaymentTax>
        <StPaymentInsurance>
          <div className="paymentInsurance">보험료</div>
          <div className="paymentInsuranceCost">무료</div>
        </StPaymentInsurance>
        <StPaymentTotal>
          <div className="paymentTotal">총 예약 금액</div>
          <div className="paymentTotalCost">₩ {paidAmount}</div>
        </StPaymentTotal>
        {userInfo.email === vehicleDetails.email ? (
          <StNeedLogin>본인 차량입니다</StNeedLogin>
        ) : !userInfo.name ? (
          <StNeedLogin>로그인후 이용해주세요</StNeedLogin>
        ) : (
          <StPaymentButton onClick={showPaymentModal}>예약하기</StPaymentButton>
        )}
        {paymentModalOpen && (
          <PaymentModal
            showPaymentModal={showPaymentModal}
            vehicleDetails={vehicleDetails}
          />
        )}
      </StPaymentBox>
    </div>
  );
};

const StPaymentBox = styled.div`
  width: 519px;
  height: 549px;
  border: 1px solid #cccccc;
  background-color: #fff;
  padding: 56px 60px 31px 60px;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0px -3px 100px rgba(0, 0, 0, 0.07),
    0px -0.904412px 42.8088px rgba(0, 0, 0, 0.0456112),
    0px -0.375647px 17.7806px rgba(0, 0, 0, 0.035),
    0px -0.135864px 6.4309px rgba(0, 0, 0, 0.0243888);
  h1 {
    font-weight: 500;
    font-size: 30px;
    line-height: 35px;
    padding-bottom: 32px;
    border-bottom: 1px solid #cccccc;
  }
`;

const StPaymentPeriod = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  margin-top: 10px;
  .paymentTime {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border-bottom: 1px solid #cccccc;
    padding-top: 25px;
    padding-bottom: 16px;
    width: 100%;
  }
  .paymentDates {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    border-bottom: 1px solid #cccccc;
    padding-top: 25px;
    padding-bottom: 16px;
    width: 100%;
    text-align: right;
  }
`;

const StPaymentPriceInfo = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  margin-top: 10px;
  .rentCost {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    padding-top: 25px;
    padding-bottom: 16px;
    width: 100%;
  }
  .rentPrice {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    padding-top: 25px;
    padding-bottom: 16px;
    width: 100%;
    text-align: right;
  }
`;

const StPaymentTax = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  margin-top: 10px;
  .paymentTax {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    padding-bottom: 16px;
    width: 100%;
  }
  .paymentTaxInfo {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    padding-bottom: 16px;
    width: 100%;
    text-align: right;
  }
`;

const StPaymentInsurance = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  margin-top: 10px;
  .paymentInsurance {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    padding-bottom: 16px;
    width: 100%;
  }
  .paymentInsuranceCost {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    padding-bottom: 16px;
    width: 100%;
    text-align: right;
  }
`;

const StPaymentTotal = styled.div`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  margin-top: 10px;
  .paymentTotal {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    width: 100%;
  }
  .paymentTotalCost {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    width: 100%;
    text-align: right;
  }
`;

const StPaymentButton = styled(Button)`
  width: 380px;
  height: 60px;
  background: #ff881b;
  border-radius: 12px;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  color: #ffffff;
  margin: 40px auto;
`;

const StNeedLogin = styled(Button)`
  width: 380px !important;
  height: 60px;
  background: #ff881b;
  border-radius: 12px;
  font-weight: 600;
  font-size: 22px !important;
  line-height: 30px;
  color: #ffffff;
  margin: 40px auto;
  cursor: not-allowed;
`;

export default VehicleDetailRight;
