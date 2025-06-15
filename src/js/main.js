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
      var headerHeight = $(".c-header-bar").outerHeight(); // ヘッダーの高さを取得
      var adjust = headerHeight + 20;

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
      if ($(this).scrollTop() > 800) {
        // 100pxスクロールしたら表示
        $("#js-page-top").addClass("--active");
      } else {
        $("#js-page-top").removeClass("--active");
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

  /*************************
   * スクロールしたらヘッダーを上から出す
   **************************/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll > 200) {
      $("#js-fixed-header").addClass("--active");
    } else {
      $("#js-fixed-header").removeClass("--active");
    }

    if (scroll > 1000) {
      $("#js-top-fixed-header").addClass("--active");
    } else {
      $("#js-top-fixed-header").removeClass("--active");
    }
  });

  /*************************
   * Illustのスライダー
   **************************/
  // if (window.matchMedia("(max-width: 767px)").matches) {
  //   const illustSlider = new Swiper("#js-swiper", {
  //     loop: false, //繰り返し指定
  //     spaceBetween: 15, //スライド感の余白
  //     slidesPerView: 1.2,
  //     centeredSlides: true, //スライダーの最初と最後に余白を追加せずスライドが真ん中に配置される
  //   });
  // }

  /*************************
   * アニメーション
   **************************/
  // タイトルアニメーション
  gsap.utils.toArray(".js-blurAnimation").forEach((target) => {
    gsap.to(target, {
      autoAlpha: 1,
      ease: "power2.out",
      duration: 1,
      filter: "blur(0px)",
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
      },
    });
  });

  // 単独でのfadeupアニメーション
  gsap.utils.toArray(".js-fadeUpSingle").forEach((target) => {
    gsap.to(target, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.5,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
      },
    });
  });

  // 複数要素のfadeupアニメーション
  let mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(".js-fadeUpTrigger").forEach((trigger) => {
      let target = trigger.querySelectorAll(":scope .js-fadeUpItem");
      // 上から
      gsap.to(target, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: target,
          start: "top 90%",
        },
      });
    });
  });
  // SP表示
  mm.add("(max-width: 767px)", () => {
    let targets = document.querySelectorAll(".js-fadeUpItem");
    targets.forEach((target) => {
      gsap.to(target, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: target,
          start: "top 90%",
        },
      });
    });
  });

  hamburger();
  scrollChange();
  smoothScroll();
  scrollTop();
});
