// #main_content > div.list_body.newsflash_body >
// ul.type06_headline > li:nth-child(1) > dl > dt:nth-child(2) > a

// div.list_body.newsflash_body
// ul
// <a>
// DOM 구조 예시
// body > main > div > section > ul > li > article > h2 > a
// import axios from "axios";
// import cheerio from "cheerio";
// import { onMount } from "svelte";
const axios = require("axios"); // axios를 import
const cheerio = require("cheerio"); // cheerio를 import
//const iconv = require("iconv-lite");
var text;

const getHtml = async (keyword) => {
  try {
    const response = await axios.get(
      "https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" +
        encodeURI(keyword)
    );
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};

// getHTML 함수 실행 후 데이터에서
// body > main > div > section > ul > li > article > h2 > a
// 에 속하는 제목을 titleList에 저장
getHtml("은행").then((html) => {
  let ulList = [];
  //const content = iconv.decode(html.data,'euc-kr');
  const $ = cheerio.load(html.data);
  // ul의 class값이 type06_headline인 것을 찾고 그 children노드를 bodyList에 저장
  const bodyList = $("ul.list_news").children("li");

  // bodyList를 순회하며 ulList에 dl > dt > a의 내용을 저장
  bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find("div.news_area a.news_tit").text().trim(),
      url: $(this).find("div.news_area a.news_tit").attr("href"),
    };
  });

  const data = ulList.filter((n) => n.title);
  console.log(data);
  const str = JSON.stringify(data);
  console.log(str);

  const fs = require("fs");
  if (fs.existsSync("./news.json")) {
    fs.unlink("./news.json", function (err) {
      if (err) {
        console.log("Error : ", err);
      }
    });
  }
  fs.writeFile("news.json", str, function (err) {
    console.log("뉴스 json파일 생성완료");
  });

  return data;
});
