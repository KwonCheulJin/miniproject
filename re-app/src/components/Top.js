import React from 'react'

export const Top = () => {
  return (
    <div className="container">
      <section id="first">
        <div className="signUp">
          <p id="open-signUp">SIGN UP</p>
        </div>
        <div className="out-car">
          <p id="out-car">주차장</p>
        </div>
        <div className="content">
          <h2>주차장 입구</h2>
          <div className="first-form">
            <form className="car-num-form">
              <h3>차량번호입력</h3>
              <div className="inputBox">
                <input id="car-number" type="text" placeholder="CarNumber" />
              </div>
              <div id="enter" className="inputBox">
                <p id="season-enter-button">정기권</p>
                <p id="enter-button">일반</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
