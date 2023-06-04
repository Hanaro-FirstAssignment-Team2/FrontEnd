/* 뉴스 크롤링 */
/* XMLHttpRequest를 사용하여 JSON 데이터를 가져와 HTML 테이블에 보여줌 */

let xhttp = new XMLHttpRequest(); /* XMLHttpRequest 객체를 생성 */

xhttp.onreadystatechange = function () { /* readyState가 변경될 때마다 호출됨, readyState 4, status 200이면 요청 성공 */
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    jsonfunc(this.responseText); //this = xhttp     (jsonfunc(this.responseText); 또는 jsonfunc(xhttp.responseText);를 사용하여 요청의 응답 텍스트를 jsonfunc 함수에 전달)
    //		jsonfunc(xhttp.responseText); // 둘다 가능
  }
};
xhttp.open("GET", "fed.json", true); /* HTTP GET 방식으로 "fed.json" 파일을 비동기적으로 요청 */
xhttp.send(); /* 요청을 보냄 */

function jsonfunc(jsonText) { /* jsonText를 매개변수로 받아 JSON.parse를 사용하여 문자열을 JSON으로 변환 */
  let json = JSON.parse(jsonText); // String -> json으로 변환

  let txt = ""; /* 결과를 저장할 문자열 변수 */
  // 접근법 1
  for (i = 0; i < json.length; i++) { /* for문을 사용하여 JSON 데이터의 각 항목에 접근, 제목과 링크 값을 가져와 테이블 행으로 추가 */
    for (j = 0; j < 1; j++) {
      // key값 가져오기
      txt += ` 
          <tr>
            <td>${json[i].title}</td>
            <td><a href="${json[i].link}" target="_blank">&#8640;</a></td>
          </tr>
        `;
    }
    txt += "<br>";
  }
  document.getElementById("newsTableBody").innerHTML = txt; /* id가 "newsTableBody"인 요소의 내용을 txt로 설정하여 HTML 테이블에 결과를 보여줌 */
}