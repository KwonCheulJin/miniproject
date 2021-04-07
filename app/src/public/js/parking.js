"use strict";

const firstCard = document.querySelector(".card:nth-child(1)"),
  secondCard = document.querySelector(".card:nth-child(2)"),
  nextBtn = document.querySelector("#next-button"),
  calBtn = document.querySelector("#cal-button"),
  firstScroll = document.getElementById("first");

// console.log(firstScroll);

nextBtn.addEventListener("click", () => {
  secondCard.classList.add("active");
  firstCard.classList.add("active");
});

calBtn.addEventListener("click", () => {
  firstCard.classList.remove("active");
  secondCard.classList.remove("active");
  firstScroll.scrollIntoView({ behavior: "smooth" })
});
