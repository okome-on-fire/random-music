$(function() {
    let countjoy = 0;
    let countdam = 0;
    const joyTracks = 146;
    const damTracks = 147;

    // 曲数分の配列準備
    var Arrayjoy = new Array(joyTracks);
    for( let s=0; s < (joyTracks - 1); s++ ){
        Arrayjoy[s] = s;
    }
    var Arraydam = new Array(damTracks);
    for( let s=0; s < (damTracks - 1); s++ ){
        Arraydam[s] = s;
    }

    // 数字ランダム入れ替え
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i = 0 | i - 1) {
            let j = 0 | Math.random() * (i + 1);
            var swap = arr[i];
            arr[i] = arr[j];
            arr[j] = swap;
        }
    }

    // 入れ替え
    shuffle(Arrayjoy);
    shuffle(Arraydam);

    // リセットかける
    $('#reset').on('click',function(){
        // 入れ替え
        shuffle(Arrayjoy);
        shuffle(Arraydam);
        countjoy = 0;
        countdam = 0;
        $('.tx-remaining').text("リセットしました");
    });

    // ランダム選曲
    $('#submit').on('click',function(){
        var i = 0;

        var model = $('input[name=model]:checked').val();
        switch (model) {
            // JOYSOUND
            case 'joy':
            var modelJson = $.getJSON('data/joy.json');
            var modelName = 'JOYSOUND';
            // 全曲で終わったら
            if( countjoy == joyTracks ){
                shuffle(Arrayjoy);
                countjoy = 0;
            }
            i = Arrayjoy[countjoy];
            countjoy++;
            $('.tx-remaining').text("残り" + (joyTracks - countjoy) + "曲");
            break;

            // DAM
            case 'dam':
            var modelJson = $.getJSON('data/dam.json');
            var modelName = 'DAM';
            // 全曲で終わったら
            if( countdam == damTracks ){
                shuffle(Arraydam);
                countdam = 0;
            }
            i = Arraydam[countdam];
            countdam++;
            $('.tx-remaining').text("残り" + (damTracks - countdam) + "曲");
            break;
        }

        modelJson // json読み込み開始
        .done(function(data){ // jsonの読み込みに成功した時
            //　機種名表示
            $('.tx-model-result').text(modelName);
            // 曲番号
            $('.tx-number-result').text(data[i].number);

            // チェック入ってたら曲名も表示
            if($('#song-title-check').prop('checked') == true) {
                $('.tx-title-result').text(data[i].title);
                var tweet = '歌う曲は「' + data[i].title　+ '(' + data[i].number + ')」です';
            }
            else {
                $('.tx-title-result').text('〇〇〇〇');
                var tweet = '歌う曲の番号は「' + data[i].number + '」です';
            }
        $('.btn-share-twitter').attr('href', 'http://twitter.com/intent/tweet?url=http://tsukiyoni.oteage.net/&text=' + tweet + '&hashtags=sideMランダム選曲ジェネレーター');
        })
    });

});

// 動きの部分
$(function() {
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

    // もっとみるボタン
    $(window).on('load', function(){
        listShow('.box-news ul','5');//デフォルトで表示される数を指定
        $("#js-btn-wrap .btn").on("click",function(){
            listShow('.box-news ul','10','#js-btn-wrap');//ボタンクリック後表示される数を指定
        })
    });
    function listShow(id,cnt,btn){
        var girls_list   = id + " .js-load:not(.active)";
        var girls_length = $(girls_list).length;
        var girls_total_cnt;
        if( cnt < girls_length ){
            girls_total_cnt = cnt;
        } else {
            girls_total_cnt = girls_length;
            $(btn).hide();
        }
        $(girls_list + ":lt(" + girls_total_cnt +")").addClass("active");
    }
});
