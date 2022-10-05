// eslint-disable-next-line

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";
import ImgViewBox from "./ImgViewBox";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import email from "../../assets/registermail.png";
import phone from "../../assets/registerphone.png";
import OwnerKakaoMap from "./OwnerKakaoMap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";
import { BiPhotoAlbum } from "react-icons/bi";
import { useEffect } from "react";
// import {
//   priceCheck,
//   yearsCheck,
//   passengersCheck,
//   fuelEfficiencyCheck,
// } from "../../shared/Regex";

const VehicleRegister = () => {
  const serverApi = process.env.REACT_APP_SERVER;

  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  // console.log(userInfo);
  const navigate = useNavigate();
  //유효성 검사 및 select 최적화
  const {
    register,
    handleSubmit,
    control,
    watch,
    // setValue,
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
  // const [blob, setBlob] = useState([]);

  const [compressedFiles, setCompressedFiles] = useState([]);
  // console.log("compressedFiles:", compressedFiles);

  const temp = [];

  const [isShowImg, setIsShowImg] = useState(true);

  const changeImg = async (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));
    setFileList(files);
    setFiles([...urlList]);

    // console.log(files.length);
    if (files.length !== 0) {
      setIsShowImg(false);
    }

    const resizing = async () => {
      console.log("압축 시작");
      const files = e.target.files;
      // let temp = [];
      for (let i = 0; i < files.length; i++) {
        const complessedFile = await getImg(files[i]);
        console.log(files[i]);
        console.log(complessedFile);
        const reader = new FileReader();
        reader.readAsDataURL(complessedFile);
        reader.onloadend = () => {
          console.log("변환 완료");
          const base64data = reader.result;
          // console.log(base64data);

          temp.push(base64data);
          setCompressedFiles(...compressedFiles, [...temp]);
          console.log(temp);
        };
      }
    };
    resizing(files);

    // const options = {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 1920,
    //   useWebWorker: true,
    // };
    // try {
    //   const imageFile = e.target.files;
    //   // const temp =[]
    //   for (let i = 0; i < imageFile.length; i++) {
    //     console.log(imageFile);
    //     console.log(imageFile[i]);
    //     console.log(`original size : ${imageFile[i].size}`);
    //     const compressedFile = await imageCompression(...imageFile, options);
    //     console.log(compressedFile);
    //     console.log(`compressedFile size : ${compressedFile.size}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const getImg = (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = imageCompression(file, options);
    // console.log("11");
    return compressedFile;
  };

  // useEffect(() => {
  //   setCompressedFiles(compressedFiles, [...temp]);
  // }, []);

  //location
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [locationObj, setLocationObj] = useState({});
  // console.log(locationObj);

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
    // setValue("location", address);
  };

  // console.log("address:", address);

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

  const onSubmit = async ({
    vbrand,
    vname,
    years,
    passengers,
    fuelEfficiency,
    description,
    // dataURI,
    // address,
    price,
    // compressedFiles,
    // locationObj,
  }) => {
    // console.log(price);
    // actionImgCompress();
    //이미지 업로드
    // const imgFormData = new FormData();
    // console.log("formdata address :", address);
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
    if (fileList === undefined) {
      toast.warn("이미지등록은 필수에요.", {
        theme: "dark",
        autoClose: 1500,
        className: "toatst_warn",
        progressClassName: "warn_progress",
      });
    }
    // 이미지
    // console.log(compressedFiles);

    //임시 추후 수정
    for (let i = 0; i < compressedFiles.length; i++) {
      console.log(compressedFiles[i]);
      const byteString = atob(compressedFiles[i].split(",")[1]);
      console.log(byteString);
      const ab = new ArrayBuffer(byteString.length);
      console.log(ab);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
        // console.log(ia);
      }
      const blob = new Blob([ia], {
        type: "image/jpeg",
      });
      console.log("fileList:", fileList);
      console.log(blob);
      const file = [new File([blob], "image.jpg")];
      console.log(file);
      // console.log(ia);
      // formData.append("imageList", file);
    }

    // console.log(dataURI);
    // console.log(byteString);

    for (let i = 0; i < fileList.length; i++) {
      formData.append("imageList", fileList[i]);
    }
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      // for (let value of formData.values()) {
      //   console.log(value);
      // }
      const multipartType = { "Content-Type": "multipart/form-data" };
      const resp = await axios.post(
        `${serverApi}/vehicle/management`,
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
        toast.success(`차량이 등록되었습니다.`, {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_success",
          progressClassName: "success_progress",
        });
        // setTimeout(() => {
        //   navigate("/owner");
        // }, 1000);
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
            {/* 1행 */}
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
                    type="number"
                    id="fuelEfficiency"
                    min="1"
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
                    type="number"
                    id="fuelEfficiency"
                    placeholder="연비"
                    min="1"
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
                    rules={{ required: "연료는 필수로 선택하셔야합니다." }}
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
                    rules={{ required: "변속기는 필수로 선택하셔야합니다." }}
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
                    rules={{ required: "변속기는 필수로 선택하셔야합니다." }}
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
                    rules={{ required: "차 종류는 필수로 선택하셔야합니다." }}
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
                    rules={{ required: "차 종류는 필수로 선택하셔야합니다." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="차 종류 선택"
                        options={cartypeOption}
                        styles={style}
                        // onChange={setSelectCarType}
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
            rows="10"></textarea>
        </div>

        {/* 렌터정보 */}
        <StRenterInfoWrapper>
          <div className="infoWrapper_nickname">
            <h1>Owner 정보</h1>
          </div>
          <div className="infoWrapper_personal">
            <img src={userInfo.profileImage} alt="userimg" loading="lazy" />
            <div className="infoWrapper_personal__info">
              <p className="name">{userInfo.name}</p>
              <div className="infoWrapper_personal__info__wrapper">
                <div className="infoWraps">
                  <div className="infoWraps__email"></div>
                  <p>{userInfo.email}</p>
                </div>
                <div className="infoWraps">
                  <div className="infoWraps__phone"></div>
                  <p>{userInfo.phone || userInfo.tel}</p>
                </div>
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

        <button>등록</button>
        <StyledContainer />
      </form>
    </StVehicleRegister>
  );
};

export default VehicleRegister;

const StVehicleRegister = styled.div`
  width: 800px;
  margin: auto;
  form {
    margin: 0 auto;
    width: 100%;
    .onchange__imgbox {
      width: 100%;
      height: 430px;
      border-radius: 12px;
      margin-top: 56px;
      position: relative;
      text-align: center;
      overflow: hidden;
      margin: auto;
      background-color: gainsboro;
      .imgbox_text {
        width: 100%;
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
      margin-bottom: 80px;
      display: flex;
      justify-content: space-between;
      margin: auto;
      width: 100%;
      .input__box {
        width: 100%;
      }
      label {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 21px;
        display: block;
      }
      input {
        width: 98%;
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
      width: 100%;
      margin: 60px auto;
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
      margin: 50px auto;
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
      width: 100%;
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
    margin-bottom: 80px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin: auto;
    form {
      margin: 0 auto;
      width: 100%;
      .onchange__imgbox {
        width: 100%;
        height: 430px;
        border-radius: 12px;
        margin-top: 56px;
        position: relative;
        text-align: center;
        overflow: hidden;
        margin: auto;
        .imgbox_text {
          width: 100%;
        }
      }
      .imgbox {
        width: 100%;
        height: 48px;
        text-align: center;
        margin: 0 auto;
      }
      .input__top {
        padding-top: 50px;
        display: flex;
        margin-bottom: 80px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 100%;
        .input__box {
          width: 100%;
        }
        input {
          width: 98%;
        }
      }
      .price_box {
        width: 100%;
        margin: 60px auto;
      }
      table {
        width: 100%;
        height: 150px;
        margin: auto;
      }
      .desc {
        width: 100%;
        margin: 50px auto;
      }
      .location {
        position: relative;
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    margin: auto;
    form {
      margin: 0 auto;
      width: 100%;
      .onchange__imgbox {
        width: 100%;
        .imgbox_text {
          width: 100%;
        }
      }
      .imgbox {
        width: 100%;
        height: 48px;
        text-align: center;
        margin: 0 auto;
      }
      .input__top {
        margin-bottom: 80px;
        justify-content: space-between;
        margin: auto;
        width: 100%;
        .input__box {
          width: 100%;
        }
        input {
          width: 98%;
        }
      }
      .price_box {
        width: 100%;
        margin: 60px auto;
      }
      table {
        width: 100%;
        height: 150px;
        margin: auto;
      }
      .desc {
        width: 100%;
      }
      .location {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
  }
`;

const StRenterInfoWrapper = styled.div`
  width: 100%;
  margin: 80px auto;
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
        .infoWraps {
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
    }
    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
    }
  }
  @media (max-width: 767px) {
    .infoWrapper_personal {
      justify-content: center;
      &__info {
        &__wrapper {
          display: flex;
          flex-direction: column;
          .infoWraps {
            display: flex;
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
              margin-left: 0px;
              background-position: bottom;
            }
          }
        }
      }
      p {
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
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
