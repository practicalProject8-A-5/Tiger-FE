// eslint-disable-next-line

import React, { useState, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import styled from "styled-components";
// import Button from "../../global_elements/Button";

// import Modal from "../../global_elements/Modal";

const SearchDates = () => {
  // let user to pick startDate and endDate
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // date picker button custom
  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));

  const newStartDate = String(startDate.toISOString().slice(0, 10));
  const newEndDate = String(endDate.toISOString().slice(0, 10));

  console.log(newStartDate);
  console.log(newEndDate);

  // modal open or close
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };
  return (
    <CalendarContainer>
      <CalendarWrapper>
        <NewDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          // customInput={<ExampleCustomInput />}
          shouldCloseOnSelect={false}
        />
      </CalendarWrapper>
      <CalendarWrapper>
        <NewDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          // customInput={<ExampleCustomInput />}
          shouldCloseOnSelect={false}
        />
        {/* <button onClick={showModal}>찾기</button> */}

        {/* modal open to payment modal */}
        {/* {isModalOpen ? (
          <Modal showModal={showModal}>
            <p>{String(startDate.toISOString().slice(0, 10))}</p>
            <p>{String(endDate.toISOString().slice(0, 10))}</p>
          </Modal>
        ) : null} */}
      </CalendarWrapper>
      {/* <Button size="medium">찾기</Button> */}
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CalendarWrapper = styled.div``;

const NewDatePicker = styled(DatePicker)`
  width: 270px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid orange;
  font-size: 12px;
  margin: 25px 0 25px 0;
  cursor: pointer;
`;

export default SearchDates;
