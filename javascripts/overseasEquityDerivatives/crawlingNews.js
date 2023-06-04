/* 뉴스 크롤링 */
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    jsonfunc(this.responseText); //this = xhttp
    //		jsonfunc(xhttp.responseText); // 둘다 가능
  }
};
xhttp.open("GET", "fed.json", true);
xhttp.send();

function jsonfunc(jsonText) {
  let json = JSON.parse(jsonText); // String -> json으로 변환

  let txt = "";
  // 접근법 1
  for (i = 0; i < json.length; i++) {
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
  document.getElementById("newsTableBody").innerHTML = txt;
}