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
  if (outTime.value === "") {
    alert("출차시간을 입력해주세요")
  } else {
    secondCard.classList.add("active");
    firstCard.classList.add("active");
  }
});

dcBtn.addEventListener("click", () => {
  thirdCard.classList.add("active2");
  secondCard.classList.remove("active");
})



// --------- 출차 차량 확인 ------
nextBtn.addEventListener("click", outCar);

function outCar() {
  const req = {
    carNum: carNumData[carNumData.length - 1],
    outTime: outTime.value,
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
      if (res.season) {
        alert(res.msg);
        secondCard.classList.remove("active");
        firstCard.classList.remove("active");
        outCarNum.innerHTML = "CarNumber"
        outTime.value = ""
        firstScroll.scrollIntoView({ behavior: "smooth" })
      }
      console.log(res);
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

// --------- 할인 파트 ------
const reAmount = [];

dcBtn.addEventListener("click", () => {
  const val = dcSelect.options[dcSelect.selectedIndex].value;
  // console.log(val);
  dcSelect.addEventListener("change", discount(val));
})


function discount(val) {
  val = dcSelect.options[dcSelect.selectedIndex].value;
  console.log(val);
  const req = {
    carNum: carNumData[carNumData.length - 1],
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
      if (res.merit) {
        result.innerHTML = res.result
        reAmount.push(res.result)
      } else if (res.person) {
        result.innerHTML = res.result
        reAmount.push(res.result)
      } else if (res.transfer) {
        result.innerHTML = res.result
        reAmount.push(res.result)
      } else if (res.market) {
        result.innerHTML = res.result
        reAmount.push(res.result)
      }
      result.innerHTML = res.result
      reAmount.push(res.result)
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

// --------- 결제 파트 ------
calBtn.addEventListener("click", payment);

function payment() {
  const outCar = carNumData[carNumData.length - 1];
  const pay = reAmount[reAmount.length - 1];
  console.log(outCar, pay)
  thirdCard.classList.remove("active2");
  firstCard.classList.remove("active");
  outCarNum.innerHTML = "CarNumber"
  outTime.value = ""
  alert(`${pay}가 결제되었습니다. ${outCar}님 이용해주셔서 감사합니다.`)
  firstScroll.scrollIntoView({ behavior: "smooth" })
  result.innerHTML = "Payment"
}