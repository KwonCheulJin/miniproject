"use strict";

const space = document.querySelectorAll("input[name='space']").length,
  outBtn = document.querySelectorAll("input[type=button]"),
  thirdScroll = document.getElementById("third");
// console.log(outBtn);

const values = [];
outBtn.forEach(example => example.addEventListener('click', (event) => {
  const enter = event.target
  enter.classList.add("enter")
  enter.textContent = "출차"
  enter.value = "출차"
  values.push(enter.value);
  // console.log(localStorage.setItem("enter", JSON.stringify(enter.value)));
  // let output = localStorage.getItem("enter");
  // let arr = JSON.parse(output);
  // console.log(arr)
  const enterBtn = document.querySelectorAll(".enter")
  enterBtn.forEach(example => example.addEventListener('click', (event) => {
    const out = event.target
    out.textContent = "입차"
    out.value = "입차"
    thirdScroll.scrollIntoView({ behavior: 'smooth' });
  }));
  // Save them fot later use
  localStorage.values = JSON.stringify(values);
  console.log(localStorage);
  // After clicking the button you can retrieve them back
  let oldValues = JSON.parse(localStorage.values);
  console.log(oldValues);

}));




// module.exports = checkSpace;