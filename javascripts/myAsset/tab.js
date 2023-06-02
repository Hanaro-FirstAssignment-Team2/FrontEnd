// 순자산 - 총자산 탭 메뉴 작동 함수
$(document).ready(function () {
  var tab = $(".tab li");

  // 해당 탭 메뉴를 누르면 아래와 같은 함수 실행
  tab.on("click", function () {
    var idx = $(this).index();
    var tab_con = $(this)
      .parents(".tab_group")
      .children(".tab_content")
      .eq(idx);

    $(this).addClass("on");
    $(this).siblings().removeClass("on");
    tab_con.addClass("on");
    tab_con.siblings(".tab_content").removeClass("on");
  });
});

// 순자산 - 총자산 탭 메뉴 내부의 각 상품별 탭 메뉴 작동 함수
$(document).ready(function () {
  var tab = $(".tab2 li");

  // 해당 탭 메뉴를 누르면 아래와 같은 함수 실행
  tab.on("click", function () {
    var idx = $(this).index();
    var tab_con = $(this)
      .parents(".tab_group")
      .children(".tab_content2")
      .eq(idx);

    $(this).addClass("on");
    $(this).siblings().removeClass("on");
    tab_con.addClass("on");
    tab_con.siblings(".tab_content2").removeClass("on");
  });
});
