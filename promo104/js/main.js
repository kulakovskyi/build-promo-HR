var playBtn = document.querySelector(".girl__main-wheel-btn"), wheel = document.querySelector(".girl__main-wheel-reel"),
    tries = document.querySelector(".try-number"), triesFull = document.querySelector(".girl__main-left-try"),
    overlay = document.querySelector(".girl__overlay"), popupFirst = document.querySelector(".girl__firstWin"),
    popupFirstBtn = document.querySelector(".girl__firstWin-btn"),
    popupSecond = document.querySelector(".girl__secondWin"), rules = document.querySelector(".girl__rules"),
    overflow = document.querySelector("body"), wrapper = document.querySelector(".girl"),
    firstSpeach = document.querySelector(".first-speach"), secondSpeach = document.querySelector(".second-speach"),
    thirdSpeach = document.querySelector(".third-speach"), speechList = [firstSpeach, secondSpeach, thirdSpeach],
    SPEECH_ANIMATION_INTERVAL = 5e3, triesCounter = 0,
    speechAnimationId = (playBtn.addEventListener("click", function () {
        (0 === triesCounter ? runFirstRotation : runSecondRotation)()
    }), setInterval(fleepSpeech, SPEECH_ANIMATION_INTERVAL)), currentSpeech = firstSpeach;

function fleepSpeech() {
    showSpeech(currentSpeech = currentSpeech === firstSpeach ? secondSpeach : firstSpeach)
}

function runFirstRotation() {
    wheel.classList.add("reel-rotation-first"), playBtn.classList.remove("pulse-btn"), playBtn.style.transform = "scale(0.95)", playBtn.style.cursor = "default", wrapper.style.pointerEvents = "none", setTimeout(function () {
        doAfterFirstRotation()
    }, 6500), triesCounter++
}

function doAfterFirstRotation() {
    displayPopup(popupFirst), wrapper.style.pointerEvents = "auto", overflow.style.overflow = "hidden", clearInterval(speechAnimationId), setTimeout(function () {
        playBtn.classList.add("pulse-btn"), playBtn.style.transform = "scale(1)", playBtn.style.cursor = "pointer"
    }, 1200)
}

function showSpeech(e) {
    speechList.forEach(function (e) {
        return e.classList.add("hide")
    }), e.classList.remove("hide")
}

function runSecondRotation() {
    wheel.classList.add("reel-rotation-second"), playBtn.classList.remove("pulse-btn"), playBtn.style.transform = "scale(0.95)", playBtn.style.cursor = "default", overflow.style.overflow = "hidden", wrapper.style.pointerEvents = "none", setTimeout(function () {
        doAfterSecondRotation()
    }, 6500), triesCounter++
}

function doAfterSecondRotation() {
    displayPopup(popupSecond), wrapper.style.pointerEvents = "auto"
}

function displayPopup(e) {
    overlay.classList.remove("opacity-overlay"), e.classList.remove("hide")
}

popupFirstBtn.addEventListener("click", function () {
    wheel.classList.remove("reel-rotation-first"), wheel.style.background = 'url("img/wheel_2.png") no-repeat 0 0/contain', showSpeech(thirdSpeach), overlay.classList.add("opacity-overlay"), popupFirst.classList.add("hide"), overflow.style.overflow = "unset"
});

(function () {
    var url = new URL(window.location.href);
    var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2'];
    var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

    if (url.searchParams.has('redirectUrl')) {
        var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

        if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
            //если ссылка в ссылка redirectUrl корректная
            localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
        }
    } /////////


    params.forEach(function (param) {
        if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
    });
    linkParams.forEach(function (linkParam) {
        if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });
    window.addEventListener('click', function (e) {
        var link,
            parent = e.target.closest('a');

        if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
            return;
        }

        parent && (e.preventDefault(),
            localStorage.getItem("redirectUrl")
                ? link = new URL(localStorage.getItem("redirectUrl"))
                : (link = new URL(parent.href),
                    affid = localStorage.getItem('affid'),
                    cpaid = localStorage.getItem('cpaid'),
                affid && cpaid && (link.pathname = '/' + affid + '/' + cpaid)), params.forEach(function (param)
        {
            url.searchParams.has(param) && link.searchParams.set(param, localStorage.getItem(param));
        }), document.location.href = link);
    });
})();