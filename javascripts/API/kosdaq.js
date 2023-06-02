let name = "금융"; //코스닥
$.ajax({
  type: "GET",
  url:
    "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&resultType=json&pageNo=1&numOfRows=1&idxNm=" +
    name,
  data: {},
  success: function (response) {
    let kosdaq = response["response"]["body"]["items"]["item"];
    for (let i = 0; i < kosdaq.length; i++) {
      let mise = kosdaq[i];
      let kosdaq_title = mise["idxCsf"];
      let kosdaq_jongga = mise["clpr"]; //종가(정규시장의 매매시간 종료시까지 형성되는 최종가격 )
      let kosdaq_rate = mise["vs"];

      document.getElementById("kosdaqdata").innerHTML = kosdaq_rate;
      console.log(kosdaq_title, kosdaq_jongga, kosdaq_rate);
    }
  },
});
