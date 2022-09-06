import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled, { css } from "styled-components";
import ImgViewBox from "./ImgViewBox";
// import RESP from "../../server/response";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { useRef } from "react";
import userImg from "../../assets/dan-gold-N7RiDzfF2iw-unsplash.jpg";
import email from "../../assets/registermail.png";
import phone from "../../assets/registerphone.png";
import KakaoMapDetail from "../vehicle_detail/KakaoMapDetail";
import OwnerKakaoMap from "./OwnerKakaoMap";
import { useEffect } from "react";

const VehicleRegister = () => {
  //유효성 검사 및 select 최적화
  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm();

  //value가 서버에 보내는 값, label view에 보여주는 값
  const cartypeOption = [
    { value: "경형", label: "경형" },
    { value: "중형", label: "중형" },
    { value: "대형", label: "대형" },
    { value: "승합RV", label: "승합RV" },
    { value: "수입", label: "수입" },
  ];
  const transmissionOption = [
    { value: "자동", label: "자동" },
    { value: "수동", label: "수동" },
  ];
  const fueltypeOption = [
    { value: "휘발유", label: "휘발유" },
    { value: "경유", label: "경유" },
    { value: "LPG", label: "LPG" },
    { value: "전기", label: "전기" },
    { value: "수소", label: "수소" },
  ];

  //파일 상태관리 및 Array로 만들기 위해
  const [files, setFiles] = useState([]);
  const [isShowImg, setIsShowImg] = useState(true);

  const changeImg = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setFiles([...urlList]);
    // setFiles([]);

    if (files.length !== 0) {
      setIsShowImg(false);
    }
  };

  // useEffect(() => {}, [files]);

  //location
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  console.log(address);

  const RegisterPostCodeStyle = {
    display: "block",
    position: "absolute",
    top: "100%",
    width: "400px",
    height: "400px",
    border: "1px solid black",
    zIndex: "999",
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    console.log(address);
  };

  //임시
  const onSubmit = async () => {
    const resp = await axios.post("http://localhost:3001/vehicle/management");

    const {
      result,
      status: { message },
    } = resp.data;

    if (!result) {
      alert(message);
      return;
    }
  };

  return (
    <StVehicleRegister>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* //이미지 */}
        <div className="onchange__imgbox">
          {!isShowImg ? (
            <ImgViewBox files={files} />
          ) : (
            <p className="imgbox_text">
              등록하실 차량의 이미지를 아래 버튼을 통해 업로드 해주세요:)
            </p>
          )}
        </div>

        <div className="imgbox">
          <input
            type="file"
            className="img"
            onChange={changeImg}
            multiple="multiple"
            accept="image/jpg, image/png, image/jpeg"
          />
        </div>

        {/* 브랜드명, 차종 */}
        <div className="input__top">
          <div className="input__box">
            <label htmlFor="model">브랜드명</label>
            <input
              type="text"
              id="model"
              placeholder="ex. 테슬라"
              {...register("model", {
                required: "브랜드명을 입력해주세요",
                mimLength: {
                  value: 2,
                  message: "2글자 이상",
                },
                maxLength: {
                  value: 10,
                  message: "10글자 이하",
                },
              })}
            />
            {errors.model ? (
              <div className="error">{errors.model.message}</div>
            ) : null}
          </div>

          <div className="input__box">
            <label htmlFor="vname">모델명</label>
            <input
              type="text"
              id="vname"
              placeholder="ex. 모델 3 롱레인지"
              {...register("vname", {
                required: "차종을 입력해주세요",
              })}
            />
            {errors.vname ? (
              <div className="error">{errors.vname.message}</div>
            ) : null}
          </div>
        </div>

        {/* 차량정보 */}
        <table>
          <caption>차량정보</caption>
          <tbody>
            <tr>
              <th>
                <label htmlFor="years">연식</label>
              </th>
              {errors.years ? (
                <td style={{ border: " 2px solid #EB3434" }}>
                  <input
                    type="text"
                    id="years"
                    placeholder={errors.years.message}
                    className="error_input"
                    {...register("years", {
                      required: "연식을 입력해주세요",
                    })}
                  />
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    id="years"
                    placeholder="연식"
                    {...register("years", {
                      required: "연식을 입력해주세요",
                    })}
                  />
                </td>
              )}
              <th>
                <label htmlFor="passengers">탑승 가능 인원</label>
              </th>
              {errors.passengers ? (
                <td style={{ border: " 2px solid #EB3434" }}>
                  <input
                    type="text"
                    id="passengers"
                    placeholder={errors.passengers.message}
                    className="error_input"
                    {...register("passengers", {
                      required: "탑승자 수를 입력해주세요.",
                    })}
                  />
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    id="passengers"
                    placeholder="탑승자 수"
                    {...register("passengers", {
                      required: "탑승자 수를 입력해주세요.",
                    })}
                  />
                </td>
              )}
            </tr>
            <tr>
              <th>
                <label htmlFor="fuelEfficiency">연비</label>
              </th>
              {errors.fuelEfficiency ? (
                <td style={{ border: " 2px solid #EB3434" }}>
                  <input
                    type="text"
                    id="fuelEfficiency"
                    placeholder={errors.fuelEfficiency.message}
                    className="error_input"
                    {...register("fuelEfficiency", {
                      required: "연비를 입력해주세요.",
                    })}
                  />
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    id="fuelEfficiency"
                    placeholder="연비"
                    {...register("fuelEfficiency", {
                      required: "연비를 입력해주세요.",
                    })}
                  />
                </td>
              )}
              <th>연료</th>
              {errors.fueltype ? (
                <td style={{ border: " 2px solid #EB3434" }}>
                  <Controller
                    name="fueltype"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.fueltype.message}
                        options={fueltypeOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    name="fueltype"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="연료 종류"
                        options={fueltypeOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              )}
            </tr>
            <tr>
              <th>기어 변속</th>
              {errors.transmission ? (
                <td
                  style={{
                    // backgroundColor: "rgba(235,52,52,0.8) ",
                    border: "2px solid #EB3434",
                  }}
                >
                  <Controller
                    name="transmission"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.transmission.message}
                        options={transmissionOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    name="transmission"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="변속기 종류"
                        options={transmissionOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              )}
              <th>차 종류</th>
              {errors.cartype ? (
                <td>
                  <Controller
                    name="cartype"
                    // className="select"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.cartype.message}
                        options={cartypeOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    name="cartype"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="차 종류"
                        options={cartypeOption}
                      />
                    )}
                    control={control}
                    defaultValue=""
                  />
                </td>
              )}
            </tr>
          </tbody>
        </table>

        {/* 렌터정보 */}
        <StRenterInfoWrapper>
          <div className="infoWrapper_nickname">
            <h1>Owner 정보</h1>
          </div>
          <div className="infoWrapper_personal">
            <img src={userImg} alt="userimg" />
            <div className="infoWrapper_personal__info">
              <p className="name">권익현</p>
              <div className="infoWrapper_personal__info__wrapper">
                <div className="infoWrapper_personal__info__wrapper__email"></div>
                <a href="mailto:kwonih1020@gmail.com">
                  <p>1234590@gmail.com</p>
                </a>
                <div className="infoWrapper_personal__info__wrapper__phone"></div>
                <a href="010-1234-1234">
                  <p>010-1234-1234</p>
                </a>
              </div>
            </div>
          </div>
        </StRenterInfoWrapper>

        {/* 위치 */}
        <div className="location">
          <h2>렌터지역</h2>
          <input
            id="location"
            className="location_input"
            value={address}
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
            onChange={onChangeHandler}
            placeholder="상세 주소를 입력해주세요."
            {...register("location", {
              required: "주소를 입력해주세요",
            })}
          />
          {isPopupOpen ? (
            <div>
              <DaumPostcode
                style={RegisterPostCodeStyle}
                onComplete={handlePostCode}
              />
            </div>
          ) : (
            !isPopupOpen
          )}
        </div>

        <OwnerKakaoMap address={address} />
        <button>제출</button>
      </form>
    </StVehicleRegister>
  );
};

