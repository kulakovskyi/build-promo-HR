
var playBtn = document.querySelector('.sam__main-wheel-btn'),
    playBtnText = document.querySelector('.sam__main-wheel-btn span'),
    wheel = document.querySelector('.sam__main-wheel-reel'),
    tries = document.querySelector('.try-number'),
    triesFull = document.querySelector('.sam__main-left-try'),
    overlay = document.querySelector('.sam__overlay'),
    popupFirst = document.querySelector('.sam__firstWin'),
    popupFirstBtn = document.querySelector('.sam__firstWin-btn'),
    popupSecond = document.querySelector('.sam__secondWin'),
    overflow = document.querySelector('body'),
    video = document.querySelector('.sam__main-video'),
    wrapper = document.querySelector('.sam'),
    totalTriesCounter = 2;
var triesCounter = 0;
playBtn.addEventListener('click', function () {
    if (triesCounter === 0) {
        runFirstRotation();
    } else {
        runSecondRotation();
    }
});

function updTriesCounter() {
    var cnt = totalTriesCounter - triesCounter;

    if (cnt === 2) {
        tries.innerText = "Imaš 2 vrtnje";
    } else if (cnt === 1) {
        tries.innerText = "Ostala ti je još 1 vrtnja";
    } else {
        tries.innerText = "Nemaš više vrtnji";
    }
}

function runFirstRotation() {
    wheel.classList.add('reel-rotation-first');
    playBtn.classList.remove('pulse-btn');
    playBtnText.classList.add('hide');
    playBtn.style.transform = 'scale(0.7)';
    playBtn.style.cursor = 'default';
    wrapper.style.pointerEvents = 'none';
    setTimeout(function () {
        if (window.innerWidth <= 500) {
            triesFull.style.opacity = '0';
        }
    }, 700);
    setTimeout(function () {
        doAfterFirstRotation();
    }, 6000);
    triesCounter++;
    updTriesCounter();
}

function doAfterFirstRotation() {
    wheel.style.transform = 'rotate(992deg)';
    wheel.classList.remove('reel-rotation-first');
    displayPopup(popupFirst);
    wrapper.style.pointerEvents = 'auto';
    overflow.style.overflow = 'hidden';
    setTimeout(function () {
        playBtn.classList.add('pulse-btn');
        playBtnText.classList.remove('hide');
        playBtn.style.transform = 'scale(1)';
        playBtn.style.cursor = 'pointer';
    }, 1200);
}

function runSecondRotation() {
    wheel.classList.add('reel-rotation-second');
    playBtn.classList.remove('pulse-btn');
    playBtnText.classList.add('hide');
    playBtn.style.transform = 'scale(0.7)';
    playBtn.style.cursor = 'default';
    overflow.style.overflow = 'hidden';
    wrapper.style.pointerEvents = 'none';
    setTimeout(function () {
        doAfterSecondRotation();
    }, 6000);
    triesCounter++;
    updTriesCounter();
}

function doAfterSecondRotation() {
    displayPopup(popupSecond);
    wrapper.style.pointerEvents = 'auto';
}

popupFirstBtn.addEventListener('click', function () {
    overlay.classList.add('opacity-overlay');
    popupFirst.classList.add('hide');
    overflow.style.overflow = 'unset';
});

function displayPopup(popup) {
    overlay.classList.remove('opacity-overlay');
    popup.classList.remove('hide');
}

var bgv = document.querySelector(".sam__main-video-bg");

if (window.innerWidth > 768) {
    bgv.poster = bgv.dataset.poster;
    var sources = bgv.getElementsByTagName("source");

    for (var i = 0; i < sources.length; ++i) {
        sources[i].src = sources[i].dataset.src;
    }
}

bgv.load();

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

