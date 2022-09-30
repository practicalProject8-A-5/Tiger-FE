// eslint-disable-next-line

import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getDateList } from "../../redux/modules/dateSlice";
import { Calendar } from "react-multi-date-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Calender = ({ setIsModalOpen, vId }) => {
  const serverApi = process.env.REACT_APP_SERVER;
  const DateList = useSelector((state) => state.getDateListSlice.DateList);

  const [reserveDateList, setReserveDateList] = useState([]);
  //open 날짜
  const [openDateLists, setOpenDateLists] = useState([]);

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
    let openDateList = [];
    for (let i = 0; i < openDateLists.length; i++) {
      let year = `${openDateLists[i].year}`;
      let month = `${openDateLists[i].month}`;
      let day = `${openDateLists[i].day}`;
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      openDateList.push(`${year}-${month}-${day}`);
    }
    //보내는 값
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const resp = await axios.post(
        `${serverApi}/vehicle/schedule/${vId}`,
        { openDateList },
        {
          headers: {
            Authorization: userToken,
            RefreshToken: refreshToken,
          },
        }
      );
      if (resp.data.result === true) {
        toast.success("차량 등록 성공", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_success",
          // bodyClassName: "",
          progressClassName: "success_progress",
        });
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1200);
        //모달 오픈 넣으면 알럿이 안떠요
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getDateList(vId));
  }, [dispatch, vId]);

  useEffect(() => {
    setReserveDateList([...DateList.reservedDateList]);
    setOpenDateLists([...DateList.openDateList]);
  }, [DateList]);

  return (
    <StCalender>
      <>
        <h2>렌트 가능 날짜 선택</h2>
        <p>오픈날짜를 선택해주세요.</p>
        <Calendar
          months={months}
          weekDays={weekDays}
          value={openDateLists}
          format={format}
          minDate={new Date()}
          numberOfMonths={2}
          onChange={(e) => {
            // console.log(e);
            const target = e.at(-1);
            const targetStr = `${target.year}-${target.month.number}-${target.day}`;
            if (!reserveDateList.includes(targetStr)) {
              setOpenDateLists(e);
            } else {
              e.pop();
            }
          }}
          mapDays={({ date }) => {
            let color;
            if (
              reserveDateList.includes(`${date.year}-${date.month}-${date.day}`)
            )
              color = "red";
            return { className: "highlight-" + color };
          }}
        />
        <div className="close" onClick={closeModal}>
          <GrClose />
        </div>
        <button className="submit" onClick={submitHandler}>
          등록
          <StyledContainer />
        </button>
      </>
    </StCalender>
  );
};
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
    .rmdp-top-class {
      .rmdp-calendar {
        width: 100%;
        .rmdp-header {
          div {
            .rmdp-arrow-container {
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
          .rmdp-day-picker {
            display: flex;
            justify-content: space-around;
            div {
              .rmdp-week {
                .rmdp-week-day {
                  font-weight: 600;
                  font-size: 14px;
                  color: #8b8b8b;
                }
                .rmdp-day {
                  .highlight-red {
                    color: #6b6868 !important;
                    text-decoration: line-through;
                    background-color: #fff !important;
                    box-shadow: none;
                    :hover {
                      background-color: #fff !important;
                      color: #8b8b8b !important;
                    }
                  }
                }
                .rmdp-day.rmdp-today span {
                  background-color: #fff;
                  font-weight: 800;
                  color: inherit;
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
                  color: #fff;
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
    font-size: 22px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .reserved {
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

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    position: relative;
  }
  .Toastify__toast-body {
    height: 100px;
    .Toastify__toast-icon > svg {
      fill: #fff;
    }
  }
  .Toastify__progress-bar {
  }
  .Toastify__close-button {
    border-radius: 12px;
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    margin: 0;
  }
`;
export default Calender;
