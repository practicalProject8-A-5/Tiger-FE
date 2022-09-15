// eslint-disable-next-line

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../global_elements/Button";
import PaymentModal from "./PaymentModal";
import LoginModal from "../../global_elements/LoginModal";

import styled from "styled-components";

// import { __vehicleDetail } from "../../redux/modules/vehicleDetail";

const VehicleDetailRight = () => {
  // get response for vehicle info
  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetailList
  );
  console.log(vehicleDetails);

  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  console.log(userInfo);

  const startDate = new URL(window.location.href).searchParams.get("startDate");
  const endDate = new URL(window.location.href).searchParams.get("endDate");

  const [paymentModalOpen, setPaymentModalOpen] = useState();
  const showPaymentModal = () => {
    setPaymentModalOpen(!paymentModalOpen);
  };

  const [loginModal, setLoginModal] = useState();
  const showModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <StPaymentBox>
      <h1>결제 정보</h1>
      <StPaymentPeriod>
        <h2>대여시간 {startDate}</h2>
        <h2>대여끝나는 시간 {endDate}</h2>
      </StPaymentPeriod>
      <StPaymentPriceInfo>
        <p>대여요금 ₩{vehicleDetails.vehicleList.price}</p>
        <p>기타 수수료, 보험료</p>
        <p>총 예약 금액 ₩{vehicleDetails.vehicleList.price}</p>
      </StPaymentPriceInfo>
      {userInfo.name ? (
        <StPaymentButton onClick={showPaymentModal}>예약하기</StPaymentButton>
      ) : (
        <StNeedLogin>로그인후 이용해주세요</StNeedLogin>
      )}
      {paymentModalOpen && (
        <PaymentModal
          showPaymentModal={showPaymentModal}
          vehicleDetails={vehicleDetails}
        />
      )}
      {/* {loginModal && <LoginModal showModal={showModal} />} */}
      {/* <StNeedLogin onClick={showModal}>
          로그인후 이용해주세요
        </StNeedLogin> */}
    </StPaymentBox>
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
  h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border-bottom: 1px solid #cccccc;
    padding-top: 25px;
    padding-bottom: 16px;
  }
`;

const StPaymentPriceInfo = styled.div`
  p {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    padding-top: 28px;
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

export default VehicleDetailRight;
