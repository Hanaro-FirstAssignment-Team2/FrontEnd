/* 지수정보 */
/* KOSDAQ */

/* jQuery를 사용하여 오픈 API에 대한 AJAX 요청을 생성하고 주식 시장 지수 정보를 검색 */

$(document).ready(function () { /* jQuery 함수 내부의 코드가 웹 페이지의 로딩이 완료될 때 실행 */
    let name = "금융"; //키워드를 금융으로 설정 (name이라는 변수를 선언하고 "금융"이라는 값을 할당해 원하는 주식 시장 지수를 지정하는 API 요청의 매개변수로 사용됨)

    // Open API
    $.ajax({ /* AJAX 요청을 생성하는 jQuery 함수로 요청에 대한 다양한 설정을 포함하는 객체를 매개변수로 받음 */
      type: "GET", /* GET 요청임을 지정, 지정된 URL에서 데이터를 검색하는 데 사용됩 */
      url: "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&resultType=json&pageNo=1&numOfRows=1&idxNm=" +
        name, /* API 요청을 위한 URL을 지정, URL은 API 엔드포인트, 서비스 키, 결과 유형(JSON), 페이지 번호, 행 수 및 idxNm 매개변수의 값으로 name 변수가 포함됨, 지정된 이름에 해당하는 주식 시장 지수 정보를 검색 */
      data: {}, /* 요청과 함께 추가 데이터를 전송하는 데 사용되는 빈 객체임 이 경우 추가 데이터는 전송되지 않음 */
      success: function (response) { /* 요청이 성공한 경우 실행되는 콜백 함수로 응답 매개변수는 API에서 반환한 데이터를 포함 */
        let kosdaq = response["response"]["body"]["items"]["item"]; /* API 응답에서 KOSDAQ 지수에 해당하는 주식 시장 지수 데이터를 검색, 응답 데이터는 중첩된 객체 속성을 통해 액세스됨 */
        let kosdaqTableBody = $("#kosdaq-table-body"); /* jQuery를 사용하여 ID가 "kosdaq-table-body"인 요소를 선택하고 검색된 데이터가 표시될 테이블 본문인 kosdaqTableBody 변수에 할당 */

        for (let i = 0; i < kosdaq.length; i++) { /* KOSDAQ 지수의 주식 시장 지수 데이터가 포함된 kosdaq 배열을 순회하는 for문 */
          let mise = kosdaq[i]; /* mise 객체에서 지수 분류, 종가 및 등락률과 같은 관련 데이터를 추출 */
          let kosdaq_title = mise["idxCsf"]; //지수분류명 : 지수의 분류명칭
          let kosdaq_jongga = mise["clpr"]; //종가 : 정규시장의 매매시간, 종료시까지 형성되는 최종가격
          let kosdaq_rate = mise["vs"]; //대비 : 전일 대비 등락


          let row = $("<tr></tr>"); /* 추출한 데이터를 표시하기 위해 jQuery를 사용하여 HTML 요소(테이블 행과 셀)를 동적으로 생성 */

          let titleCell = $("<td></td>").text("KOSDAQ");
          let jonggaCell = $("<td></td>").text(kosdaq_jongga);
          let rateCell = $("<td></td>").text(kosdaq_rate).addClass("rate");


          if (kosdaq_rate > 0) { /* kosdaq_rate 변수의 값에 따라 등락률이 양수인지 음수인지를 나타내기 위해 ▲ , ▼ 추가 */
            rateCell.prepend($("<b></b>").addClass("arrow-up").text("▲ "));
          } else if (kosdaq_rate < 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-down").text("▼ "));
          }


          row.append(titleCell, jonggaCell, rateCell); /* 생성된 HTML 요소는 kosdaqTableBody 요소에 추가되어 검색된 주식 시장 지수 데이터가 포함된 새로운 행이 테이블에 추가됨 */


          kosdaqTableBody.append(row);
        }
      },
    });
  });

  /* KOSPI 지수 */
  $(document).ready(function () {
    let name2 = "금융업";

    $.ajax({
      type: "GET",
      url: "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&resultType=json&pageNo=1&numOfRows=1&idxNm=" +
        name2,
      data: {},
      success: function (response) {
        let kospi = response["response"]["body"]["items"]["item"];
        let kospiTableBody = $("#kospi-table-body");

        for (let i = 0; i < kospi.length; i++) {
          let mise = kospi[i];
          let kospi_title = mise["idxCsf"];
          let kospi_jongga = mise["clpr"];
          let kospi_rate = mise["vs"];


          let row = $("<tr></tr>");

          let titleCell = $("<td></td>").text("KOSPI");
          let jonggaCell = $("<td></td>").text(kospi_jongga);
          let rateCell = $("<td></td>").text(kospi_rate).addClass("rate");


          if (kospi_rate > 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-up").text("▲ "));
          } else if (kospi_rate < 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-down").text("▼ "));
          }


          row.append(titleCell, jonggaCell, rateCell);


          kospiTableBody.append(row);
        }
      },
    });
  });

  /* KOSPI 200 지수 */
  $(document).ready(function () {
    let name3 = "코스피 200 금융 레버리지지수";

    $.ajax({
      type: "GET",
      url: "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getDerivationProductMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&numOfRows=1&pageNo=1&resultType=json&idxNm=" +
        name3,
      data: {},
      success: function (response) {
        let kospi200 = response["response"]["body"]["items"]["item"];
        let kospi200TableBody = $("#kospi200-table-body");

        for (let i = 0; i < kospi200.length; i++) {
          let kospi200mise = kospi200[i];
          let kospi200title = kospi200mise["idxNm"];
          let kospi200jongga = kospi200mise["clpr"];
          let kospi200rate = kospi200mise["vs"];


          let row = $("<tr></tr>");

          let titleCell = $("<td></td>").text("KOSPI 200");
          let jonggaCell = $("<td></td>").text(kospi200jongga);
          let rateCell = $("<td></td>").text(kospi200rate).addClass("rate");


          if (kospi200rate > 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-up").text("▲ "));
          } else if (kospi200rate < 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-down").text("▼ "));
          }


          row.append(titleCell, jonggaCell, rateCell);


          kospi200TableBody.append(row);
        }
      },
    });
  });