export default VehicleRegister;

const StVehicleRegister = styled.div`
  /* ${() => css`
    {error.years ? (
      input::placeholder {
      color: #eb3434;
      font-style: italic;
    }
    ) : (
      color: #CCCCCC;
    )}
  `} */

  height: 250vh;
  form {
    /* background-color: yellowgreen; */
    width: 845px;
    .onchange__imgbox {
      width: 844px;
      height: 429px;
      border-radius: 12px;
      background: #f2f2f2;
      margin-top: 56px;
      position: relative;
      text-align: center;
      .imgbox_text {
        width: 567px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: 600;
        font-size: 22px;
        color: #8b8b8b;
      }
    }
    .imgbox {
      width: 100%;
      height: 48px;
      text-align: center;
      margin: 0 auto;
      input {
        width: 180px;
        text-align: center;
        margin-top: 24px;
      }
    }
    .input__top {
      /* background-color: skyblue; */
      padding-top: 50px;
      display: flex;
      /* background-color: yellow; */
      margin-bottom: 80px;
      display: flex;
      justify-content: space-between;
      label {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 21px;
        /* background-color: pink; */
        display: block;
      }
      input {
        width: 393px;
        height: 52px;
        outline: none;
        padding: 15px 16px;
        box-sizing: border-box;
        border: 1px solid #8b8b8b;
        border-radius: 12px;
        font-family: "Noto Sans KR", sans-serif;
        color: #cccccc;
      }
    }
    table {
      width: 100%;
      height: 150px;
      margin-bottom: 80px;
      caption {
        text-align: left;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 26px;
      }
      tbody {
        border-top: 2px solid #cccccc;
        border-bottom: 2px solid #cccccc;
        tr {
          text-align: center;
          /* display: flex; */
          th {
            border-bottom: 1px solid #cccccc;
            box-sizing: border-box;
            width: 160px;
            height: 50px;
            background: #f2f2f2;
            line-height: 50px;
            font-weight: 500;
            font-size: 18px;
            padding: 0 16px;
            box-sizing: border-box;
            text-align: left;
            label {
              /* background-color: pink;/ */
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          td {
            border-bottom: 1px solid #cccccc;
            width: 269px;
            height: 50px;
            box-sizing: border-box;
            /* background-color: yellow; */
            vertical-align: middle;

            input {
              width: 100%;
              height: 100%;
              border: none;
              padding: 0;
              outline: none;
              padding: 0 16px;
              box-sizing: border-box;
              font-family: "Noto Sans KR", sans-serif;
              color: #cccccc;
            }
          }
        }
      }
    }
    .location {
      position: relative;
      h2 {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        margin-bottom: 24px;
      }
      input {
        width: 100%;
        height: 52px;
        border: 1px solid #8b8b8b;
        border-radius: 12px;
        outline: none;
        margin-bottom: 18px;
        box-sizing: border-box;
        padding: 15px 14px;
        color: #cccccc;
        font-family: "Noto Sans KR", sans-serif;
      }
    }
    .error {
      color: red;
      font-size: 13px;
    }
    .error_input {
      ::placeholder {
        color: #eb3434;
        font-style: italic;
      }
    }
  }
`;
const StRenterInfoWrapper = styled.div`
  width: 100%;
  margin: 80px 0;
  /* background-color: pink; */

  .infoWrapper_nickname {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    /* background-color: skyblue; */
  }
  .infoWrapper_personal {
    margin-top: 24px;
    display: flex;
    /* background-color: yellow; */
    align-items: center;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 31px;
      box-sizing: border-box;
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        margin-bottom: 8px;
      }
      &__wrapper {
        display: flex;
        a {
          text-decoration: underline;
          color: black;
        }
        &__email {
          background-image: url(${email});
          background-size: contain;
          background-repeat: no-repeat;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          background-position: bottom;
        }
        &__phone {
          background-image: url(${phone});
          background-size: contain;
          background-repeat: no-repeat;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          margin-left: 10px;
          background-position: bottom;
        }
      }
    }

    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
    }
  }
`;
