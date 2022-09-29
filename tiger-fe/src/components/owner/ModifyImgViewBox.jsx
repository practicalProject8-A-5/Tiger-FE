import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaPlus, FaExchangeAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useCallback } from "react";
import { set } from "react-hook-form";

const ModifyImgViewBox = ({
  thum,
  setThum,
  imageList,
  preView,
  addImgList,
  setPreView,
  setAddImgList,
  deleteList,
  setDeleteList,
  setFileList,
  fileList,
  numVid,
}) => {
  const serverApi = process.env.REACT_APP_SERVER;
  console.log(thum);

  const onChageHandler = (e) => {
    const files = e.target.files;
    setFileList(Array.from(files));
    setFileList(files);
    const fileLists = Array.from(files);
    const urlList = fileLists.map((file) => URL.createObjectURL(file));

    console.log(fileLists);

    if (fileLists.length >= 2) {
      toast.error("한번에 한장만 등록이 가능합니다.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      setPreView([...preView]);
      setAddImgList([...addImgList]);
      // setFileList([...fileList]);
    } else if (preView.length === 5) {
      toast.error("등록은 5개까지만 가능합니다.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      setAddImgList([...addImgList]);
      // setFileList([...fileList]);
    } else {
      setPreView([...preView, ...urlList]);
      setAddImgList([...addImgList, ...fileLists]);
      // setFileList([...fileList, fileLists]);
    }
  };

  const deleteOnClick = (i, image) => {
    setPreView(preView.filter((el) => el !== image));
    setFileList([...fileList, image]);
    const blob = "blob";
    if (image.includes(blob)) {
      // console.log("포함되어있어요");
    } else {
      // setDeleteList([...deleteList]);
      setDeleteList([...deleteList, image]);
      // console.log("포함 안됨");
    }
    console.log(image);
    console.log(image.includes(blob));
  };

  // const [ThumPreView, setThumPreView] = useState([]);
  // console.log("ThumPreView:", ThumPreView);
  const [oldThum, setOldThum] = useState([]);
  const [newThum, setNewThum] = useState([]);

  const [changeThum, setChangeThum] = useState([]);
  // console.log("thum:", thum);
  // console.log("oldThum:", oldThum);
  // console.log("newThum:", newThum);

  const changeThumnail = (e) => {
    // setThum()
    const files = e.target.files;
    const fileLists = Array.from(files);
    const urlList = fileLists.map((file) => URL.createObjectURL(file));
    // console.log(files);
    // console.log(fileLists);
    // console.log(urlList);

    if (fileLists.length >= 2) {
      toast.error("한번에 한장만 등록이 가능합니다.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      setOldThum(oldThum);
      setNewThum(newThum);
      setThum(thum);
    } else {
      setOldThum([...oldThum, thum]);
      setNewThum(fileLists);
      setThum(urlList);
      thumSubmit([...oldThum, thum], fileLists);
      // thumSubmit(thum, fileLists);
    }
  };

  const thumSubmit = async (oldThum, newThum) => {
    console.log(oldThum);
    console.log(newThum);

    const formData = new FormData();
    formData.append("oldThumbnail", oldThum);
    // formData.append("newThumbnail", newThum);

    for (let i = 0; i < newThum.length; i++) {
      formData.append("newThumbnail", newThum[i]);
    }

    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      for (let value of formData.values()) {
        console.log(value);
      }

      // console.log(formData);
      // console.log(newThum);
      const multipartType = { "Content-Type": "multipart/form-data" };
      const resp = await axios.put(
        `${serverApi}/vehicle/thumbnail/${numVid}`,
        formData,
        {
          headers: {
            multipartType,
            Authorization: userToken,
            RefreshToken: refreshToken,
          },
        }
      );
      console.log("resp:", resp.data.output.newThumbnail[0]);
      // setChangeThum(resp.data.output.newThumbnail[0]);
      setThum(resp.data.output.newThumbnail[0]);
      console.log(thum);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(changeThum);

  console.log("thum:", thum);
  console.log("newThum:", newThum);
  console.log("oldThum:", oldThum);
  // console.log(Array.isArray(newThum));
  // console.log(Array.isArray(oldThum));

  useEffect(() => {
    // console.log(imageList);
    if (imageList !== undefined) {
      setPreView([...preView, ...imageList]);
    }
    // if(thum !== undefined){
    //   setOldThum([...oldThum])
    // }
  }, [imageList]);

  return (
    <StViewBox>
      <div className="thumnail">
        <img src={thum} alt="Thumnail" />
        {/* {thum &&
          thum.map((image) => {
            return <img src={image} alt="Thumnail" />;
          })} */}
        <div className="thumbox">대표사진</div>
        <label htmlFor="input_thum" className="btn" onChange={changeThumnail}>
          <input
            id="input_thum"
            type="file"
            className="img"
            multiple="multiple"
            accept="image/jpg, image/png, image/jpeg"
          />
          <FaExchangeAlt />
        </label>
      </div>

      <div className="sub">
        {preView &&
          preView.map((image, i) => {
            return (
              <div className="img_preview" key={i}>
                <img src={image} alt="" />
                <div className="sbtn" onClick={() => deleteOnClick(i, image)}>
                  <IoClose className="close" />
                </div>
              </div>
            );
          })}
        <label htmlFor="input_img" className="addimg" onChange={onChageHandler}>
          <input
            id="input_img"
            type="file"
            className="img"
            multiple="multiple"
            accept="image/jpg, image/png, image/jpeg"
          />
          <FaPlus />
        </label>
      </div>
    </StViewBox>
  );
};

export default ModifyImgViewBox;

const StViewBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .thumnail {
    width: 413px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    overflow: hidden;
    border-radius: 12px;
    .thumbox {
      color: #000;
      border: 2px solid #000;
      border-radius: 12px;
      font-weight: 400;
      font-size: 14px;
      padding: 7px 13px;
      position: absolute;
      background-color: pink;
      top: 15px;
      left: 15px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .sub {
    display: grid;
    grid-template-columns: repeat(2, 208px);
    grid-template-rows: repeat(3, 138px);
    column-gap: 8px;
    row-gap: 8px;
    .img_preview {
      border: 1px solid;
      box-sizing: border-box;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .sbtn {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 8px;
        right: 8px;
        border-radius: 50%;
        background-color: pink;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        .close {
          cursor: pointer;
        }
      }
    }
    .addimg {
      width: 206px;
      height: 136px;
      border: 1px solid;
      border-radius: 12px;
      background-color: #f2f2f2;
      text-align: center;
      line-height: 136px;
      font-size: 26px;
      cursor: pointer;
      input {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
      }
    }
  }
  .btn {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    background-color: skyblue;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    input {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;
