// eslint-disable-next-line

// /*global kakao*/

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled, { css } from "styled-components";
import ImgViewBox from "./ImgViewBox";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import email from "../../assets/registermail.png";
import phone from "../../assets/registerphone.png";
import OwnerKakaoMap from "./OwnerKakaoMap";
import { __ownerModiRegisterInfo } from "../../redux/modules/ownerModify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VehicleModify = () => {
  const navigate = useNavigate();

  //.env
  const serverApi = process.env.REACT_APP_SERVER;

  //userInfo
  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  // console.log(userInfo);

  const vid = useParams();
  // console.log(vid.id);
  const numVid = parseInt(vid.id);

  //vehicleInfo
  const VehicleInfo = useSelector(
    (state) => state.ownerModiRegisterInfoSlice.ownerModiRegisterInfo
  );

  //vehicle정보 불러오기 (리덕스)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__ownerModiRegisterInfo(numVid));
  }, []);

  //수정페이지 기본 정보 값
  useEffect(() => {
    setInputs({
      ...inputs,
      vbrand: VehicleInfo.vbrand,
      vId: VehicleInfo.vId,
      description: VehicleInfo.description,
      email: VehicleInfo.email,
      fuelEfficiency: VehicleInfo.fuelEfficiency,
      fuelType: VehicleInfo.fuelType,
      // location: VehicleInfo.location,
      oname: VehicleInfo.oname,
      passengers: VehicleInfo.passengers,
      price: VehicleInfo.price,
      profileImage: VehicleInfo.profileImage,
      tel: VehicleInfo.tel,
      transmission: VehicleInfo.transmission,
      type: VehicleInfo.type,
      vname: VehicleInfo.vname,
      years: VehicleInfo.years,
      // imageList: VehicleInfo.imageList,
    });
  }, [VehicleInfo]);

  const [inputs, setInputs] = useState(VehicleInfo);
  // console.log(inputs.transmission);

  // const imageList = VehicleInfo.imageList;
  // const locationInfo = VehicleInfo.location;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
    // console.log(value);
    // console.log(name);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    // defaultValues: {},
  } = useForm();

  // console.log(watch());

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

  // const default_value_fuelType = inputs.fuelType;
  // console.log(default_value_fuelType);
  //파일 상태관리 및 Array로 만들기 위해
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState();
  const [isShowImg, setIsShowImg] = useState(true);

  const changeImg = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setFileList(files);

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
  // console.log(address);

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
    // console.log("fullAddress:", fullAddress);
    // console.log("address:", address);
  };
  // console.log(address);

  // 임시 submit handler
  // console.log(inputs.vbrand);
  // console.log(inputs.vbrand)
  // console.log(inputs.vbrand)
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
    for (let i = 0; i < fileList.length; i++) {
      formData.append("imageList", fileList[i]);
    }

    for (let value of formData.values()) {
      // console.log("value:", value);
    }

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      // const jsonType = { "Content-Type": "application/json" };
      const multipartType = { "Content-Type": "multipart/form-data" };
      // const json = JSON.stringify(obj)
      await axios.put(`${serverApi}/vehicle/management/${numVid}`, formData, {
        headers: {
          multipartType,
          Authorization: userToken,
          RefreshToken: refreshToken,
        },
        // headers: jsonType,
        // Authorization: userToken,
        // RefreshToken: refreshToken,
      });
    } catch (err) {
      // console.log(err);
    }

    navigate(`/owner`);
  };

  // const onClickEditLocation = () => {
  //   // setAddress();
  //   setIsPopupOpen(!isPopupOpen);
  //   // setIsEditLocation(!isEditLocation);
  // };
  // const showMapHandler = () => {
  //   setShowMap(!showMap);
  // };
  // console.log("isEditLocation:", isEditLocation);
  // console.log("isEdit:", isEdit);
  // console.log("address:", address);
  return (
    <StVehicleModify>
      <form id="form" onSubmit={handleSubmit(onSubmit, watch)}>
        {/* //이미지 */}
        {/* <div className="onchange__imgbox">
          {!isEdit ? (
            <ModifyImgViewBox files={files} imageList={imageList} />
          ) : (
            <ImgViewBox files={files} imageList={imageList} />
          )}
        </div> */}
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
            // onClick={onClickEdit}
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
              defaultValue={inputs.vbrand}
              // defaultValue={vbrand}
              // value={inputs.vbrand || ""}
              name="vbrand"
              onChange={onchange}
              {...register("vbrand", {
                required: "브랜드명을 입력해주세요",
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
              onChange={onChange}
              defaultValue={inputs.vname || ""}
              // value={inputs.vname || ""}
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
              <td>
                <input
                  type="text"
                  id="years"
                  placeholder="연식"
                  // onChange={onChange}
                  defaultValue={inputs.years || ""}
                  // value={info.years || ""}
                  {...register("years", {
                    required: "연식을 입력해주세요",
                  })}
                />
              </td>
              <th>
                <label htmlFor="passengers">탑승 가능 인원</label>
              </th>
              <td>
                <input
                  type="text"
                  id="passengers"
                  placeholder="탑승자 수"
                  defaultValue={inputs.passengers || ""}
                  // value={info.passengers || ""}
                  {...register("passengers", {
                    required: "탑승자 수를 입력해주세요.",
                  })}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="fuelEfficiency">연비</label>
              </th>
              <td>
                <input
                  type="text"
                  id="fuelEfficiency"
                  placeholder="연비"
                  defaultValue={inputs.fuelEfficiency || ""}
                  // value={info.fuelEfficiency || ""}
                  {...register("fuelEfficiency", {
                    required: "연비를 입력해주세요.",
                  })}
                />
              </td>

              <th>연료</th>
              <td>
                <Controller
                  name="fuelType"
                  className="select"
                  rules={{ required: "필수로 선택하셔야합니다." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="연료 종류"
                      options={fueltypeOption}
                      // value={fueltypeOption.find(
                      //   (option) => option.label === inputs.fuelType
                      // )}
                      // value={fueltypeOption.find((c) => c.value === value)}
                      // onChange={(e) => e.target.value}
                    />
                  )}
                  control={control}
                  // defaultValue={inputs.fuelType || ""}
                />
              </td>
            </tr>
            <tr>
              <th>기어 변속</th>
              <td>
                <Controller
                  name="transmission"
                  className="select"
                  rules={{ required: "필수로 선택하셔야합니다." }}
                  render={({ field, value }) => (
                    <Select
                      {...field}
                      placeholder="변속기 종류"
                      options={transmissionOption}
                      // value={transmissionOption.filter(
                      //   (option) => option.label === inputs.transmission
                      // )}
                      // onChange={(value) => inputs.transmission.onChange(value)}
                    />
                  )}
                  control={control}
                  // defaultValue={inputs.transmission || ""}
                />
              </td>
              <th>차 종류</th>
              <td>
                <Controller
                  name="cartype"
                  className="select"
                  rules={{ required: "필수로 선택하셔야합니다." }}
                  render={({ field, value }) => (
                    <Select
                      {...field}
                      placeholder="차 종류"
                      options={cartypeOption}
                      // value={cartypeOption.filter(
                      //   (option) => option.label === inputs.type
                      // )}
                    />
                  )}
                  control={control}
                  // defaultValue={inputs.type || ""}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="desc">
          {/* <Controller name="desc" as={ParseTextarea} control={control} /> */}
          <textarea
            // name="description"
            defaultValue={inputs.description || ""}
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
            <img src={userInfo.profileImage} alt="userimg" />
            <div className="infoWrapper_personal__info">
              <p className="name">{inputs.oname}</p>
              <div className="infoWrapper_personal__info__wrapper">
                <div className="infoWrapper_personal__info__wrapper__email"></div>
                <a href="mailto:kwonih1020@gmail.com">
                  <p>{inputs.email}</p>
                </a>
                <div className="infoWrapper_personal__info__wrapper__phone"></div>
                <a href={inputs.tel}>
                  <p>{inputs.tel}</p>
                </a>
              </div>
            </div>
          </div>
        </StRenterInfoWrapper>

        {/* 위치 */}
        <div className="location">
          <h2>렌터지역</h2>
          <input
            // type="text"
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

        <div className="price" style={{ marginTop: 30 }}>
          <label htmlFor="price">가격</label>
          <input
            type="text"
            id="price"
            defaultValue={inputs.price || ""}
            placeholder="가격을 입력해주세요"
            {...register("price", {
              required: "가격을 입력해주세요",
            })}
          />
        </div>
        <button>수정하기</button>
      </form>
    </StVehicleModify>
  );
};

export default VehicleModify;

const StVehicleModify = styled.div`
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
        color: #000;
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
              color: #000;
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
