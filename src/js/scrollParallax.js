function scrollFooter(scrollY, heightFooter) {
  console.log(scrollY);
  console.log(heightFooter);

  if (scrollY >= heightFooter) {
    $("contacts").css({
      bottom: "0px",
    });
  } else {
    $("contacts").css({
      bottom: "-" + heightFooter + "px",
    });
  }
}

$(window).load(function () {
  var windowHeight = $(window).height(),
    footerHeight = $("contacts").height(),
    heightDocument =
      windowHeight + $(".content").height() + $("footer").height() - 20;

  // Definindo o tamanho do elemento pra animar
  $("#scroll-animate, #scroll-animate-main").css({
    height: heightDocument + "px",
  });

  // Definindo o tamanho dos elementos header e conteúdo
  $("promo").css({
    height: windowHeight + "px",
    "line-height": windowHeight + "px",
  });

  $(".wrapper-parallax").css({
    "margin-top": windowHeight + "px",
  });

  scrollFooter(window.scrollY, footerHeight);

  // ao dar rolagem
  window.onscroll = function () {
    var scroll = window.scrollY;

    $("#scroll-animate-main").css({
      top: "-" + scroll + "px",
    });

    $("promo").css({
      "background-position-y": 50 - (scroll * 100) / heightDocument + "%",
    });

    scrollFooter(scroll, footerHeight);
  };
});
