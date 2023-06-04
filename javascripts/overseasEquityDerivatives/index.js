/* 지수정보 */
/* KOSDAQ */
$(document).ready(function () {
    let name = "금융"; //키워드를 금융으로 설정

    // Open API
    $.ajax({
      type: "GET",
      url: "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&resultType=json&pageNo=1&numOfRows=1&idxNm=" +
        name,
      data: {},
      success: function (response) {
        let kosdaq = response["response"]["body"]["items"]["item"];
        let kosdaqTableBody = $("#kosdaq-table-body");

        for (let i = 0; i < kosdaq.length; i++) {
          let mise = kosdaq[i];
          let kosdaq_title = mise["idxCsf"]; //지수분류명 : 지수의 분류명칭
          let kosdaq_jongga = mise["clpr"]; //종가 : 정규시장의 매매시간, 종료시까지 형성되는 최종가격
          let kosdaq_rate = mise["vs"]; //대비 : 전일 대비 등락


          let row = $("<tr></tr>");

          let titleCell = $("<td></td>").text("KOSDAQ");
          let jonggaCell = $("<td></td>").text(kosdaq_jongga);
          let rateCell = $("<td></td>").text(kosdaq_rate).addClass("rate");


          if (kosdaq_rate > 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-up").text("▲ "));
          } else if (kosdaq_rate < 0) {
            rateCell.prepend($("<b></b>").addClass("arrow-down").text("▼ "));
          }


          row.append(titleCell, jonggaCell, rateCell);


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