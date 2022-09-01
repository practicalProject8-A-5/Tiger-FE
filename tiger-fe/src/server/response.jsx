const RESP = {
  //회원가입
  AUTH: {
    SIGN_UP_SUCCESS: {
      result: true,
      status: {
        code: 200,
        msg: "회원가입 완료.",
      },
    },
    SIGN_UP_FAIL: {
      result: false,
      status: {
        code: 400,
        msg: "회원가입 실패.",
      },
    },
    LOGIN_HEADER: {
      Authorization: "",
    },
    LOGIN_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully logged in.",
      },
    },
    LOGIN_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Not existing email or wrong password.",
      },
    },
    LOGOUT_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully logged out.",
      },
    },
  },

  // orner 차량 등록
  OWNER_CAR: {
    CREATE_SUCCESS: {
      result: "true",
      status: {
        code: "200",
        msg: "상품등록이 완료되었습니다.",
      },
    },
    CREATE_FAIL: {
      result: "false",
      status: {
        code: "400",
        msg: "상품등록이 실패되었습니다.",
      },
    },
    REATE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to create new post. Please login!",
      },
    },

    GET_SUCCESS: {
      result: "true",
      status: {
        code: "400",
        msg: "성공적으로 등록된 상품을 보여줍니다.",
      },
      output: [
        {
          vId: 1,
          vname: "Hyundai Kona",
          type: "소형",
          location: "경기도 고양시 덕양구 호국로 860",
          years: "2006",
          fuelType: "gas",
          passengers: 4,
          price: 3000,
          transmission: "auto",
          fuelEfficiency: "9",
          description: "판매dd",
        },
        {
          vId: 2,
          vname: "Hyundai Kona",
          type: "소형",
          location: "경기도 고양시 덕양구 호국로 860",
          years: "2006",
          fuelType: "gas",
          passengers: 4,
          price: 3000,
          transmission: "auto",
          fuelEfficiency: "9",
          description: "판매dd",
        },
        {
          vId: 3,
          vname: "Hyundai Kona",
          type: "소형",
          location: "경기도 고양시 덕양구 호국로 860",
          years: "2006",
          fuelType: "gas",
          passengers: 4,
          price: 3000,
          transmission: "auto",
          fuelEfficiency: "9",
          description: "판매dd",
        },
      ],
    },
    GET_FAIL: {
      result: false,
      status: {
        code: 400,
        msg: "상품 불러오기 실패했습니다.",
      },
    },
    EDIT_SUCCESS: {
      result: true,
      status: {
        code: 200,
        msg: "상품 수정 성공",
      },
    },
    EDIT_FAIL: {
      result: false,
      status: {
        code: 400,
        msg: "상품 수정 실패",
      },
    },
    EDIT_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to edit post.",
      },
    },
    DELETE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        msg: "상품 삭제 성공",
      },
    },
    DELETE_FAIL: {
      result: false,
      status: {
        code: 400,
        msg: "상품 삭제 실패",
      },
    },
    DELETE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to edit post.",
      },
    },
  },
};
