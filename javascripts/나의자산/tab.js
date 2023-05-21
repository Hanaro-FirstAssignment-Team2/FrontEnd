$(document).ready(function () {
  var tab = $(".tab li");

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


$(document).ready(function () {
  var tab = $(".tab2 li");

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
