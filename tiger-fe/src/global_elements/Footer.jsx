// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import { FaGithub, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import logo from "../assets/ta,iger_white.png";

const Footer = () => {
  return (
    <StFooter>
      <div className="footer_top">
        <div className="section1">
          <div className="logo">
            <img src={logo} alt="taigerLogo" />
          </div>
          <div className="member">
            <div className="member_FE">
              <span>FE</span> : 심채운, 권익현
            </div>
            <div className="member_BE">
              <span>BE</span> : 손성우, 정윤혁, 최준우
            </div>
            <div className="member_DS">
              <span>UI/UX</span> : 허지연
            </div>
          </div>
        </div>

        {/* <div className="section2">
          <h2>이용안내</h2>
          <div className="info">
            <div className="policy">이용약관</div>
            <div className="personal_info">개인정보처리방침</div>
          </div>
        </div>

        <div className="section3">
          <h2>고객지원</h2>
          <div className="help">
            <div className="guide">이용가이드</div>
            <div className="question">1:1문의</div>
          </div>
        </div> */}
      </div>

      <div className="link">
        <div className="github">
          <a
            href="https://github.com/orgs/practicalProject8-A-5/repositories"
            target="_blank"
            rel="noopener noreferrer">
            <FaGithub className="git_ico" />
          </a>
        </div>

        <div className="instagram">
          <a
            href="https://www.instagram.com/ta_iger_hh5"
            target="_blank"
            rel="noopener noreferrer">
            <FaInstagramSquare className="instagram_ico" />
          </a>
        </div>

        <div className="facebook">
          <a
            href="https://www.facebook.com/profile.php?id=100086498673434"
            target="_blank"
            rel="noopener noreferrer">
            <FaFacebook className="facebook_ico" />
          </a>
        </div>
      </div>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  width: 100%;
  height: 526px;
  padding: 120px 0 0 246px;
  box-sizing: border-box;
  background-color: #000;
  color: #fff;
  .footer_top {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 120px;
    display: flex;
    gap: 290px;
    .section1 {
      .logo {
        margin-bottom: 40px;
      }
      .member {
        font-size: 24px;
        line-height: 33px;
        font-weight: 500;
        color: #ffffff;
        .member_FE {
          margin-top: 5px;
          span {
            font-weight: 500;
            font-size: 22px;
          }
        }
        .member_BE {
          margin-top: 5px;
          span {
            font-weight: 500;
            font-size: 22px;
          }
        }
        .member_DS {
          margin-top: 5px;
          span {
            font-weight: 500;
            font-size: 22px;
          }
        }
      }
    }

    .section2 {
      width: 230px;
      h2 {
        font-weight: 500;
        font-size: 28px;
        line-height: 44px;
        color: #ffffff;
        margin-bottom: 32px;
        padding-top: 20px;
      }
      .info {
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #ffffff;
        .policy {
          cursor: pointer;
          margin-bottom: 16px;
          transition: all 0.4s;
          :hover {
            font-size: 28px;
          }
        }
        .personal_info {
          cursor: pointer;
          transition: all 0.4s;
          :hover {
            font-size: 28px;
          }
        }
      }
    }

    .section3 {
      h2 {
        font-weight: 600;
        font-size: 28px;
        line-height: 44px;
        color: #ffffff;
        margin-bottom: 32px;
        padding-top: 20px;
      }
      .help {
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #ffffff;
        .guide {
          cursor: pointer;
          margin-bottom: 16px;
          transition: all 0.4s;
          :hover {
            font-size: 28px;
          }
        }
        .question {
          cursor: pointer;
          transition: all 0.4s;
          :hover {
            font-size: 28px;
          }
        }
      }
    }
  }

  .link {
    display: flex;
    align-items: center;
    gap: 10px;
    .github {
      width: 32px;
      height: 32px;
      margin-top: 16px;
      a {
        display: block;
        text-decoration: none;
        color: #fff;
        width: 32px;
        height: 32px;
        .git_ico {
          font-size: 32px;
        }
      }
    }

    .instagram {
      width: 32px;
      height: 32px;
      margin-top: 16px;
      a {
        display: block;
        text-decoration: none;
        color: #fff;
        .instagram_ico {
          font-size: 32px;
        }
      }
    }

    .facebook {
      margin-top: 16px;
      a {
        display: block;
        text-decoration: none;
        color: #fff;
        width: 32px;
        height: 32px;
        .facebook_ico {
          font-size: 32px;
        }
      }
    }
  }
`;
