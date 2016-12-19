// Created by Hivan Du 2015(Siso brand interactive team).
"use strict";
var app = {
    preload:function(){
        var that       = this,
            firstImg   = {   //this is load images for object
                path        : [ "scene01", "scene02" ],
                arrName     : [],
                loadAmounts : 0
            };
        //This method is to load first images
        (function( firstImg ){
            for(var x = 0; x <= firstImg.path.length - 1 ; x++){
                var imgDomArr = document.getElementsByClassName(firstImg.path[x])[0].getElementsByTagName('img');
                for( var j = 0; j < imgDomArr.length; j++ ){
                    firstImg.arrName.push( imgDomArr[j].src );
                }
            }
            if( firstImg.arrName != [] )
            {
                for(var i = 0; i < firstImg.arrName.length; i++ ){
                    var img = new Image();
                    img.src = firstImg.arrName[i];
                    img.onload = function(){
                        firstImg.loadAmounts++;
                        if( firstImg.loadAmounts == firstImg.arrName.length ){
                            app.main();
                            console.log('app started success...firstImg.loadAmounts is :' + firstImg.loadAmounts );
                        }
                    };
                }
            }
        }( firstImg ));
    },
    main: function (){
        var imgSliderBtn2  = $('.imgSliderbtn2'),
            imgSliderPrev2 = $('.imgSliderbtn2 .sliderPrev'),
            imgSliderNext2 = $('.imgSliderbtn2 .sliderNext'),
            imgIsleder2    = $('#imgIsleder2');
        // New a object for mySwiper
        app.mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',
            parallax : true,
            noSwiping: false,
            // init
            onInit: function (){
                $('.swiper-slide').eq(0).addClass('active');
            },
            onTransitionStart: function (swiper) {
                if( swiper.activeIndex == 2 ){ $('.gril-warp').show(); }  else { $('.gril-warp').hide(); }
                if( swiper.activeIndex == 0 ){ $('.firstNo').hide(); $('.maozhua').hide();   }  else { $('.firstNo').show(); }
                // show imgSlider btn in scene03
                if(swiper.activeIndex == 3){ imgSliderBtn2.show(); imgIsleder2.show(); if( scene04ImgIndex == 0){ imgSliderPrev2.hide() } }else{ imgIsleder2.hide(); imgSliderBtn2.hide(); }
                if(swiper.activeIndex == swiper.slides.length - 1){ $('.maozhua').hide(); }else{ $('.lastNo').show(); }
            },
            onTransitionEnd: function (swiper) {
                $('.swiper-slide').removeClass('active')
                    .eq(swiper.activeIndex).addClass('active');
            }

        });

        //点击登录qq 或者 微信 按钮
        $('.logQ,.logW').click(function(){
            //app.mySwiper.slideNext();
            //app.mySwiper.lockSwipeToPrev();  //禁止向上
        });
        // unlock Swipes
        //app.mySwiper.unlockSwipes();
        // lock Swipes
        //app.mySwiper.lockSwipes();


        //this is scene04 images data
        var scene04ImgArr = [],
            scene04ImgArrLength = 11,
            scene04ImgIndex = 0;
        //push images data to an scene04ImgArr
        (function( scene04ImgArr,scene04ImgArrLength ){
            for(var i = 1; i <= scene04ImgArrLength; i++ ){
                var data = { content: 'assets/images/page4/model'+ i +'.png' }
                scene04ImgArr.push( data );
            }
        }(scene04ImgArr,scene04ImgArrLength));
        //scene04 Slider init
        var page4imgSlider = new iSlider({
            dom:document.getElementById('imgIsleder2'),
            data:scene04ImgArr,
            isLooping: 1,
            isAutoplay:1,
            isOverspread: 1,
            animateTime: 600,
            animateType: 'depth',
            onslidechange:function(Index){
                scene04ImgIndex = Index;
            }
        });
        //init imgSlider plugin
        if( page4imgSlider.initIndex===0 ){
            //imgSliderPrev2.hide();
        }

        imgSliderPrev2.on('touchend',function(){ page4imgSlider.slidePrev(); });
        imgSliderNext2.on('touchend',function(){ page4imgSlider.slideNext(); });

        //scene04 click btn-next event
        $('.scene04 .btn-next').on('touchend',function(){
            var type1 = $(this).siblings('.type1');
            var type2 = $(this).prev('.type2');
            var text = $(this).siblings('.text-warp');
            type1.hide();
            type2.show();
            text.hide();
            $(this).hide();
        });

        //click mp3 box
        $('.audio-logo').on("touchend", function(){
            $(this).toggleClass('active');
            if(!audio.paused){
                $(this).attr('src','assets/images/common/btn-musicoff.png');
                $('#audio')[0].pause();
            }else{
                $(this).attr('src','assets/images/common/btn-musicon.png');
                $('#audio')[0].play();
            }
        });

        //监听浏览器高度
        var WindowHeight = $("body").height();
        var WindowWidth = $("body").width();
        var WindowPoportion = WindowWidth / WindowHeight;
        var Poportion = 750 / 1150;
        if ( WindowPoportion >= Poportion ){
            console.log("高度太低,调整模式");
            $('.scene02 .people').css("width","6.8375rem");
            $('.scene07 .giftlist').css("top","9.25rem");
            $('.scene07 .miracletour').css("bottom","3.4%");
            $('.scene07 .btn-getgift').css("bottom","13%");
            $('.page4wrapper ul li').css({
                "width": "80%",
                "left":'10%'
            });
            $('.scene05 .model').css({
                "width": "7.35rem",
                "left" : "1.175rem"
            });
            $('.scene06 .model').css({
                "bottom": "-24%"
            });
            $('.userMapData-warp .userMapData').css({
                "width":"6.1375rem",
                "top"  :'1rem',
                "left":'2rem'
            });
            $('.userMapData-warp .pin').css({
                "top" :'0.9rem',
                "left":"7.3rem"
            });
        }

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();
            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    }
};

$(function (){
    // init app
    app.preload();
    //app.main();
});