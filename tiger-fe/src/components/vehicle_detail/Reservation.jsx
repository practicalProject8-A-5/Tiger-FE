// eslint-disable-next-line

import React, { useState, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import moment from "moment";

import styled from "styled-components";

import Modal from "../../global_elements/Modal";

const Reservation = () => {
  // let user to pick startDate and endDate
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  // // date picker button custom
  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));

  // // modal open or close
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  // console.log("start-date", startDate);
  // console.log("end-date", endDate);
  return <div></div>;
  // <CalendarContainer>
  //   <CalendarWrapper>
  //     <NewDatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       selectsStart
  //       startDate={startDate}
  //       endDate={endDate}
  //       locale={ko}
  //       dateFormat="yyyy-MM-dd"
  //       minDate={new Date()}
  //       customInput={<ExampleCustomInput />}
  //       shouldCloseOnSelect={false}
  //     />
  //   </CalendarWrapper>
  //   <CalendarWrapper>
  //     <NewDatePicker
  //       selected={endDate}
  //       onChange={(date) => setEndDate(date)}
  //       selectsEnd
  //       startDate={startDate}
  //       endDate={endDate}
  //       minDate={startDate}
  //       locale={ko}
  //       dateFormat="yyyy-MM-dd"
  //       customInput={<ExampleCustomInput />}
  //       shouldCloseOnSelect={false}
  //     />
  //     <button onClick={showModal}>결제하기</button>

  //     {/* modal open to payment modal */}
  //     {isModalOpen ? (
  //       <Modal showModal={showModal}>
  //         <p>{String(startDate.toISOString().slice(0, 10))}</p>
  //         <p>{String(endDate.toISOString().slice(0, 10))}</p>
  //       </Modal>
  //     ) : null}
  //   </CalendarWrapper>
  // </CalendarContainer>
};

// const CalendarContainer = styled.div``;

// const CalendarWrapper = styled.div`
//   width: 50%;
//   margin: 0 auto;
// `;

// const NewDatePicker = styled(DatePicker)`
//   width: 130px;
//   height: 30px;
//   box-sizing: border-box;
//   padding: 8px 20px;
//   border-radius: 4px;
//   border: 1px solid orange;
//   font-size: 12px;
// `;

export default Reservation;