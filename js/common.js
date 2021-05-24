$(function(){
    const addTop = 150;
    let sectionAbout = $('#about');

$("nav ul li a,.back_to_top a,a").click(function(){
    console.log($(this.hash))
    let thisElem = $(this.hash);
    let offsetElem = thisElem.offset();
    console.log(offsetElem.top)
    $("html,body").stop();
    $("html,body").animate({scrollTop : offsetElem.top},1200);
    });

    //테블릿 화면 메뉴 버튼 효과
    $(".toggle_btn").click(function(){
        $("#gnb ul").addClass('on');
        });

    $(".toggle_btn").click(function(){
        $("#gnb ul").removeClass('on');
        });
    
    //스크롤 시 애니메이션 작동
    let wHeight = $(window).innerHeight();
    console.log("window height: "+wHeight)
    $(window).scroll(function(){
        let thisScrollTop = $(this).scrollTop();
        $("section").each(function(){
        let thisOffset = $(this).offset();
        if( thisOffset.top <= thisScrollTop + addTop && thisScrollTop < thisOffset.top + wHeight ){
            $(this).addClass("active");
        }
        });
    });
        //go_to_top 버튼 애니메이션 효과
        $(window).scroll(function(){
        console.log($(this).scrollTop())
        if($(this).scrollTop() == 0){
            $(".go_to_top").removeClass("on")
        }else{
            $(".go_to_top").addClass("on")
        }
        });
});