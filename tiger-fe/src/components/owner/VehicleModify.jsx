// eslint-disable-next-line

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import email from "../../assets/registermail.png";
import phone from "../../assets/registerphone.png";
import OwnerKakaoMap from "./OwnerKakaoMap";
import ModifyImgViewBox from "./ModifyImgViewBox";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  priceCheck,
  yearsCheck,
  passengersCheck,
  fuelEfficiencyCheck,
} from "../../shared/Regex";

const ModiTest = () => {
  const navigate = useNavigate();

  const serverApi = process.env.REACT_APP_SERVER;
  const userInfo = useSelector((state) => state.memberSlice.userInfo);

  const vid = useParams();
  const numVid = parseInt(vid.id);

  const [defaultValue, setDefaultValue] = useState({});

  //axios get 기본 설정 값 가져오기
  const getDefaultValue = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };

      const resp = await axios.get(
        `${serverApi}/vehicle/management/${numVid}`,
        { headers: headers }
      );

      setDefaultValue(resp.data.output);
    } catch (error) {
      // console.log(error);
      return error;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
    // setValue,
  } = useForm({
    mode: "onChange",
  });

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

  // const [selectCarType, setSelectCarType] = useState(defaultValue);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [locationObj, setLocationObj] = useState({});

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

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
  };

  //put 수정한 값 보내기
  const onSubmit = async ({
    vbrand,
    vname,
    years,
    passengers,
    fuelEfficiency,
    description,
    price,
    imageList,
    removeList,
  }) => {
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
    formData.append("location", address);
    formData.append("locationX", Number(locationObj.locationX));
    formData.append("locationY", Number(locationObj.locationY));
    formData.append("price", price);
    formData.append("removeList", deleteList);

    for (let i = 0; i < addImgList.length; i++) {
      formData.append("imageList", addImgList[i]);
    }

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      // for (let value of formData.values()) {
      //   console.log(value);
      // }
      const multipartType = { "Content-Type": "multipart/form-data" };
      const resp = await axios.put(
        `${serverApi}/vehicle/management/${numVid}`,
        formData,
        {
          headers: {
            multipartType,
            Authorization: userToken,
            RefreshToken: refreshToken,
          },
        }
      );
      if (resp.data.result === true) {
        toast.success(`차량정보가 수정되었습니다.`, {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_RIGHT,
          className: "toatst_success",
          progressClassName: "success_progress",
        });
        setTimeout(() => {
          navigate("/owner");
        }, 1000);
      }
    } catch (err) {
      // console.log(err);
      if (address === "") {
        toast.warn("주소등록은 필수에요.", {
          theme: "dark",
          autoClose: 1500,
          className: "toatst_warn",
          progressClassName: "warn_progress",
        });
      }
    }
  };

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      color: "red",
      boxShadow: "none",
    }),
  };

  const errorStyle = {
    control: (base) => ({
      ...base,
      border: "2px solid red",
      boxShadow: "none",
      "&:hover": {
        border: "2px solid red",
      },
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#eb3434",
      };
    },
  };

  useEffect(() => {
    getDefaultValue();
  }, []);

  useEffect(() => {
    reset({
      vname: defaultValue.vname,
      vbrand: defaultValue.vbrand,
      price: defaultValue.price,
      years: defaultValue.years,
      passengers: defaultValue.passengers,
      fuelEfficiency: defaultValue.fuelEfficiency,
      description: defaultValue.description,
      location: defaultValue.location,

      // fuelType: defaultValue.fuelType,
      // transmission: defaultValue.transmission,
      // cartype: defaultValue.type,
    });
  }, [defaultValue]);

  const [thum, setThum] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    setImageList(defaultValue.imageList);
    setThum(defaultValue.thumbnail);
  }, [defaultValue]);

  const [preView, setPreView] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [addImgList, setAddImgList] = useState([]);
  const [fileList, setFileList] = useState([]);

  return (
    <StVehicleModify>
      {defaultValue.vname !== undefined && (
        <>
          <form id="form" onSubmit={handleSubmit(onSubmit, watch)}>
            {/* 이미지 */}
            <div className="onchange__imgbox">
              <ModifyImgViewBox
                thum={thum}
                setThum={setThum}
                imageList={imageList}
                preView={preView}
                setPreView={setPreView}
                addImgList={addImgList}
                setAddImgList={setAddImgList}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
                setFileList={setFileList}
                fileList={fileList}
                numVid={numVid}
              />
            </div>

            {/* 브랜드명, 차종 */}
            <div className="input__top">
              <div className="input__box">
                <label htmlFor="vbrand">브랜드명</label>
                <input
                  type="text"
                  id="vbrand"
                  {...register("vbrand")}
                  placeholder="ex. 테슬라"
                  {...register("vbrand", {
                    required: "브랜드명을 입력해주세요",
                  })}
                />
                {errors.vbrand ? (
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
                type="number"
                id="price"
                min="0"
                max="1000000"
                placeholder="가격 입력"
                {...register("price", {
                  required: "가격을 입력해주세요",
                })}
              />
              <span>₩/1일</span>
              {errors.price ? (
                <div className="error">{errors.price.message}</div>
              ) : null}
            </div>

            {/* 차량정보 */}
            <table>
              <caption>차량정보</caption>
              <tbody>
                <tr>
                  {/* 연식 */}
                  <th>
                    <label htmlFor="years">연식</label>
                  </th>
                  {errors.years ? (
                    <td style={{ border: " 2px solid #EB3434" }}>
                      <input
                        type="number"
                        id="years"
                        min="1990"
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
                        type="number"
                        id="years"
                        min="1990"
                        placeholder="연식"
                        {...register("years", {
                          required: "연식을 입력해주세요.",
                        })}
                      />
                    </td>
                  )}

                  {/* 탑승자 수 */}
                  <th>
                    <label htmlFor="passengers">탑승 가능 인원</label>
                  </th>
                  {errors.passengers ? (
                    <td style={{ border: " 2px solid #EB3434" }}>
                      <input
                        type="number"
                        id="passengers"
                        min="1"
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
                        type="number"
                        id="passengers"
                        min="1"
                        placeholder="탑승자 수"
                        {...register("passengers", {
                          required: "탑승자 수를 입력해주세요.",
                        })}
                      />
                    </td>
                  )}
                </tr>

                <tr>
                  {/* 연비 */}
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

                  {/* 드롭박스 : 연료 */}
                  <th>
                    <label htmlFor="fuelType">연료</label>
                  </th>
                  {errors.fuelType ? (
                    <td>
                      <Controller
                        id="fuelType"
                        control={control}
                        name="fuelType"
                        rules={{ required: "연료는 필수로 선택하셔야합니다." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            name="fuelType"
                            placeholder={errors.fuelType.message}
                            options={fueltypeOption}
                            styles={errorStyle}
                          />
                        )}
                      />
                    </td>
                  ) : (
                    <td>
                      <Controller
                        id="fuelType"
                        control={control}
                        name="fuelType"
                        className="select"
                        rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            name="fuelType"
                            placeholder="연료 종류 선택"
                            options={fueltypeOption}
                            styles={style}
                          />
                        )}
                      />
                    </td>
                  )}
                </tr>

                <tr>
                  {/* 드롭박스 : 변속기 */}
                  <th>
                    <label htmlFor="transmission">변속기</label>
                  </th>
                  {errors.transmission ? (
                    <td>
                      <Controller
                        id="transmission"
                        control={control}
                        name="transmission"
                        rules={{ required: "변속기 필수로 선택하셔야합니다." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            name="transmission"
                            placeholder={errors.transmission.message}
                            options={transmissionOption}
                            styles={errorStyle}
                            // onChange={setSelectTransmission}
                          />
                        )}
                      />
                    </td>
                  ) : (
                    <td>
                      <Controller
                        id="transmission"
                        control={control}
                        name="transmission"
                        className="select"
                        rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            name="transmission"
                            placeholder="변속기 종류 선택"
                            options={transmissionOption}
                            styles={style}
                          />
                        )}
                      />
                    </td>
                  )}

                  {/* 드롭박스 : 차 타입 */}
                  <th>
                    <label htmlFor="cartype">차 종류</label>
                  </th>

                  {errors.cartype ? (
                    <td>
                      <Controller
                        id="cartype"
                        name="cartype"
                        className="select"
                        control={control}
                        rules={{
                          required: "차 종류는 필수로 선택하셔야합니다.",
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder={errors.cartype.message}
                            options={cartypeOption}
                            styles={errorStyle}
                            // onChange={setSelectCarType}
                          />
                        )}
                      />
                    </td>
                  ) : (
                    <td>
                      <Controller
                        id="cartype"
                        name="cartype"
                        className="select"
                        control={control}
                        rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={cartypeOption}
                            placeholder="차 종류 선택"
                            styles={style}
                          />
                        )}
                      />
                    </td>
                  )}
                </tr>
              </tbody>
            </table>

            <div className="desc">
              <textarea
                // name="description"
                {...register("description")}
                id="description"
                placeholder="차량에 대한 설명을 입력해주세요."
                cols="50"
                rows="10"
              ></textarea>
            </div>

            {/* 렌터정보 */}
            <StRenterInfoWrapper>
              <div className="infoWrapper_nickname">
                <h1>Owner 정보</h1>
              </div>
              <div className="infoWrapper_personal">
                <img src={userInfo.profileImage} alt="userimg" />
                <div className="infoWrapper_personal__info">
                  <p className="name">{userInfo.name}</p>
                  <div className="infoWrapper_personal__info__wrapper">
                    <div className="infoWrapper_personal__info__wrapper__email"></div>
                    <a href="mailto:kwonih1020@gmail.com">
                      <p>{userInfo.email}</p>
                    </a>
                    <div className="infoWrapper_personal__info__wrapper__phone"></div>
                    <a href="010-1234-1234">
                      <p>{userInfo.phone || userInfo.tel}</p>
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
                {...register("location")}
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

            <button>수정</button>
            {/* <StyledContainer /> */}
          </form>
        </>
      )}
      <StyledContainer />
    </StVehicleModify>
  );
};

export default ModiTest;
const StVehicleModify = styled.div`
  margin-bottom: 80px;
  form {
    margin: 0 auto;
    width: 845px;
    .onchange__imgbox {
      width: 844px;
      height: 430px;
      border-radius: 12px;
      /* background: #f2f2f2; */
      margin-top: 56px;
      position: relative;
      text-align: center;
      /* border: 1px solid; */
      overflow: hidden;
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
      padding-top: 50px;
      display: flex;
      margin-bottom: 80px;
      display: flex;
      justify-content: space-between;
      label {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 21px;
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
      .location_error {
        position: absolute;
        top: 0;
        right: 0;
        color: red;
        font-size: 13px;
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
const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    position: relative;
  }
  .Toastify__toast-icon > svg {
    fill: #fff;
  }
  .Toastify__toast-body {
    height: 100px;
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
    background-color: transparent;
  }
`;
