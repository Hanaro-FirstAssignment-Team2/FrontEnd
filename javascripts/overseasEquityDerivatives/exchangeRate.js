/* 환율 정보 */
const api_key = "pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D";

let countryList = ["US", "JP", "CN", "EU", "GB", "RU", "VN", "IN", "HK"]
let countryName = ["미국", "일본", "중국", "유럽", "영국", "러시아", "베트남", "인도", "홍콩"]

const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = year + month + day;

// console.log(dateStr);

$(document).ready(function () {
  $.ajax({
    url: "https://apis.data.go.kr/1220000/retrieveTrifFxrtInfo/getRetrieveTrifFxrtInfo?aplyBgnDt=" + dateStr + "&weekFxrtTpcd=2&serviceKey=" + api_key,
    type: "GET",
    success: function (result) {
      let exchangeRateTableBody = $("#exchange-rate-table-body");
      $(result).find("item").each(function () {
        let dname = $(this).find("cntySgn").text(); //국가부호
        for (var i = 0; i < 9; i++) {
          if (dname == countryList[i]) {
            let titleCell = $("<td></td>").text("원/달러");
            let country = countryName[i]
            let currency = $(this).find("currSgn").text(); //통화부호
            let exchangeRate = parseFloat($(this).find("fxrt").text()).toFixed(2); //환율


            let newRow = $("<tr>");
            newRow.append($("<td>").text(country));
            newRow.append($("<td>").text(currency));

            let rateCell = $("<td>");
            let previousRate = exchangeRateTableBody.find("tr:last-child td:last-child").text();
            if (previousRate) {
              previousRate = parseFloat(previousRate);
              if (exchangeRate > previousRate) {
                rateCell.append($("<span>").text(exchangeRate).addClass("arrow-up"));
              } else if (exchangeRate < previousRate) {
                rateCell.append($("<span>").text(exchangeRate).addClass("arrow-down"));
              } else {
                rateCell.text(exchangeRate);
              }
            } else {
              rateCell.text(exchangeRate);
            }

            newRow.append(rateCell);
            exchangeRateTableBody.append(newRow);
          }
        }


      });
    },
    error: function () {
      console.log("정보를 불러오지 못했습니다");
    }
  });
});