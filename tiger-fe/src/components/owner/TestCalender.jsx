import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

const TestCalender = () => {
  //달력 날짜 변경 시 기준점이 되느 날짜
  const [startDate, setStartDate] = useState(new Date());
  // const [date, setDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  //누르면 텍스트 데코
  const [isClick, setIsClick] = useState(false);

  const dateClick = () => {
    console.log("눌림");
    setStartDate();
    // setIsClick(!isClick);
  };
  // console.log(isClick);

  const newStartDate = new Date(startDate).toISOString().slice(0, 10);

  // console.log(startDate);
  console.log(newStartDate);

  // 월/일
  // const getFormattedDate = (date) => {
  //   const month = date.toLocaleDateString("ko-KR", {
  //     month: "long",
  //   });
  //   const day = date.toLocaleDateString("ko-KR", {
  //     day: "numeric",
  //   });
  //   return `${month.substr(0, month.length - 1)}/${day.substr(
  //     0,
  //     day.length - 1
  //   )}`;
  // };
  // console.log("getFormattedDate:", getFormattedDate);

  // 요일 반환
  // const getDayName = (date) => {
  //   return date
  //     .toLocaleDateString("ko-KR", {
  //       weekday: "long",
  //     })
  //     .substr(0, 1);
  // };

  // 날짜 비교시 년 월 일까지만 비교하게끔

  // const createDate = (date) => {
  //   return new Date(
  //     new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  //   );
  // };

  return (
    <StCalender>
      <h2>렌트 가능 날짜 선택</h2>
      <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>

      <DatePicker
        // value={date}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        monthsShown={2}
        inline
        locale={ko}
        onClick={dateClick()}
        // onClick
        // createDate={createDate}
        // popperModifiers={{
        //   // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
        //   preventOverflow: {
        //     enabled: true,
        //   },
        // }}
        // popperPlacement="auto"
        // dayClassName={(date) =>
        //   getDayName(createDate(date)) === "토"
        //     ? "saturday"
        //     : getDayName(createDate(date)) === "일"
        //     ? "sunday"
        //     : undefined
        // }
      />
      {/* {!isClick ? () : ()} */}
      <div className="btn_flex">
        <div className="btn">저장</div>
      </div>
    </StCalender>
  );
};

export default TestCalender;

const StCalender = styled.div`
  /* text-decoration: line-through; */
  width: 766px;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0px 46px 96px rgba(0, 0, 0, 0.08),
    0px 15.375px 26.2996px rgba(0, 0, 0, 0.0521271),
    0px 6.38599px 10.2342px rgba(0, 0, 0, 0.04),
    0px 2.30969px 3.45191px rgba(0, 0, 0, 0.0278729);
  border-radius: 12px;
  position: relative;
  h2 {
    font-weight: 600;
    font-size: 20px;
    color: #000;
    margin-bottom: 9px;
  }
  p {
    font-weight: 600;
    font-size: 16px;
    color: #cccccc;
    margin-bottom: 56px;
  }
  .react-datepicker {
    border: none;
    width: 100%;

    /* background-color: pink; */
    position: relative;

    .react-datepicker__triangle {
    }
    button {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 10px;
    }
    .react-datepicker__month-container {
      width: calc(100% / 2);
      font-weight: 600;
      font-size: 14px;
      color: #8b8b8b;
      padding: 0 15px 0 15px;
      box-sizing: border-box;
      /* margin-left: 80px; */
      /* background-color: skyblue; */

      .react-datepicker__header {
        background-color: #fff;
        border: none;
        .react-datepicker__current-month {
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-weight: 600;
          font-size: 18px;
          color: #000;
          margin-bottom: 12px;
          /* background-color: pink; */
        }
        .react-datepicker__day-names {
          width: 100%;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-around;
          /* background-color: yellow; */

          .react-datepicker__day-name {
            width: 40px;
            height: 40px;
            font-weight: 600;
            line-height: 40px;
            font-size: 14px;
            color: #8b8b8b;
          }
        }
      }
      .react-datepicker__month {
        width: 100%;
        height: auto;
        margin: 0;
        /* background-color: pink; */
        .react-datepicker__week {
          width: 100%;
          height: 40px;
          margin-bottom: 5px;
          display: flex;
          justify-content: space-around;
          .react-datepicker__day {
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-weight: 600;
            font-size: 14px;
            color: #cccccc;
            box-sizing: border-box;
            /* text-decoration: line-through;s */
            :hover {
              border-radius: 50%;
              border: 1px solid #000;
            }
          }
          .react-datepicker__day--today {
            color: #6a6969;
            font-weight: 700;
            border-radius: 0.5rem;
            background-color: #cccccc;
            :hover {
              color: #6a6969;
              font-weight: 700;
              border-radius: 0.5rem;
              background-color: #cccccc;
              border: none;
            }
          }
          .react-datepicker__day--selected {
            background-color: #000;
            border-radius: 50%;
            color: #fff;
          }
          .react-datepicker__day--outside-month {
            /* display: none; */
            opacity: 0;
          }
        }
      }
    }
  }
  .btn_flex {
    margin-top: 20px;
    display: flex;
    justify-content: end;
    .btn {
      width: 78px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-weight: 600;
      font-size: 18px;
      background: #ff881b;
      border-radius: 12px;
      color: #fff;
    }
  }
`;
