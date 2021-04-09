'use strict';


const carNumber = document.querySelector('#car-number'),
  secondScroll = document.getElementById('second'),
  firstForm = document.querySelector(".first-form"),
  signUpBtn = document.querySelector(".signUp"),
  overlay = document.querySelector(".modal-overlay"),
  popup = document.getElementById("popup-1"),
  seasonCarNum = document.getElementById("season-carNum"),
  seasonName = document.getElementById("season-name"),
  seasonPeriod = document.getElementById("season-period"),
  modalSignupBtn = document.getElementById("signUp-button"),
  closeBtn = document.querySelector(".close-btn"),
  enterBtn = document.querySelector('#enter-button'),
  insertBtn = document.querySelectorAll("input[type=button]"),
  changeP = document.querySelectorAll("div>span");

//------ 회원가입 창 ---------

function modalToggl() {
  popup.classList.toggle("open");
  firstForm.classList.toggle("hide");
}

overlay.addEventListener("click", modalToggl);
signUpBtn.addEventListener("click", modalToggl);
closeBtn.addEventListener("click", modalToggl);

//----- 차량번호 전달 ------

enterBtn.addEventListener("click", insert);

//----- 차량번호 등록 -------

enterBtn.addEventListener("click", () => {
  if (carNumber.value === "") {
    alert("차량 번호를 등록하세요")
  } else {
    secondScroll.scrollIntoView({ behavior: 'smooth' })
    carNumber.value = '';
    changeP.forEach((value) => {
      value.classList.add("car-in");
    })
  }
})

//------ 출차, 입차 변경에 따라 차량번호 등록 ------

const carNumData = localStorage.getItem("carNumber")

insertBtn.forEach(example => example.addEventListener("click", (event) => {
  const enter = event.target
  if (enter.value === "입차") {
    document.querySelector(".car-in").innerHTML = `${carNumData}`
  } else {
    document.querySelector(".car-in").innerHTML = ""
  }
}));


//------ 차량번호전달 ------

function insert() {
  const req = {
    carNumber: carNumber.value,
    inTime: new Date()
  };
  localStorage.setItem("carNumber", carNumber.value);
  console.log(req)
  fetch("/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log(JSON.stringify(req));
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

// ---------- 회원가입 ---------

modalSignupBtn.addEventListener("click", () => {
  if (seasonCarNum.value === "") {
    alert("차량 번호를 등록하세요");
  } else if (seasonName.value === "") {
    alert("이름을 등록하세요");
  } else if (seasonPeriod.value === "") {
    alert("기간을 선택하세요");
  } else modalSignupBtn.addEventListener("click", modalToggl);
})

// ---------- 회원가입 전송 ---------

modalSignupBtn.addEventListener("click", signUp);

function signUp() {
  const req = {
    seasonCarNumber: seasonCarNum.value,
    seasonName: seasonName.value,
    seasonPeriod: seasonPeriod.value
  };
  // localStorage.setItem("seasonCarNumber", seasonCarNum.value);
  console.log(req)
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log(JSON.stringify(req));
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}



