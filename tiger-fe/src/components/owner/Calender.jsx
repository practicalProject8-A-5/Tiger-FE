import React, { useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePicker, { DateObject } from "react-multi-date-picker";
import styled from "styled-components";
// import InputIcon from "react-multi-date-picker/components/input_icon";
import Icon from "react-multi-date-picker/components/icon";
import { useEffect } from "react";
import { useRef } from "react";
import { GrClose } from "react-icons/gr";

const Calender = ({ setIsModalOpen }) => {
  // console.log(setIsModalOpen);
  // const today = new Date();
  // const tomorrow = new Date();

  // tomorrow.setDate(tomorrow.getDate() + 1);

  // const [values, setValues] = useState(new Date());
  // console.log(values);

  // const date = new DateObject();
  // const [dates, setDates] = useState([
  //   new DateObject().setDay(5),
  //   new DateObject().setDay(12),
  //   new DateObject().setDay(14).add(1, "month"),
  //   new DateObject().setDay(23).add(1, "month"),
  // ]);

  //값 넣기
  // const [dates, setDates] = useState([
  //   new DateObject().setDay(5),
  //   new DateObject().setDay(12),
  //   new DateObject().setDay(14).add(1, "month"),
  //   new DateObject().setDay(23).add(1, "month"),
  // ]);
  // let [date, submitDate] = useState([]);
  // console.log(date);

  // let [value, setValue] = useState([new Date()]);
  // console.log(value);
  // console.log(setValue);
  // console.log(value[0].year);

  //js일때
  // let makeList = function () {
  //   const day = [];
  //   for (let i = 0; i < value.length; i++) {
  //     // console.log(value[i]);
  //     const date = `${value[i].year}-${value[i].month}-${value[i].day}`;
  //     // console.log(date);
  //     day.push(date);
  //     console.log(day);
  //     // setValue();
  //   }
  //   return day;
  // };
  // makeList();

  //useEffect 사용
  // let [value, setValue] = useState([new Date()]);
  // useEffect(() => {
  //   const day = [];
  //   for (let i = 0; i < value.length; i++) {
  //     // console.log(value[i]);
  //     const date = `${value[i].year}-${value[i].month}-${value[i].day}`;
  //     // console.log(date);
  //     day.push(date);
  //     console.log(day);
  //     setValue();
  //   }
  // }, [value]);
  // console.log(value);
  // const days = value;
  // console.log(days);

  //월
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  //요일
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const format = "YYYY-MM-DD";

  const [dates, setDates] = useState([]);
  useEffect(() => {
    const dateList = [];
    for (let i = 0; i < dates.length; i++) {
      // console.log(dates[i]);
      const date = `${dates[i].year}-${dates[i].month}-${dates[i].day}`;
      // console.log(date);
      dateList.push(date);
      //  setValue();
    }
    console.log(dateList);
  }, [dates]);
  // console.log(dates);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 밖에 누르면 끄기
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const modalRef = useRef();
  // console.log(modalRef);
  // useEffect(() => {
  //   const handler = (e) => {
  //     if (modalRef.current && !modalRef.current) {
  //       setIsModalOpen(false);
  //     }
  //   };

  //   // document.addEventListener("mousedown", handler);
  // });
  return (
    <StCalender>
      {/* 1안 */}
      {/* <h2>렌트 가능 날짜 선택</h2>
      <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>
      <div className="calender__box">
        <form>
          <DatePicker
            multiple
            plugins={[<DatePanel />]}
            weekDays={weekDays}
            months={months}
            numberOfMonths={2}
            onChange={setValue}
            render={<Icon />}
          />
          <button className="submit">등록</button>
        </form>
      </div> */}
      {/* 2안 */}
      {/* <div className="App"> */}
      <h2>렌트 가능 날짜 선택</h2>
      <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>
      {/* <div style={{ textAlign: "center" }}> */}
      <StDatePicker
        value={dates}
        onChange={setDates}
        multiple
        format={format}
        // onChange={setValue}
        weekDays={weekDays}
        months={months}
        plugins={[<DatePanel />]}
        render={<Icon style={{ marginBottom: 15 }} />}
        numberOfMonths={2}
      />
      <div className="close" onClick={closeModal}>
        <GrClose />
      </div>
      {/* </div> */}
      <form>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date.format()}</li>
          ))}
        </ul>
        <button className="submit">등록</button>
      </form>
      {/* </div> */}
    </StCalender>
  );
};

export default Calender;

const StCalender = styled.div`
  width: 765px;
  /* height: 550px; */
  padding: 40px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  animation: modal-show 1.5s;
  background-color: #fff;
  h2 {
    font-weight: 600;
    font-size: 20px;
    color: #000;
    margin-bottom: 9px;
  }
  p {
    font-weight: 600;
    font-size: 16px;
    color: #656060;
    margin-bottom: 52px;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  form {
    width: 100%;
    position: relative;
    /* margin-top: 15px; */
    /* background-color: pink; */
    svg {
      width: 40px;
      height: 40px;
      margin-bottom: 15px;
    }
    .submit {
      position: fixed;
      width: 78px;
      height: 40px;
      right: 40px;
      top: 40px;
      border: none;
      background: #ff881b;
      border-radius: 12px;
      font-weight: 600;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
    ul {
      width: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 1px;
      /* margin: 0 auto;
      text-align: center; */
      /* justify-content: center; */
      li {
        margin: 0 22px;
      }
      /* position: absolute;
      top: 40%;
      right: 20%; */
    }
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    /* background-color: pink; */
    font-size: 22px;
    cursor: pointer;
  }
`;

const StDatePicker = styled(DatePicker)`
  margin-bottom: 15px;
`;
