import $ from "jquery";
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

  hamburger();
  scrollChange();
});
