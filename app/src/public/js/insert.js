'use strict';

const carNumber = document.querySelector('#car-number'),
  secondScroll = document.getElementById('second'),
  insterBtn = document.querySelector('#button');
// console.log(secondScroll)
insterBtn.addEventListener("click", insert);
insterBtn.addEventListener("click", () => {
  secondScroll.scrollIntoView({ behavior: 'smooth' })
  carNumber.value = '';
})

function insert() {
  const req = {
    carNumber: carNumber.value
  };
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