"use strict";

const firstCard = document.querySelector(".card:nth-child(1)"),
  secondCard = document.querySelector(".card:nth-child(2)"),
  thirdCard = document.querySelector(".card:nth-child(3)"),
  outCarNum = document.querySelector("#out-car-number"),
  outTime = document.querySelector("#out-time"),
  dcSelect = document.getElementById("discount"),
  result = document.querySelector("#result"),
  nextBtn = document.querySelector("#next-button"),
  finSeasonBtn = document.querySelector("#next-season-button"),
  dcBtn = document.querySelector("#DC-button"),
  cashBtn = document.querySelector("#cash"),
  cardBtn = document.querySelector("#credit-card"),
  calBtn = document.querySelector(".cal-button"),
  calBtn2 = document.querySelector(".cal-button2"),
  firstScroll = document.getElementById("first"),
  thirdScroll = document.getElementById("third");


//-------주차장 출구 버튼 ---------

nextBtn.addEventListener("click", () => {
  if (outTime.value === "") {
    alert("출차시간을 입력해주세요")
  } else {
    secondCard.classList.add("active");
    firstCard.classList.add("active");
  }
});

cashBtn.addEventListener("click", () => {
  thirdCard.classList.add("active2");
  secondCard.classList.remove("active");
})

cardBtn.addEventListener("click", () => {
  thirdCard.classList.add("active2");
  secondCard.classList.remove("active");
})
// ---------- 출차차량 정보전송 ---------
nextBtn.addEventListener("click", outCarInfo);

function outCarInfo() {
  const req = {
    carNum: carNumData[carNumData.length - 1],
    outTime: outTimeOutput.value
  };
  console.log(req, "outcarinfo");
  fetch("/outcarinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        // alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("등록 중 에러 발생");
    });
}

finSeasonBtn.addEventListener("click", outSeasonCarInfo);

function outSeasonCarInfo() {
  const req = {
    carNum: carNumData[carNumData.length - 1],
  };
  // console.log(req)
  fetch("/outseasoncarinfo", {
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
        firstScroll.scrollIntoView({ behavior: "smooth" })
        outTimeOutput.value = ""
        outCarNum.innerText = "CarNumber"
      }
    })
    .catch((err) => {
      console.error("등록 중 에러 발생");
    });
}

// --------- 할인 파트 ------
const reAmount = [];

// dcBtn.addEventListener("click", () => {
//   const val = dcSelect.options[dcSelect.selectedIndex].value;
//   // console.log(val);
//   dcSelect.addEventListener("change", discount(val));
// })

cashBtn.addEventListener("click", () => {
  const val = dcSelect.options[dcSelect.selectedIndex].value;
  // console.log(val);
  dcSelect.addEventListener("change", discount(val));
  const paymentResult = document.querySelector(".payment-result"),
    input = document.createElement("input"),
    paymentBtn = document.getElementById("payment-button");
  input.type = "text";
  input.className = "payment-cash";
  paymentResult.appendChild(input);
  paymentBtn.appendChild(calBtn);
  paymentBtn.removeChild(calBtn2);
  paymentCashSave();
})

function paymentCashSave() {
  const req = {
    method: cashBtn.id,
    outTime: outTimeOutput.value,
    dcSelect: dcSelect.options[dcSelect.selectedIndex].value,
  }
  console.log(req)
  fetch("/paymentcash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) console.log("OK");
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

cardBtn.addEventListener("click", () => {
  const val = dcSelect.options[dcSelect.selectedIndex].value;
  // console.log(val);
  dcSelect.addEventListener("change", discount(val));
  const paymentBtn = document.getElementById("payment-button");
  paymentBtn.appendChild(calBtn2);
  paymentBtn.removeChild(calBtn);
  paymentCardSave();
})

function paymentCardSave() {
  const req = {
    method: cardBtn.id,
    outTime: outTimeOutput.value,
    dcSelect: dcSelect.options[dcSelect.selectedIndex].value,
  }
  console.log(req)
  fetch("/paymentcard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) console.log("OK");
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

function discount(val) {
  val = dcSelect.options[dcSelect.selectedIndex].value;
  // console.log(val);
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
calBtn.addEventListener("click", paymentCash);
calBtn2.addEventListener("click", paymentCard);

function paymentCash() {
  const paymentResult = document.querySelector(".payment-result"),
    paymentInput = document.querySelector(".payment-cash");
  const outCar = carNumData[carNumData.length - 1];
  const pay = parseInt(reAmount[reAmount.length - 1]);
  const cash = parseInt(paymentInput.value);
  const smallChange = cash - pay;
  thirdCard.classList.remove("active2");
  firstCard.classList.remove("active");
  outCarNum.innerHTML = "CarNumber"
  outTime.value = "";
  alert(`${pay}가 결제되었습니다. 거스름돈 ${smallChange}원 입니다. ${outCar}님 이용해주셔서 감사합니다.`)
  paymentResult.removeChild(paymentInput)
  firstScroll.scrollIntoView({ behavior: "smooth" })
  result.innerHTML = "Payment"
  dcSelect.options[dcSelect.selectedIndex].value = "";

  // console.log(val);

}

function paymentCard() {
  const outCar = carNumData[carNumData.length - 1];
  const pay = reAmount[reAmount.length - 1];
  thirdCard.classList.remove("active2");
  firstCard.classList.remove("active");
  outCarNum.innerHTML = "CarNumber"
  alert(`${pay}가 결제되었습니다. ${outCar}님 이용해주셔서 감사합니다.`)
  firstScroll.scrollIntoView({ behavior: "smooth" })
  result.innerHTML = "Payment"
  dcSelect.options[dcSelect.selectedIndex].value = "";
}