let name3 = "코스피 200 금융 레버리지지수";

$.ajax({
  type: "GET",
  url:
    "https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getDerivationProductMarketIndex?serviceKey=pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D&numOfRows=1&pageNo=1&resultType=json&idxNm=" +
    name3,
  data: {},
  success: function (response) {
    let kospi200 = response["response"]["body"]["items"]["item"];
    for (let i = 0; i < kospi200.length; i++) {
      let kospi200mise = kospi200[i];
      let kospi200title = kospi200mise["idxNm"];
      let kospi200jongga = kospi200mise["clpr"]; //종가(정규시장의 매매시간 종료시까지 형성되는 최종가격 )
      let kospi200rate = kospi200mise["vs"];
      console.log(kospi200title, kospi200jongga, kospi200rate);
    }
  },
});
