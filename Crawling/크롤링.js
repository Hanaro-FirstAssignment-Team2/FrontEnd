const fs = require("fs");

const axios = require("axios"); //특정  URL  삽입 시 URL html 태그 가지고
const cheerio = require("cheerio");
var scanf = require('scanf');



// HTML 코드를 가지고 오는  함수
const getHTML = async(keyword) => {
  try{
    return await axios.get("https://search.naver.com/search.naver?where=news&ie=UTF-8&query=" + encodeURI(keyword)) //""안에는 URL 삽입
  }catch(err) {
    console.log(err);
  }
}

 // 파싱 함수
const parsing = async (keyword) => {
   
  const html = await getHTML(keyword)
  const $ = cheerio.load(html.data);// 가지고 오는 data load
  const $titlist = $(".news_area");

  let informations = [];  

  $titlist.each((idx,node) => {
    const title = $(node).find(".news_tit").text();  

    if ($(node).find(".info_group > a:nth-child(3)").attr('href')!=undefined){

    informations.push({
      title: $(node).find(".news_tit:eq(0)").text(), // 뉴스제목 크롤링
      link: $(node).find(".info_group > a:nth-child(3)").attr('href') // url 링크 크롤링     
      
    })

  }

    if(informations.length>5){
      return false;
    }

    var file = keyword+".json";

    fs.open(file, 'w', function(err, fd){
            if(err) throw err;
      
    });    

    fs.writeFileSync(keyword+".json", JSON.stringify(informations));
    console.log(keyword + " 파일 생성 완료");
    
  }); //for문과 동일
  
  console.log(informations.length);
  return informations;
}

parsing("미국 금리");
parsing("fed");
parsing("환율");
parsing("nasdaq");
parsing("미중 무역전쟁");
parsing("주식");
