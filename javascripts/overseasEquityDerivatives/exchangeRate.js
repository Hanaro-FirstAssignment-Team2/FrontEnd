/* 환율 정보 */
/* API에서 환율 데이터를 검색하고 HTML 테이블에 보여줌 */

const api_key = "pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D"; /* api_key 변수는 데이터에 액세스하는 데 필요한 API 키를 저장 */

let countryList = ["US", "JP", "CN", "EU", "GB", "RU", "VN", "IN", "HK"] /* 국가 코드 */
let countryName = ["미국", "일본", "중국", "유럽", "영국", "러시아", "베트남", "인도", "홍콩"] /* 해당 국가 이름 */

const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = year + month + day; /* 현재 날짜를 "YYYYMMDD" 형식으로 저장 */

// console.log(dateStr);

$(document).ready(function () { /* 웹 페이지가 로드된 후 내부 코드 실행 */
  $.ajax({ /* 지정된 URL을 사용하여 API에 AJAX 요청을 보냄 */
    url: "https://apis.data.go.kr/1220000/retrieveTrifFxrtInfo/getRetrieveTrifFxrtInfo?aplyBgnDt=" + dateStr + "&weekFxrtTpcd=2&serviceKey=" + api_key, /* dateStr과 api_key가 포함되어 지정된 날짜의 환율 정보를 검색 */
    type: "GET",
    success: function (result) { /* AJAX 요청이 성공했을 때 호출됨, 응답을 나타내는 result 매개변수를 받음 */
      let exchangeRateTableBody = $("#exchange-rate-table-body"); /* 환율 데이터가 표시될 ID가 "exchange-rate-table-body"인 요소를 선택 */
      $(result).find("item").each(function () {
        let dname = $(this).find("cntySgn").text(); //국가부호 (dname 변수: "cntySgn" 요소에서 얻은 국가 코드를 저장)
        for (var i = 0; i < 9; i++) { /* for문 내에서 응답의 각 "item" 요소를 반복 */
          if (dname == countryList[i]) { /* dname이 countryList 배열의 국가 코드와 일치하는지 확인, 일치하는 경우 국가 이름, 통화 코드 및 환율을 포함한 환율 데이터가 추출 */
            let titleCell = $("<td></td>").text("원/달러");
            let country = countryName[i]
            let currency = $(this).find("currSgn").text(); //통화부호
            let exchangeRate = parseFloat($(this).find("fxrt").text()).toFixed(2); //환율


            let newRow = $("<tr>"); /* <tr> 요소를 사용해 새로운 테이블 행(newRow)이 생성되고 국가 이름과 통화 코드가 테이블 셀로 추가됨 */
            newRow.append($("<td>").text(country));
            newRow.append($("<td>").text(currency));

            let rateCell = $("<td>"); /* rateCell` 변수는 환율 값을 저장하는 데 사용됨, 테이블에서 이전 환율 값을 확인하여 상승 화살표, 하락 화살표 또는 환율만 표시해야 할지를 결정 */
            let previousRate = exchangeRateTableBody.find("tr:last-child td:last-child").text(); /* newRow가 exchangeRateTableBody에 추가되어 검색한 환율 데이터가 HTML 테이블에 새로운 행으로 추가됨 */
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
    error: function () { /*  AJAX 요청에 오류가 있는 경우 error 함수 호출 */
      console.log("정보를 불러오지 못했습니다");
    }
  });
});