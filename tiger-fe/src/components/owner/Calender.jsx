// eslint-disable-next-line

import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// 자바스크립트 날짜 관련 함수의 총 집합 라이브러리
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
// import { addMonths } from "date-fns/addMonths";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";
// import InputIcon from "react-multi-date-picker/components/input_icon";
import Settings from "react-multi-date-picker/plugins/settings";
import Icon from "react-multi-date-picker/components/icon";
import { useEffect } from "react";
import { useRef } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getDateList } from "../../redux/modules/DateSlice";

const Calender = ({ setIsModalOpen, vId }) => {
  const serverApi = process.env.REACT_APP_SERVER;
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //날짜 등록
  const submitHandler = async () => {
    //날짜 추출
    //중복 제거
    const openDateList = [];
    const openDateListRemove = [...new Set(openDateLists)];
    console.log("openDateListRemove :", openDateListRemove);
    // for (let i = 0; i < openDateListRemove.length; i++) {
    //   const year = `${openDateListRemove[i].split("-")[0]}`;
    //   const month = `${openDateListRemove[i].split("-")[1]}`;
    //   const day = `${openDateListRemove[i].split("-")[2]}`;
    //   let zeroMonth;
    //   let zeroDay;
    //   if (Number(month) < 10) {
    //     zeroMonth = "0" + Number(month);
    //   } else {
    //     zeroMonth = Number(month);
    //   }
    //   if (Number(day) < 10) {
    //     zeroDay = "0" + Number(day);
    //   } else {
    //     zeroDay = Number(day);
    //   }
    //   const date = `${year}-${zeroMonth}-${zeroDay}`;
    //   openDateList.push(date);
    // }
    //보내는 값
    console.log(openDateList);

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post(
        `${serverApi}/vehicle/schedule/${vId}`,
        { openDateList },
        {
          headers: {
            Authorization: userToken,
            RefreshToken: refreshToken,
          },
        }
      );
      console.log(openDateList);
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getDateList());
  }, [dispatch]);

  // get 불러오기 (reserveDate, openDate)
  const DateList = useSelector((state) => state.getDateListSlice.DateList);
  // console.log(DateList);

  // temp (reserveDate : text-deco)
  const reservedDate = useSelector((state) => state.getDateListSlice.temp);
  // console.log("reservedDate :", reservedDate);

  const [reserveDateList, setReserveDateList] = useState(
    DateList.reservedDateList
  );
  // console.log("reserveDateList :", reserveDateList);

  //open 날짜
  const [openDateLists, setOpenDateLists] = useState(DateList.openDateList);

  console.log("openDateLists:", openDateLists);
  return (
    <StCalender>
      <>
        <h2>렌트 가능 날짜 선택</h2>
        <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>
        <Calendar
          months={months}
          weekDays={weekDays}
          value={openDateLists}
          format={format}
          // showOtherDays
          // minDate={new Date()}
          numberOfMonths={2}
          onChange={(e) => {
            console.log(e);
            const target = e.at(-1);
            const targetStr = `${target.year}-${target.month.number}-${target.day}`;

            if (!reserveDateList.includes(targetStr)) {
              //true일때
              // if (openDateLists.includes(targetStr)) {
              //   //포함되어 있을때
              //   console.log("2");
              //   console.log(targetStr);
              //   // setOpenDateLists(
              //   //   openDateLists.filter((Str) => Str !== targetStr)
              //   // );
              //   // setOpenDateLists([...openDateLists], null);
              //   setOpenDateLists(e);
              // } else {
              //   //포함되지 않았을때
              //   console.log("1");
              //   setOpenDateLists([...openDateLists, targetStr]);
              // }
              setOpenDateLists(e);
            } else {
              e.pop();
            }
          }}
          // plugins={[<DatePanel />]}
          mapDays={({ date }) => {
            let color;
            // if ([11, 12, 13, 14].includes(date.day)) color = "red";
            if (reservedDate.includes(`${date.year}-${date.month}-${date.day}`))
              color = "red";
            return { className: "highlight-" + color };
          }}
        />
        <div className="close" onClick={closeModal}>
          <GrClose />
        </div>

        <button className="submit" onClick={submitHandler}>
          등록
        </button>
        {/* <ul>
          {openDateLists.map((date, i) => (
            <li key={i}>{date}</li>
          ))}
        </ul> */}
      </>
    </StCalender>
  );
};

