$(function () {
    /*初期表示*/
    $('.js-toggle').hide();
    $('.js-toggle').eq(0).show();
    $('.nav-item').eq(0).addClass('is-active');
    /*クリックイベント*/
    $('.nav-item').each(function () {
        $(this).on('click', function () {
            var index = $('.nav-item').index(this);
            $('.nav-item').removeClass('is-active');
            $(this).addClass('is-active');
            $('.js-toggle').fadeOut();
            $('.js-toggle').eq(index).fadeIn();
        });
    });

    //ページトップに戻るボタン
    var topBtn = $('#page-top');    
    topBtn.hide();
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});