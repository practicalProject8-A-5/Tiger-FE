// eslint-disable-next-line

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled, { css } from "styled-components";
import ImgViewBox from "./ImgViewBox";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import userImg from "../../assets/dan-gold-N7RiDzfF2iw-unsplash.jpg";
import email from "../../assets/registermail.png";
import phone from "../../assets/registerphone.png";
import OwnerKakaoMap from "./OwnerKakaoMap";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const VehicleRegister = () => {
  const serverApi = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  //유효성 검사 및 select 최적화
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // console.log(watch("fuelType"));

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
  const [fileList, setFileList] = useState();
  const [isShowImg, setIsShowImg] = useState(true);

  const changeImg = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));
    setFileList(files);

    // console.log(files);
    // console.log(fileList);
    // console.log(urlList);

    setFiles([...urlList]);
    // setFiles([]);

    if (files.length !== 0) {
      setIsShowImg(false);
    }
  };

  //location
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [locationObj, setLocationObj] = useState({});
  // console.log(locationObj);

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  // console.log(address);

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
    // console.log(address);
  };

  // console.log(fileList);

  const onSubmit = async ({
    vbrand,
    vname,
    years,
    passengers,
    fuelEfficiency,
    description,
    location,
    price,
    // locationObj,
  }) => {
    //이미지 업로드
    // const imgFormData = new FormData();
    const formData = new FormData();
    formData.append("vbrand", vbrand);
    formData.append("vname", vname);
    formData.append("years", years);
    formData.append("passengers", passengers);
    formData.append("fuelEfficiency", fuelEfficiency);
    formData.append("fuelType", watch("fuelType").value);
    formData.append("transmission", watch("transmission").value);
    formData.append("type", watch("cartype").value);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("locationX", Number(locationObj.locationX));
    formData.append("locationY", Number(locationObj.locationY));
    formData.append("price", price);
    // formData.append("imageList", fileList[0]);
    // console.log(Number(locationObj.locationX));
    // console.log(Number(locationObj.locationY));
    // console.log(locationObj);
    for (let i = 0; i < fileList.length; i++) {
      // formData.append("imageList", imgfile[i]);
      // let fileUrl = new File(blob[i], "image.jpg");
      formData.append("imageList", fileList[i]);
      // console.log("files ===>", fileUrl);
    }

    // for (let value of formData.values()) {
    //   // console.log("value:", value);
    // }

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      // const jsonType = { "Content-Type": "application/json" };
      const multipartType = { "Content-Type": "multipart/form-data" };
      // const json = JSON.stringify(obj)
      await axios.post(`${serverApi}/vehicle/management`, formData, {
        headers: {
          multipartType,
          Authorization: userToken,
          RefreshToken: refreshToken,
        },
      });
    } catch (err) {
      // console.log(err);
    }

    navigate("/owner");
  };

  return (
    <StVehicleRegister>
      <form id="form" onSubmit={handleSubmit(onSubmit, watch)}>
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
            <label htmlFor="vbrand">브랜드명</label>
            <input
              type="text"
              id="vbrand"
              placeholder="ex. 테슬라"
              {...register("vbrand", {
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
              <div className="error">{errors.vbrand.message}</div>
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

        {/* 가격 */}
        <div className="price_box">
          <label htmlFor="price">렌트 요금</label>
          <input
            type="text"
            id="price"
            placeholder="가격을 입력해주세요"
            {...register("price", {
              required: "가격을 입력해주세요",
            })}
          />
          <span>₩/1일</span>
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
              {errors.fuelType ? (
                // alert(errors.fuelType.message)
                <td style={{ border: " 2px solid #EB3434" }}>
                  <Controller
                    name="fuelType"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.fuelType.message}
                        options={fueltypeOption}
                        // onChange={setSelectFuelType}
                      />
                    )}
                    control={control}
                    // defaultValue=""
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    control={control}
                    name="fuelType"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        name="fuelType"
                        placeholder="연료 종류"
                        options={fueltypeOption}
                        // onChange={setSelectFuelType.value}
                      />
                    )}
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
                  }}>
                  <Controller
                    name="transmission"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.transmission.message}
                        options={transmissionOption}
                        // onChange={setSelectTransmission.value}
                      />
                    )}
                    control={control}
                    // defaultValue={transmissionOption.value}
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    control={control}
                    name="transmission"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        name="transmission"
                        placeholder="변속기 종류"
                        options={transmissionOption}
                        // onChange={setSelectTransmission}
                      />
                    )}
                    // defaultValue=""
                  />
                </td>
              )}
              <th>차 종류</th>
              {errors.cartype ? (
                <td>
                  <Controller
                    control={control}
                    name="cartype"
                    // className="select"
                    className="select"
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={errors.cartype.message}
                        options={cartypeOption}
                        // onChange={setSelectCarType}
                      />
                    )}
                    // defaultValue=""
                  />
                </td>
              ) : (
                <td>
                  <Controller
                    name="cartype"
                    className="select"
                    control={control}
                    rules={{ required: "필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="차 종류"
                        options={cartypeOption}
                        // onChange={setSelectCarType}
                      />
                    )}
                    // defaultValue=""
                  />
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <div className="desc">
          {/* <Controller name="desc" as={ParseTextarea} control={control} /> */}
          <textarea
            // name="description"
            {...register("description")}
            id="description"
            placeholder="차량에 대한 설명을 입력해주세요."
            cols="50"
            rows="10"></textarea>
        </div>

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

        <OwnerKakaoMap
          address={address}
          locationObj={locationObj}
          setLocationObj={setLocationObj}
        />

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

  /* height: 250vh; */
  margin-bottom: 80px;
  form {
    /* background-color: yellowgreen; */
    margin: 0 auto;
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
        color: #000;
      }
    }
    .price_box {
      /* background-color: pink; */
      margin-bottom: 80px;
      label {
        display: block;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;
      }
      input {
        width: 160px;
        height: 38px;
        outline: none;
        border: 1px solid #8b8b8b;
        border-radius: 12px;
        padding: 12px;
        box-sizing: border-box;
        margin-right: 8px;
      }
      span {
        font-weight: 500;
        font-size: 16px;
      }
    }
    table {
      width: 100%;
      height: 150px;
      margin-bottom: 50px;
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
              color: #000;
            }
          }
        }
      }
    }

    .desc {
      width: 100%;
      /* background-color: pink; */
      textarea {
        padding: 28px 26px;
        box-sizing: border-box;
        width: 100%;
        height: 320px;
        border: 1px solid #8b8b8b;
        border-radius: 20px;
        outline: none;
        resize: none;
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
        color: #000;
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
  button {
    width: 100%;
    height: 50px;
    border-radius: 12px;
    margin-top: 80px;
    background-color: #ff881b;
    cursor: pointer;
    font-weight: 600;
    font-size: 22px;
    color: #ffffff;
    border: none;
  }
`;
const StRenterInfoWrapper = styled.div`
  width: 100%;
  margin: 80px 0;
  .infoWrapper_nickname {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
  }
  .infoWrapper_personal {
    margin-top: 24px;
    display: flex;
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
