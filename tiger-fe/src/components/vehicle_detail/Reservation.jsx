// eslint-disable-next-line

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import styled from "styled-components";

const Reservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log("start-date", startDate);
  console.log("end-date", endDate);
  return (
    <CalendarContainer>
      <CalendarWrapper>
        <NewDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
      </CalendarWrapper>
      <CalendarWrapper>
        <NewDatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
        />
        <button>결제하기</button>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
`;

const CalendarWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const NewDatePicker = styled(DatePicker)`
  width: 130px;
  height: 30px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid orange;
  font-size: 12px;
`;

export default Reservation;
