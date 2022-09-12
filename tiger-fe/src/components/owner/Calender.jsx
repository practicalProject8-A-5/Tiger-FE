import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// 자바스크립트 날짜 관련 함수의 총 집합 라이브러리
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
// import { addMonths } from "date-fns/addMonths";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";

// 왼쪽 월
const RenderHeaderL = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="headerL row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <FaAngleRight className="btnnext" onClick={nextMonth} />
    </div>
  );
};

// 오른쪽 월
// const RenderHeaderR = ({ currentMonth, nextMonth }) => {
//   return (
//     <div className="headerR row">
//       <div className="col col-start">
//         <span className="text">
//           <span className="text month">{format(currentMonth, "M")}월</span>
//           {format(currentMonth, "yyyy")}
//         </span>
//       </div>
//       <FaAngleRight className="btnnext" onClick={nextMonth} />
//     </div>
//   );
// };

//요일
const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

//1~30,31
const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  // console.log("day:", day);
  // console.log("endDate:", endDate);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      // console.log("cloneDay:", cloneDay);
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
          // onClick={(e)=> e.target.currentMonth}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [futureMonth, setFutureMonth] = useState(addMonths(currentMonth, 1));
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [tomorrowMonth, setTomorrowMonth] = useState(new Date(), 1);
  const month = addMonths(currentMonth, 1);
  console.log(month);
  console.log(currentMonth);
  console.log(selectedDate);
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    // console.log(currentMonth);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  // const onChange = (e)=>{
  //   e.target.val
  // }

  // const dateHandler = (e) => {
  //   // e.target.current
  //   setCurrentMonth(e.target.value);
  // };
  // console.log();
  //마우스
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   setMousePosition({ x: event.clientX, y: event.clientY });
  //   // console.log(mousePosition);
  // };

  return (
    <StCalender>
      <h2>렌트 가능 날짜 선택</h2>
      <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>
      <div className="calender__box">
        {/* onMouseMove={handleMouseMove} */}
        {/* Mouse X = {mousePosition.x} Y = {mousePosition.y} */}
        <div className="box_left">
          <RenderHeaderL
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          ></RenderHeaderL>
          <RenderDays />
          <RenderCells
            // onMouseMove={handleMouseMove}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
        {/* <div className="box_right">
          <RenderHeaderR
            currentMonth={currentMonth}
            nextMonth={nextMonth}
          ></RenderHeaderR>
          <RenderDays />
          <RenderCells
            // onMouseMove={handleMouseMove}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div> */}
      </div>
    </StCalender>
  );
};

export default Calender;

const StCalender = styled.div`
  /* margin-top: 50px; */
  width: 766px;
  height: 550px;
  /* background-color: pink; */
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
    margin-bottom: 52px;
  }
  .calender__box {
    display: flex;
    justify-content: space-between;
    .box_left {
      width: 300px;
      /* background-color: #484848; */
      /* opacity: 09; */
      /* height: 285px; */
      .headerL {
        width: 100%;
        height: 25px;
        /* background-color: pink; */
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 30px;
        /* color: #fff; */
        color: #000;
        .btnprev {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 11px;
          /* color: #fff; */
          color: #cccccc;
          /* background-color: royalblue; */
        }
        .col {
          /* background-color: gray; */
          .text {
            font-weight: 600;
            font-size: 18px;
            /* background-color: yellow; */
            .text .month {
            }
          }
        }
        .btnnext {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 11px;
          /* color: #fff; */
          color: #cccccc;
        }
      }

      .days {
        width: 100%;
        font-weight: 600;
        font-size: 14px;
        /* color: #fff; */
        color: #8b8b8b;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        /* background-color: yellow; */
        .col {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .body {
        width: 100%;
        /* background-color: royalblue; */
        .row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          /* background-color: red; */

          .col {
            /* background-color: yellow; */
            width: 38px;
            height: 38px;
            margin: 2px 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;

            /* ---------------------------------------------- */
            /* opacity: 0.5; */
            /* border: 1px solid #fff; */
            /* transition: all 0.4s; */
            :hover {
              /* opacity: 1.4; */
              cursor: pointer;
            }

            .not-valid {
              display: none;
              /* color: #bfbcbc; */
            }
          }
          .col.cell.valid {
            font-weight: 600;
            font-size: 14px;

            /* color: #fff; */
            color: #cccccc;
          }
          .col.cell.selected {
            /* color: #fff; */
            font-weight: 700;
            color: #6a6969;
            border-radius: 50%;
            background-color: #cccccc;
          }
        }
      }
    }
    .box_right {
      width: 300px;
      .headerR {
        width: 100%;
        height: 25px;
        /* background-color: pink; */
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 30px;
        /* background-color: skyblue; */
        /* color: #fff; */
        color: #000;
        .btnnext {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 11px;
          /* color: #fff; */
          color: #cccccc;
          /* background-color: royalblue; */
        }
        .col {
          /* background-color: gray; */
          .text {
            font-weight: 600;
            font-size: 18px;
            /* background-color: yellow; */
            .text .month {
            }
          }
        }
      }
    }
    .days {
      width: 100%;
      font-weight: 600;
      font-size: 14px;
      color: #8b8b8b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .col {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .body {
      width: 100%;
      .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .col {
          width: 38px;
          height: 38px;
          margin: 2px 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          :hover {
            cursor: pointer;
            border-radius: 50%;
            background-color: #eee;
          }

          .not-valid {
            display: none;
          }
        }
        .col.cell.valid {
          font-weight: 600;
          font-size: 14px;
          color: #cccccc;
        }
        .col.cell.selected {
          /* font-weight: 700; */
          /* color: #6a6969; */
          color: #cccccc;
        }
      }
    }
  }

  /* .mouse {
    width: 30px;
    height: 30px;
    background-color: pink;
  } */
`;
