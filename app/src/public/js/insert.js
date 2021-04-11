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

//------ 출차, 입차 변경에 따라 차량번호 등록 ------

const carNumData = [];

insertBtn.forEach(example => example.addEventListener("click", (event) => {
  console.log(carNumData);
  const enter = event.target
  if (enter) {
    document.querySelector(".car-in").innerHTML = `${carNumData[carNumData.length - 1]}`
  }
}));

insertBtn.forEach(example => example.addEventListener("click", (event) => {
  const enter = event.target
  if (enter.value === "출차") {
    document.querySelector(".car-in").innerHTML = "";
    outCarNum.innerHTML = `${carNumData[carNumData.length - 1]}`
  }

}));

//------ 차량번호전달 ------

function insert() {
  const req = {
    carNum: carNumber.value,
    inTime: new Date()
  };
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
      if (res.season) {
        alert(res.msg);
        carNumData.push(res.seasonCarNum);
        secondScroll.scrollIntoView({ behavior: 'smooth' })
        carNumber.value = '';
        changeP.forEach((value) => {
          value.classList.add("car-in");
        })
      } else if (res.success) {
        alert(res.msg);
        carNumData.push(res.carNum);
        secondScroll.scrollIntoView({ behavior: 'smooth' })
        carNumber.value = '';
        changeP.forEach((value) => {
          value.classList.add("car-in");
        })
      } else if (res.empty) {
        alert(res.emptyMsg)
      } else {
        alert(res.msg)
      }
    })
    .catch((err) => {
      console.error("등록 중 에러 발생");
    });
}

// ---------- 회원가입 전송 ---------

modalSignupBtn.addEventListener("click", signUp);

function signUp() {
  const req = {
    seasonCarNum: seasonCarNum.value,
    seasonUserName: seasonName.value,
    seasonPeriod: seasonPeriod.value
  };
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
        alert("회원가입이 완료되었습니다.")
      } else {
        alert(res.msg);
      }
      modalSignupBtn.addEventListener("click", modalToggl)
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}



