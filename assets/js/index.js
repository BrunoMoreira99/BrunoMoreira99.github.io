"use strict";

$(document).ready(() => {
    const theme = getCookie('_theme');
    $('body').addClass(theme || 't--light');
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const gdpr_consent = getCookie('_gdpr');
        if (!gdpr_consent) {
            $('.gdpr-banner').slideDown({
                start: function () {
                    $(this).css({ display: 'flex' });
                }
            });
        }
    }, 500);

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });

    // Enable all tooltips.
    $('[data-toggle="tooltip"]').tooltip();

    // Handle dark mode toggle
    $('.dark-mode-toggler .nav-link').click(() => {
        if ($('body').hasClass('t--light')) {
            $('body').addClass('t--dark').removeClass('t--light');
            setCookie('_theme', 't--dark');
        } else {
            $('body').addClass('t--light').removeClass('t--dark');
            setCookie('_theme', 't--light');
        }
    });

    // Handle GDPR notice dismiss on click and scroll
    $('.gdpr-dismiss').click(() => {
        $('.gdpr-banner').slideUp();
        setCookie('_gdpr', true, 365);
    });

    $(window).scroll(() => {
        if ($('.gdpr-banner').is(":visible")) {
            $('.gdpr-dismiss').click();
        }
    });

    $('.fa-cookie').click(function () {
        if (!$(this).hasClass('fa-cookie')) return;
        const omnom = new Audio('assets/media/omnom.mp3');
        omnom.play();
        $(this).removeClass('fa-cookie').addClass('fa-cookie-bite');
        setTimeout(() => {
            $(this).removeClass('fa-cookie-bite').addClass('fa-cookie');
        }, 10000);
    });
});

function setCookie(name, value, days) {
    let expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
