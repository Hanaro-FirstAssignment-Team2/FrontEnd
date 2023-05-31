api_key =
  "pU1MzzPLAHvlki6lv%2FJhqyTwdI7PQyi%2BWg62j5Hn9q4etzDWYhC%2BQo7YdAdiUglkcf%2BducizzXUHgveXqXxtNg%3D%3D";

$(document).ready(function () {
  $.ajax({
    url:
      "https://apis.data.go.kr/1220000/retrieveTrifFxrtInfo/getRetrieveTrifFxrtInfo?aplyBgnDt=20230530&weekFxrtTpcd=2&serviceKey=" +
      api_key,
    type: "GET",
    success: function (result) {
      //1원을 기준으로 환율 -> 유로
      $(result)
        .find("item")
        .each(function () {
          let ename = $(this).find("cntySgn").text();
          if (ename == "EU") {
            let emoney = $(this).find("currSgn").text();
            let eres = $(this).find("fxrt").text();
            console.log(ename, emoney, eres);
          }
        });
    },
  });
});
