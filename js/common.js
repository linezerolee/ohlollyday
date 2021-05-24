$(function(){
    const addTop = 150;
    //클릭 시, 해당 섹션 이동
    $("nav ul li a, .go_to_top a, .button").click(function(){
        //console.log($(this.hash))
        let thisElem = $(this.hash);
        let offsetElem = thisElem.offset();
        //console.log(offsetElem.top)
        $("html,body").stop();
        $("html,body").animate({scrollTop : offsetElem.top},1200);
        });

    //gnb 클릭 시, 호버 효과 고정 
    let menu = $('#gnb ul li')
    let contents = $('section');
    menu.click(function(x){
        x.preventDefault();
        $(this).addClass('menuline').siblings().removeClass('menuline');
        let idx = $(this).index();
        let section = contents.eq(idx);
        let sectionDistance = section.offset().top;
        $('html,body').stop().animate({scrollTop:sectionDistance},1200);
    });


    //테블릿 화면 메뉴 버튼 효과
    $(".toggle_btn").click(function(){
        if($("ul").hasClass('open')){
            $("ul").removeClass('open');
        }else {
            $("ul").addClass('open');
        }
       });
    
    //테블릿 화면 메뉴 클릭 시, 메뉴창 닫힘
    $('ul li a').click(function(){
        if($('ul').hasClass('open')){
            $('ul').removeClass('open');
        }
    })

    //스크롤 시 애니메이션 작동
    let wHeight = $(window).innerHeight();
    //console.log("window height: "+wHeight)
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
        //console.log($(this).scrollTop())
        if($(this).scrollTop() == 0){
            $(".go_to_top").removeClass("on")
        }else{
            $(".go_to_top").addClass("on")
        }
        });
});

//자바스크립트 //스크롤 이동 시, 메뉴 호버 효과 이동
'use strict';

const sectionIds = [
    '#intro',
    '#about',
    '#bestseller',
    '#products',
    '#stroy',
    '#campaign',
    '#issue',
    '#footer',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('menuline');
    selectedNavItem = selected;
    selectedNavItem.classList.add('menuline');
}
const observerOptions = {
    root : null,
    rootMargin : '0px',
    threshold : .3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=> {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});