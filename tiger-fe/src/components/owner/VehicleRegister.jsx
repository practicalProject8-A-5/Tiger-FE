import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";
import ImgViewBox from "./ImgViewBox";
// import RESP from "../../server/response";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

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

    if (files.length !== 0) {
      setIsShowImg(false);
    }
  };

  //location
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const RegisterPostCodeStyle = {
    display: "block",
    position: "absolute",
    top: "25.8%",
    width: "400px",
    height: "400px",
    border: "1px solid black",
    zIndex: "1",
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
        {/* location */}
        <input
          className="location_input"
          value={address}
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          onChange={onChangeHandler}
          placeholder="위치 or 주소"
        ></input>

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

        {/* model */}
        <div>
          <label htmlFor="model">model</label>
          <input
            type="text"
            id="model"
            placeholder="브랜드명"
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

        {/* vname */}
        <div>
          <label htmlFor="vname">vname</label>
          <input
            type="text"
            id="vname"
            placeholder="차종"
            {...register("vname", {
              required: "차종을 입력해주세요",
            })}
          />
          {errors.vname ? (
            <div className="error">{errors.vname.message}</div>
          ) : null}
        </div>

        {/* years */}
        <div>
          <label htmlFor="years">years</label>
          <input
            type="text"
            id="years"
            placeholder="연식"
            {...register("years", {
              required: "연식을 입력해주세요",
              validate: {
                pattern: /^[A-Za-z]+$/i,
              },
            })}
          />
          {errors.years ? (
            <div className="error">{errors.years.message}</div>
          ) : null}
        </div>

        {/* passengers */}
        <div>
          <label htmlFor="passengers">passengers</label>
          <input
            type="text"
            id="passengers"
            placeholder="탑승자 수"
            {...register("passengers", {
              required: "탑승자 수를 입력해주세요.",
            })}
          />
          {errors.passengers ? (
            <div className="error">{errors.passengers.message}</div>
          ) : null}
        </div>

        {/* price */}
        <div>
          <label htmlFor="price">price</label>
          <input
            type="text"
            id="price"
            placeholder="가격"
            {...register("price", {
              required: "가격을 입력해주세요.",
            })}
          />
          {errors.price ? (
            <div className="error">{errors.price.message}</div>
          ) : null}
        </div>

        {/* fuelEfficiency */}
        <div>
          <label htmlFor="fuelEfficiency">fuelEfficiency</label>
          <input
            type="text"
            id="fuelEfficiency"
            placeholder="연비"
            {...register("fuelEfficiency", {
              required: "연비를 입력해주세요.",
            })}
          />
          {errors.fuelEfficiency ? (
            <div className="error">{errors.fuelEfficiency.message}</div>
          ) : null}
        </div>

        {/* description */}
        <div>
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="description"
            placeholder="설명란"
            {...register("description", {
              required: "설명을 입력해주세요.",
            })}
          />
          {errors.description ? (
            <div className="error">{errors.description.message}</div>
          ) : null}
        </div>

        <Controller
          name="cartype"
          className="select"
          render={({ field }) => (
            <Select {...field} placeholder="차 타입" options={cartypeOption} />
          )}
          control={control}
          defaultValue=""
        />

        <Controller
          name="transmission"
          className="select"
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

        <Controller
          name="fueltype"
          className="select"
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
        <div>
          <input
            type="file"
            className="img"
            onChange={changeImg}
            multiple="multiple"
            accept="image/jpg, image/png, image/jpeg"
          />
          {!isShowImg ? <ImgViewBox files={files} /> : null}
          {/* <ImgViewBox files={files} /> */}
        </div>
        <input type="submit" />
      </form>
    </StVehicleRegister>
  );
};

export default VehicleRegister;

const StVehicleRegister = styled.div`
  /* background-color: pink; */
  .location_input {
    width: 300px;
    height: 50px;
  }
  div {
    margin: 10px 0;
    input {
      width: 300px;
      height: 50px;
    }
    label {
      margin-bottom: 5px;
      display: block;
    }
    .error {
      color: red;
      font-size: 13px;
    }
    .img {
      border: none;
      padding: 0;
    }
  }
`;
