import React, { useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import styled from "styled-components";
// import InputIcon from "react-multi-date-picker/components/input_icon";
import Icon from "react-multi-date-picker/components/icon";
import { useEffect } from "react";
import { useRef } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getDateList } from "../../redux/modules/DateSlice";

const Calender = ({ setIsModalOpen, vId }) => {
  const serverApi = process.env.REACT_APP_SERVER;
  // const serverApiTest = process.env.REACT_APP_SERVER_TEST;
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

  const [dates, setDates] = useState([]);
  //날짜 등록
  const submitHandler = async () => {
    //날짜 추출
    const openDateList = [];
    for (let i = 0; i < dates.length; i++) {
      const date = `${dates[i].year}-${dates[i].month}-${dates[i].day}`;
      openDateList.push(date);
    }

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post(
        `${serverApi}/vehicle/schedule/${vId}`,
        // `${serverApiTest}/vehicle/schedule/`,
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

  //수정보내기
  const editSubmitHandler = async () => {
    const editDateList = [];
    for (let i = 0; i < openDateList.length; i++) {
      const date = `${dates[i].year}-${dates[i].month}-${dates[i].day}`;
      editDateList.push(date);
    }
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.put(
        `${serverApi}/vehicle/schedule/${vId}`,
        // `${serverApiTest}/vehicle/schedule/`,
        { editDateList },
        {
          headers: {
            Authorization: userToken,
            RefreshToken: refreshToken,
          },
        }
      );
      console.log(editDateList);
    } catch (err) {
      console.log(err);
    }
  };

  // get 불러오기
  const DateList = useSelector((state) => state.getDateListSlice.DateList);

  const reservedDate = useSelector((state) => state.getDateListSlice.temp);
  console.log("reservedDate :", reservedDate);
  // console.log(DateList.openDateList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getDateList());
  }, [dispatch]);

  // ---------------------------수정

  // const openDateyear = Number(DateList.openDateList[0].slice(0, 4));
  // // console.log(openDateyear);

  // const openDateMonth = Number(DateList.openDateList[0].slice(5, 7));
  // // console.log(Number(openDateMonth));

  // const openDateDay = Number(DateList.openDateList[0].slice(8, 10));
  // console.log(openDateDay);

  //open 날짜
  const [openDateList, setOpenDateList] = useState(
    // new DateObject().set({
    //   year: openDateyear,
    //   month: openDateMonth,
    //   day: openDateDay,
    //   format,
    // }),
    // new DateObject().set({ month: 8, day: 2, format }),
    // new DateObject().set({ month: 8, day: 3, format }),
    DateList.openDateList
  );

  const [reserveDateList, setReserveDateList] = useState(
    // new DateObject().set({ month: 9, day: 11, format })
    DateList.reservedDateList
  );
  console.log("reserveDateList :", reserveDateList);
  // console.log(reserveDateList);
  // console.log("openDateList :", openDateList);

  const [editToggle, setEditToggle] = useState(false);
  // console.log(editToggle);
  const editHandler = () => {
    console.log("눌림");
    setEditToggle(!editToggle);
  };

  // const reserveDateListDay = { ...reserveDateList };
  // console.log(DateList.reservedDateList[2].slice(8, 10));

  // const temp = [];
  // for (let i = 0; i <= reserveDateList.length; i++) {
  //   const reserveDateDay = DateList.reserveDateList[i].slice(8, 10);
  //   temp.push(reserveDateDay);
  //   // console.log(reserveDateDay);
  // }
  // console.log(reserveDateList.length);
  // .reserveDateList[0].slice(8, 10)
  // const alartA = function (e) {
  //   // if (setOpenDateList.includes(setOpenDateList)) {
  //   e.preventDefault();
  //   alert("선택이 불가해요");
  // };
  // alert("눌렸어요");

  // console.log(alartA);
  return (
    <StCalender>
      {/* 2안 */}
      {!editToggle ? (
        <>
          <h2>렌트 가능 날짜 선택</h2>
          <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p>
          <StDatePicker
            value={dates}
            onChange={setDates}
            multiple
            format={format}
            weekDays={weekDays}
            months={months}
            plugins={[<DatePanel />]}
            render={<Icon className="icon" style={{ marginBottom: 15 }} />}
            numberOfMonths={2}
          />
          <div className="close" onClick={closeModal}>
            <GrClose />
          </div>

          <ul>
            {dates.map((date, index) => (
              <li key={index}>{date.format()}</li>
            ))}
          </ul>
          <div className="edit" onClick={editHandler}>
            달력보기
          </div>
          <button className="submit" onClick={submitHandler}>
            등록
          </button>
        </>
      ) : (
        <>
          {/* <h2>렌트 가능 날짜 선택</h2>
          <p>시작 날짜를 먼저 선택한 후 마감 날짜를 선택해주세요.</p> */}
          <h2 className="open">사용가능한 날짜</h2>
          <Calendar
            value={openDateList}
            // value={reserveDateList}
            onChange={setOpenDateList}
            // onChange={() => {
            //   alartA();
            // }}
            plugins={[<DatePanel />]}
            // onClick={(e) => {
            //   e.preventDefault();
            // }}
            // plugins={[
            //   <Settings
            //     position="bottom"
            //     disabledList={["calendar", "locale", "mode"]}
            //     defaultActive="others"
            //     defaultFormat={{
            //       single: "MM-DD-YYYY",
            //       onlyMonthPicker: "MMMM YYYY",
            //       onlyYearPicker: "YYYY",
            //     }}
            //   />
            // ]}
            mapDays={({ date }) => {
              let color;
              console.log(date.months);

              // if ([11, 12, 13, 14].includes(date.day)) color = "red";
              // if ([9].includes(date.month)) color = "pink";
              if (reservedDate.includes(date.day)) color = "red";

              if (color) return { className: "highlight-" + color };
            }}
            // readOnly
            // editable={false}
            // disabled
          />

          {/* <h2 className="reserve">예약중인 날짜</h2>
          <div className="reserved">
            <Calendar
              value={reserveDateList}
              onChange={setReserveDateList}
              plugins={[<DatePanel />]}
              readOnly
            />
          </div> */}

          <div className="close" onClick={closeModal}>
            <GrClose />
          </div>
          <div className="edit" onClick={editHandler}>
            삭제
          </div>
          <button className="submit" onClick={editSubmitHandler}>
            등록
          </button>
        </>
      )}

      {/* 3안 */}
      {/* <Calendar /> */}

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

const StDatePicker = styled(DatePicker)`
  margin-bottom: 15px;
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
