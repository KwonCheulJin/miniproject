'use strict';


const carNumber = document.querySelector('#car-number'),
  secondScroll = document.getElementById('second'),
  firstForm = document.querySelector(".first-form"),
  input = firstForm.querySelector("#car-number"),
  signUpBtn = document.querySelector(".signUp"),
  overlay = document.querySelector(".modal-overlay"),
  popup = document.getElementById("popup-1"),
  seasonCarNum = document.getElementById("season-carNum"),
  seasonUserName = document.getElementById("season-name"),
  seasonPeriod = document.getElementById("season-period"),
  outTimeOutput = document.getElementById('out-time'),
  modalSignupBtn = document.getElementById("signUp-button"),
  closeBtn = document.querySelector(".close-btn"),
  enterBtn = document.querySelector('#enter-button'),
  seasonEnterBtn = document.querySelector('#season-enter-button'),
  outCarBtn = document.querySelector('#out-car'),
  inCarBtn = document.querySelector('#in-car'),
  parkingSpace = document.querySelector(".parking-space");

// 주차공간 차량 localStorage저장
const Parking_LS = "carNums"
const seasonParking_LS = "seasonCarNums"

let carNums = [];
let seasonUser = [];
const carNumData = [];
// .slice(0, -1);

const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);
// ------- 정기 사용자 localStorage저장 ----------
function deleteSeasonCarNum(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = btn.previousSibling
  outCarNum.innerText = span.innerText
  carNumData.push(outCarNum.innerText)
  outTimeOutput.value = today.toISOString().slice(0, 16);
  parkingSpace.removeChild(li);
  thirdScroll.scrollIntoView({ behavior: 'smooth' })
  const cleanCarNums = seasonUser.filter(function (carNum) {
    return carNum.id !== parseInt(li.id);
  });
  seasonUser = cleanCarNums
  saveSeasonCarNums()
}

function saveSeasonCarNums() {
  localStorage.setItem(seasonParking_LS, JSON.stringify(seasonUser));
}

function paintSeasonCarNum(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = seasonUser.length + 1;
  delBtn.innerText = "정기차";
  delBtn.addEventListener("click", deleteSeasonCarNum);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId
  parkingSpace.appendChild(li);
  const carNumObj = {
    text: text,
    id: newId
  }
  seasonUser.push(carNumObj);
  saveSeasonCarNums();
}

function loadSeasonCarNum() {
  const loadedSeasonCarNums = localStorage.getItem(seasonParking_LS);
  if (loadedSeasonCarNums !== null) {
    const parseSeasonCarNum = JSON.parse(loadedSeasonCarNums);
    parseSeasonCarNum.forEach(function (carNum) {
      paintSeasonCarNum(carNum.text);
    });
  }
}

loadSeasonCarNum();

// ------- 일반 사용자 localStorage저장 ----------
function deleteCarNum(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = btn.previousSibling
  outCarNum.innerText = span.innerText
  carNumData.push(outCarNum.innerText)
  outTimeOutput.value = today.toISOString().slice(0, 16);
  parkingSpace.removeChild(li);
  thirdScroll.scrollIntoView({ behavior: 'smooth' })
  const cleanCarNums = carNums.filter(function (carNum) {
    return carNum.id !== parseInt(li.id);
  });
  carNums = cleanCarNums
  saveCarNums()
}

function saveCarNums() {
  localStorage.setItem(Parking_LS, JSON.stringify(carNums));
}

function paintCarNum(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = carNums.length + 1;
  delBtn.innerText = "출차";
  delBtn.addEventListener("click", deleteCarNum);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId
  parkingSpace.appendChild(li);
  const carNumObj = {
    text: text,
    id: newId
  }
  carNums.push(carNumObj);
  saveCarNums();
}

function inCar(event) {
  event.preventDefault();
  const carNumValue = input.value;
  paintCarNum(carNumValue);
}


function loadCarNum() {
  const loadedcarNums = localStorage.getItem(Parking_LS);
  if (loadedcarNums !== null) {
    const parseCarNum = JSON.parse(loadedcarNums);
    parseCarNum.forEach(function (carNum) {
      paintCarNum(carNum.text);
    });
  }
}

loadCarNum();


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


function insert() {
  const req = {
    carNum: carNumber.value,
    inTime: new Date()
  };
  // console.log(req)
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
        const carNumValue = input.value;
        paintCarNum(carNumValue);
        alert(res.msg);
        carNumData.push(res.carNum);
        secondScroll.scrollIntoView({ behavior: 'smooth' })
        carNumber.value = '';
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

// ---------- 정기권 정보전달 ----------
seasonEnterBtn.addEventListener("click", seasonInsert);


function seasonInsert() {
  const req = {
    carNum: carNumber.value,
    inTime: new Date()
  };
  // console.log(req)
  fetch("/seasoninsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.season) {
        const carNumValue = input.value;
        paintSeasonCarNum(carNumValue);
        alert(res.msg);
        carNumData.push(res.seasonCarNum);
        secondScroll.scrollIntoView({ behavior: 'smooth' })
        carNumber.value = '';
        inCar()
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

// ---------- 주차공간 화면이동 ---------

outCarBtn.addEventListener("click", () => {
  secondScroll.scrollIntoView({ behavior: 'smooth' })
})

inCarBtn.addEventListener("click", () => {
  firstScroll.scrollIntoView({ behavior: 'smooth' })
})

// ---------- 회원가입 전송 ---------

modalSignupBtn.addEventListener("click", signUp);

function signUp() {
  const req = {
    seasonCarNum: seasonCarNum.value,
    seasonUserName: seasonUserName.value,
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
        alert("회원가입이 완료되었습니다.");
        seasonCarNum.value = "";
        seasonUserName.value = "";
        seasonPeriod.value = "";
        modalToggl();
      } else if (res.empty) {
        alert(res.msg)
      } else if (res.carNumForm) {
        alert(res.msg)
      } else if (res.carNum) {
        alert(res.msg)
      } else if (res.emptyName) {
        alert(res.msg)
      } else if (res.emptyPeriod) {
        alert(res.msg)
      }
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}


