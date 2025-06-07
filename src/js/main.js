import $ from "jquery";
import Swiper from "swiper/bundle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

$(function () {
  /*************************
   * ハンバーガーメニュー
   **************************/
  const hamburger = () => {
    const $hamburger = $(".js-hamburger");
    const $headerSp = $(".l-header-sp");
    const $headerLogo = $(".c-header-bar__logo");
    const $body = $("body");
    const $gnavLinks = $(".l-header-sp__inner a");
    let scrollPosition = 0;
    let isMenuOpen = false; // メニューが開いているかどうかを追跡するフラグを追加

    function openMenu() {
      $hamburger.addClass("--active");
      $headerSp.addClass("--active");
      $headerLogo.addClass("--active");
      scrollPosition = $(window).scrollTop();
      $body.css("overflow", "hidden");
      isMenuOpen = true; // メニューが開いたことを記録
    }

    function closeMenu() {
      $hamburger.removeClass("--active");
      $headerSp.removeClass("--active");
      $headerLogo.removeClass("--active");
      $body.css("overflow", "auto");
      $(window).scrollTop(scrollPosition);
      isMenuOpen = false; // メニューが閉じたことを記録
    }

    $hamburger.on("click", function () {
      if (isMenuOpen) {
        // フラグを使用してメニューの状態をチェック
        closeMenu();
      } else {
        openMenu();
      }
    });

    $gnavLinks.on("click", closeMenu);
  };

  /*************************
   * スクロールしたら背景を白く
   **************************/
  const scrollChange = () => {
    const $header = $(".c-header-bar"); // ヘッダー要素のセレクタ
    const scrollThreshold = 100; // スクロール閾値（px）

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > scrollThreshold) {
        $header.addClass("--scrolled"); // スクロールされた状態のクラスを追加
      } else {
        $header.removeClass("--scrolled"); // スクロールされていない状態のクラスを削除
      }
    });
  };

  /*************************
   * スムーススクロール
   **************************/
  const smoothScroll = () => {
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();

      var target = $(this.hash);
      var speed = 500;
      var windowWidth = $(window).width(); // 画面幅を取得

      if (windowWidth >= 768) {
        // 768px以上の場合（PC表示とみなす）
        var headerHeight = $(".c-header-bar").outerHeight(); // ヘッダーの高さを取得
        var adjust = headerHeight;
      } else {
        var adjust = 0;
      }

      $("html, body").animate(
        {
          scrollTop: target.offset().top - adjust, // ヘッダーの高さ分、スクロール位置を調整
        },
        speed,
        "swing"
      );
    });
  };

  /*************************
   * TOPへ戻るボタン
   **************************/
  const scrollTop = () => {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        // 100pxスクロールしたら表示
        $("#js-page-top").fadeIn();
      } else {
        $("#js-page-top").fadeOut();
      }
    });
    // ボタンがクリックされたときにスムーズスクロールを実行
    $("#js-page-top").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0, // ページの最上部へスクロール
        },
        800
      ); // 800ミリ秒（0.8秒）かけてスクロール
      return false; // デフォルトの動作（リンク遷移など）をキャンセル
    });
  };

  // Illustのスライダー
  if(window.matchMedia("(max-width: 767px)").matches){
    const illustSlider = new Swiper("#js-swiper", {
      loop: false, //繰り返し指定
      spaceBetween: 15, //スライド感の余白
      slidesPerView: 1.2,
      centeredSlides: true, //スライダーの最初と最後に余白を追加せずスライドが真ん中に配置される
    });
  }


  hamburger();
  scrollChange();
  smoothScroll();
  scrollTop();
});