export default Calender;

const StCalender = styled.div`
  width: 765px;
  padding: 40px;
  position: absolute;
  top: 35%;
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
  .rmdp-container {
    animation: slideRight 1.2s;
    @keyframes slideRight {
      from {
        transform: translateX(-40px);
      }
      to {
        transform: translateX(0);
      }
    }
  }
  .rmdp-wrapper {
    width: 100%;
    /* background-color: pink; */
    .rmdp-top-class {
      /* background-color: skyblue; */
      .rmdp-calendar {
        width: 100%;
        /* background-color: yellow; */
        .rmdp-header {
          div {
            .rmdp-arrow-container {
              /* background-color: #ddd; */
              background-color: #fff;
              .rmdp-arrow {
                border: solid #000;
                border-width: 0 2px 2px 0;
                display: inline-block;
                height: 3px;
                margin-top: 5px;
                padding: 2px;
                width: 3px;
              }
            }
            .rmdp-header-values {
              font-weight: 600;
              font-size: 18px;
              color: #000;
            }
            div {
            }
          }
        }
        div {
          /* background-color: yellow; */
          .rmdp-day-picker {
            display: flex;
            justify-content: space-around;
            /* width: calc(100% / 2); */
            /* background-color: skyblue; */

            div {
              /* width: 300px; */
              /* height: ; */
              /* background-color: pink; */
              .rmdp-week {
                /* background-color: pink; */
                .rmdp-week-day {
                  font-weight: 600;
                  font-size: 14px;
                  color: #8b8b8b;
                }
                .rmdp-day {
                  /* background-color: pink; */
                  .highlight-red {
                    color: #8b8b8b;
                    text-decoration: line-through;
                    background-color: #fff !important;
                    box-shadow: none;
                    :hover {
                      background-color: #fff !important;
                      color: #8b8b8b !important;
                      /* pointer-events: none; */
                      /* cursor-: ; */
                    }
                  }
                  /* .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden)
                    span:hover {
                    background-color: #8b8b8b;
                  } */
                }
                .rmdp-day.rmdp-today span {
                  background-color: #fff;
                  color: royalblue;
                  text-decoration: underline;
                  :hover {
                    background-color: #8b8b8b;
                  }
                }
                .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
                  background-color: #8b8b8b;
                  color: #fff;
                }
                .rmdp-day.rmdp-selected span:not(.highlight) {
                  background-color: #000;
                  /* color: #fff; */
                }
              }
            }
          }
        }
      }
    }
  }
  .rmdp-shadow {
    box-shadow: none;
  }

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
  .edit {
    position: fixed;
    width: 78px;
    height: 40px;
    right: 120px;
    top: 40px;
    border: none;
    background: #ff881b;
    border-radius: 12px;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 1px;
    li {
      margin: 0 22px;
      button {
        display: none;
      }
    }
    /* position: absolute;
      top: 40%;
      right: 20%; */
  }
  .rmdp-panel {
    button {
      display: none;
    }
  }

  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
    /* background-color: pink; */
    font-size: 22px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .reserved {
    /* color: red; */
    .rmdp-week {
      .rmdp-day {
        span {
          :hover {
            background-color: #fff;
            color: #000;
          }
        }
      }
      .rmdp-selected {
        /* background-color: pink; */
        span {
          text-decoration: line-through;
          box-shadow: none;
          color: #000;
          :hover {
            background-color: #fff;
            color: #000;
            box-shadow: 0 0 3px #8798ad;
          }
        }
      }
    }
  }
`;

const StLi = styled.div`
  background-color: pink;
`;

/* 1안 */
/* <h2>렌트 가능 날짜 선택</h2>
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
      </div> */
