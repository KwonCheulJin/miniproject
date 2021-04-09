"use strict";


const outBtn = document.querySelectorAll("input[type=button]"),
  thirdScroll = document.getElementById("third");

const save = localStorage.setItem("spaceCount", outBtn.length);
const data = localStorage.getItem("spaceCount")

//--------- 주차공간 버튼 ----------

outBtn.forEach(example => example.addEventListener("click", (event) => {
  const enter = event.target
  enter.classList.add("enter")
  enter.textContent = "출차"
  enter.value = "출차"
  const enterBtn = document.querySelectorAll(".enter")
  enterBtn.forEach(example => example.addEventListener("click", (event) => {
    const out = event.target
    out.textContent = "입차"
    out.value = "입차"
    thirdScroll.scrollIntoView({ behavior: "smooth" });
  }));
}));

//------- 주차공간 표시 --------- 

window.addEventListener("load", spaceCount);

function spaceCount() {
  const req = {
    count: data
  }
  // console.log(req)
  fetch("/")
    .then((res) => res.text())
    .then(res =>
      document.querySelector(".space-count").innerHTML = `${req.count}대 주차가능`)
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}
