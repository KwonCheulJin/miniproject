"use strict";

const firstCard = document.querySelector(".card:nth-child(1)"),
  secondCard = document.querySelector(".card:nth-child(2)"),
  thirdCard = document.querySelector(".card:nth-child(3)"),
  outCarNum = document.querySelector("#out-car-number"),
  outTime = document.querySelector("#out-time"),
  dcSelect = document.getElementById("discount"),
  result = document.querySelector("#result"),
  nextBtn = document.querySelector("#next-button"),
  dcBtn = document.querySelector("#DC-button"),
  calBtn = document.querySelector("#cal-button"),
  firstScroll = document.getElementById("first");

//-------주차장 출구 버튼 ---------

nextBtn.addEventListener("click", () => {
  if (outCarNum.value === "" && outTime.value === "") {
    alert("차랑변호와 출차시간을 입력해주세요")
  } else {
    secondCard.classList.add("active");
    firstCard.classList.add("active");
  }

});

dcBtn.addEventListener("click", () => {
  thirdCard.classList.add("active2");
  secondCard.classList.remove("active");
})

calBtn.addEventListener("click", () => {
  if (result.value === "") {
    alert("결제금액이 없습니다.")
  } else {
    firstCard.classList.remove("active");
    firstScroll.scrollIntoView({ behavior: "smooth" })
  }
});

// --------- 출차 차량 확인 ------
nextBtn.addEventListener("click", outCar);

function outCar() {
  const req = {
    outCarNum: outCarNum.value,
    outTime: outTime.value
  }
  fetch("/out", {
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

// --------- 할인 파트 ------

dcBtn.addEventListener("click", () => {
  const val = dcSelect.options[dcSelect.selectedIndex].value;
  // console.log(val);
  dcSelect.addEventListener("change", discount(val));
})


function discount(val) {
  val = dcSelect.options[dcSelect.selectedIndex].value;
  console.log(val);
  const req = {
    dcSelect: val
  }
  console.log(req)
  fetch("/discount", {
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