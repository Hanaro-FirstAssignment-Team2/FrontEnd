let name2 = "금융업"; //코스피
$.ajax({
  type: "GET",
  url:
    "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&resultType=json&pageNo=1&numOfRows=1&idxNm=" +
    name2,
  data: {},
  success: function (response) {
    let kospi = response["response"]["body"]["items"]["item"];
    for (let i = 0; i < kospi.length; i++) {
      let mise = kospi[i];
      let kospi_title = mise["idxCsf"];
      let kospi_jongga = mise["clpr"]; //종가(정규시장의 매매시간 종료시까지 형성되는 최종가격 )
      let kospi_rate = mise["vs"];
      console.log(kospi_title, kospi_jongga, kospi_rate);
    }
  },
});
