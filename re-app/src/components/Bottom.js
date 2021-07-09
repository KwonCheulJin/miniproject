import React from 'react'

export const Bottom = () => {
  return (
    <div className="container">
      <section id="third">
        <div class="content">
          <h2>주차장 출구</h2>
          <div class="third-container">
            <div class="card">
              <div class="calculater">
                <h3>차량번호입력</h3>
                <div class="out-car-number">
                  <p id="out-car-number">CarNumber</p>
                </div>
                <h3>출차시간</h3>
                <div class="inputBox">
                  <input id="out-time" type="datetime-local" placeholder="DateTime" />
                </div>
                <div id="out" class="inputBox">
                  <p id="next-season-button">정기차</p>
                  <p id="next-button">일반</p>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="calculater">
                <h3>할인코드입력</h3>
                <div class="inputBox">
                  <select id="discount" name="DC-code">
                    <option value="" selected>할인코드</option>
                    <option value="nationalMerit">국가유공자</option>
                    <option value="disablePerson">장애인</option>
                    <option value="transfer">환승사용자</option>
                    <option value="market">전통시장이용</option>
                  </select>
                </div>
                <div class="payment-method">
                  <h3>결제 방법</h3>
                  <div id="payment-method" class="inputBox">
                    <p id="cash">현금</p>
                    <p id="credit-card">카드</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="payment">
                <h3>결제 금액</h3>
                <div class="payment-result">
                  <p id="result">Payment</p>
                </div>
                <div id="payment-button" class="inputBox">
                  <p class="cal-button">결제</p>
                  <p class="cal-button2">결제</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
