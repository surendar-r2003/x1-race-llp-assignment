// var pvadsPromise;
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

function scrollToDiv(articlecnt = false) {
    if (articlecnt == false) {
        var articleCount = document
            .getElementById("getShareData")
            .getAttribute("data-articleCount");
    } else {
        var articleCount = articlecnt;
    }

    if (articleCount == 0) {
        $("html, body").animate(
            {
                scrollTop: $("#comments").offset().top,
            },
            1000
        );
    } else {
        articleCount = articleCount - 1;
        $("html, body").animate(
            {
                scrollTop: $("#comments-" + articleCount).offset().top - 80,
            },
            500
        );
    }
}

function openSocialShare(site) {
    var link;

    var articleTitle = document
        .getElementById("getShareData")
        .getAttribute("data-articleTitle");
    var articleUrl = document
        .getElementById("getShareData")
        .getAttribute("data-articleUrl");

    if (site == "whatsapp") {
        link =
            "https://api.whatsapp.com/send?text=" +
            articleTitle +
            " --- " +
            articleUrl +
            "?utm_source%3Dwhatsapp%26utm_medium%3Dsocial%26utm_campaign%3Darticletop";
    } else if (site == "facebook") {
        link =
            "//www.facebook.com/sharer.php?u=" +
            articleUrl +
            "?utm_source%3Dfacebook%26utm_medium%3Dsocial%26utm_campaign%3Darticletop%26utm_content%3Dweb";
    } else if (site == "twitter") {
        link =
            "//twitter.com/intent/tweet?url=" +
            articleUrl +
            "?utm_source%3Dtwitter%26utm_medium%3Dsocial%26utm_campaign%3Darticletop%26utm_content%3Dweb&amp;text=" +
            articleTitle +
            "’&amp;via=pinkvilla";
    } else if (site == "reddit") {
        link =
            "https://reddit.com/submit?title=" +
            articleTitle +
            "&url=" +
            articleUrl +
            "&utm_source=reddit&utm_medium=social&utm_campaign=articletop&utm_content=web";
    } else if (site == "snapchat") {
        link =
            "https://snapchat.com/scan?attachmentUrl=" +
            articleUrl +
            "?utm_source%3Dsnapchat%26utm_medium%3Dsocial%26utm_campaign%3Darticletop%26utm_content%3Dweb%26snapchat=1";
    }

    var posTop = window.screen.height / 2 - 218;
    var posLeft = window.screen.width / 2 - 313;

    window.open(
        link,
        "sharer",
        "toolbar=0,status=0,width=626,height=256,top=" +
            posTop +
            ",left=" +
            posLeft
    );

    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    /*if (
        page == "regular-article" ||
        page == "photo-article" ||
        page == "video-article" ||
        page == "blog-article"
    ) {
        let data = {
            article_id: articleId,
        };
        $.ajax({
            url: "/ajax/post/view-count",
            type: "POST",
            data: data,
            dataType: "json",
            success: (response) => {},
            error: (error) => {
                console.log(error);
            },
        });
    }*/

    pvutils.loadScript(
        "https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js",
        null,
        false
    );
    pvutils.loadScript(
        "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
        null,
        false
    );
    // pvutils.loadScript("/assets/js/lscache.js?v=0.1", "lscache", false);
    //pvutils.loadScript('/assets/js/user-profile.bundle.js?v=0.1');
    if (typeof window.__pr_post_page_name === "undefined") {
        document.querySelectorAll(".login-item").forEach(function (el) {
            el.style.display = "none";
        });
        var btn1 = document.getElementById("top-side-nav");
        if (btn1) {
            btn1.addEventListener("click", () => {
                pvutils.showModal("side-menu");
            });
        }
        document.addEventListener(
            "click",
            function (event) {
                pvutils.hideModal("side-menu", event);
            },
            true
        );
        pvutils.loadScript(
            "/assets/js/section-bottom-content.js?v=0.1",
            "",
            false
        );
    } else {
        let topUserImage = document.getElementById("top-user-image");
        if (topUserImage && topUserImage.classList.contains("w-0")) {
            topUserImage.classList.remove("w-0");
        }
        let topUserImageDesktop = document.getElementById(
            "top-user-image-desktop"
        );
        if (
            topUserImageDesktop &&
            topUserImageDesktop.classList.contains("d-none")
        ) {
            topUserImageDesktop.classList.remove("d-none");
        }
        pvutils.loadScript(
            "/assets/js/user-profile.bundle.js?v=0.1",
            "",
            false
        );
    }
    //let pvadsScript = pvutils.loadScript('/assets/js/pvads.js?v=0.1');
    // let pvadsScript = pvutils.loadScript(
    //     "/assets/js/pvads.js?v=0.1",
    //     "",
    //     false,
    //     "head"
    // );

    pvutils.lazyloadImage();
    // setTimeout(() => {
    loadGTMComScore();
    if (page == "404") {
        //fireGoogleTagManager();
    }
    // }, 2000);
    // pvadsPromise = new Promise(function (resolve) {
    //     pvadsScript.onload = function () {
    //         resolve(true);
    //     };
    // });
    // if (pvutils.getUserDevice() !== "mobile") {
    //     pvadsPromise.then(function () {
    //         pvads.loadfirstAds();
    //     });
    // }
    pvadsPromise = new Promise(function (resolve) {

    setTimeout(() => {
      // let adpushupScript = pvutils.loadScript('https://cdn.adpushup.com/41682/adpushup.js', 'adpushup', false);
      // adpushupScript.setAttribute('data-cfasync', 'false');
      // adpushupScript.setAttribute('type', 'text/javascript');
      // adpushupScript.onload = function () {
      //   window.adpushup = window.adpushup || { que: [] };
      //     if( typeof nid !== 'undefined' && nid == '890310' ){
      //       googletag.pubads().disableInitialLoad();
      //     }
      // }
    }, 5000);

    }); 

    document.addEventListener("scroll", function () {
        firstScrolledInit();
        if (
            page == "regular-article" ||
            page == "blog-article" ||
            page == "video-article"
        ) {
            if (window.innerWidth > 520) {
                // For main article
                var mainArticle = document.getElementById(
                    "article-main-article"
                );
                var mainArticleSocialShare =
                    document.getElementsByClassName("social-share")[0];

                // For scroll Articles
                if (window.pageYOffset > mainArticle.offsetHeight) {
                    var scrollArticle0 =
                        document.getElementById("scrollArticle-0");
                    var scrollArticle1 =
                        document.getElementById("scrollArticle-1");
                    var scrollArticle2 =
                        document.getElementById("scrollArticle-2");

                    var scrollSocialShare1 =
                        document.getElementsByClassName("social-share")[1];
                    var scrollSocialShare2 =
                        document.getElementsByClassName("social-share")[2];
                    var scrollSocialShare3 =
                        document.getElementsByClassName("social-share")[3];

                    var scrollArticleBody0 =
                        mainArticle.offsetHeight +
                        scrollArticle0.offsetHeight +
                        220;
                    var scrollArticleBody1 =
                        scrollArticleBody0 + scrollArticle1.offsetHeight;
                    var scrollArticleBody2 =
                        scrollArticleBody1 + scrollArticle2.offsetHeight;

                    if (window.pageYOffset > mainArticle.offsetHeight) {
                        desktopSocialShareHideShow(
                            scrollSocialShare1.offsetTop,
                            scrollArticleBody0,
                            scrollSocialShare1
                        );
                    }

                    if (window.pageYOffset > scrollArticleBody0) {
                        desktopSocialShareHideShow(
                            scrollSocialShare2.offsetTop,
                            scrollArticleBody1,
                            scrollSocialShare2
                        );
                    }

                    if (window.pageYOffset > scrollArticleBody1) {
                        desktopSocialShareHideShow(
                            scrollSocialShare3.offsetTop,
                            scrollArticleBody2,
                            scrollSocialShare3
                        );
                    }
                }
                desktopSocialShareHideShow(
                    mainArticleSocialShare.offsetTop,
                    mainArticle.offsetHeight,
                    mainArticleSocialShare
                );
                if (!window.pageYOffset) {
                    const topMenu = document.getElementsByClassName(
                        "navbar navbar-light"
                    )[0];
                    const childMenu = document.getElementsByClassName("child-menu")[0];
                    window.setTimeout(function () {
                        if (topMenu) {
                          topMenu.style.display = "flex";
                          topMenu.style.opacity = 1;
                          topMenu.style.transform = "scale(1)";
                        }
                        if (childMenu) {
                          childMenu.style.display = 'flex';
                        }
                    }, 50);
                }
            }
        }
    });
    var firstScrolled = false;

    function firstScrolledInit() {
        if (firstScrolled) {
            return;
        }
        firstScrolled = true;
       // fireGoogleTagManager();
        // pvutils.triggerGA(
        //     "user_interaction",
        //     "first_scroll",
        //     document.URL,
        //     "-"
        // );
        // pvadsPromise.then(function () {
        //     pvads.loadScrollAds();
        //     pvads.loadTaboolaAds();
        // });

        if (window.__apesterCode && window.__apesterCode === "1") {
            pvutils.loadScript(
                "https://static.apester.com/js/sdk/latest/apester-sdk.js",
                null,
                false
            );
        }

        pvutils.loadScript(
            "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2",
            null,
            false
        );
        // pvutils.loadScript("//platform.twitter.com/widgets.js", null, false);
        pvutils.loadScript("//www.instagram.com/embed.js", null, false);
        const observer = lozad(".lozad", {
            load: (el) => {
                const bq = document.createElement("blockquote");
                bq.className = "twitter-tweet";

                const p = document.createElement("p");
                p.lang = "en";
                p.dir = "ltr";
                bq.appendChild(p);

                const twitterSrc = el.dataset.twitterSrc;
                const a = document.createElement("a");
                a.href = twitterSrc;
                bq.appendChild(a);

                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.charset = "utf-8";
                script.async = true;

                el.insertAdjacentElement("beforeEnd", bq);
                el.insertAdjacentElement("beforeEnd", script);
            },
        });
        observer.observe();
        pvutils.loadScript("/common/article.js");
	if (typeof TABOOLA_CODE_HEADER != 'undefined') {
          eval(TABOOLA_CODE_HEADER);
        }
    }

    function loadGTMComScore() {
        // pvutils.loadScript(
        //     "https://www.googletagmanager.com/gtag/js?id=" + ga_tag,
        //     null,
        //     false
        // );
        let comscorePath =
            (document.location.protocol == "https:"
                ? "https://sb"
                : "http://b") + ".scorecardresearch.com/beacon.js";
        let comscoreScript = pvutils.loadScript(comscorePath, undefined, false);
        comscoreScript.onload = function () {
            self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "23522848" });
        };
        //firePageView();
    }

    // function firePageView() {
    //     gtag("js", new Date());
    //     gtag("config", ga_tag);
    //     if (
    //         window.__boolContentGroup &&
    //         window.__boolContentGroup === "1" &&
    //         __groupName != "" &&
    //         __groupName != "undefined"
    //     ) {
    //         gtag("config", ga_tag, { content_group1: __groupName });
    //         //console.log('CG:'+__boolContentGroup+__groupName);
    //     }
    //     gtag("event", "pageview");
    // }

    // function fireGoogleTagManager() {
    //     (function (w, d, s, l, i) {
    //         w[l] = w[l] || [];
    //         w[l].push({
    //             "gtm.start": new Date().getTime(),
    //             event: "gtm.js",
    //         });
    //         var f = d.getElementsByTagName(s)[0],
    //             j = d.createElement(s),
    //             dl = l != "dataLayer" ? "&l=" + l : "";
    //         j.defer = true;
    //         j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    //         f.parentNode.insertBefore(j, f);
    //     })(window, document, "script", "dataLayer", "GTM-TTNW48");
    // }

    if (
        page == "regular-article" ||
        page == "blog-article" ||
        page == "video-article" ||
        page == "photo-article"
    ) {
        function desktopSocialShareHideShow(
            socialShare,
            articleBody,
            getDataAttribute
        ) {
            const topMenu = document.getElementsByClassName(
                "navbar navbar-light"
            )[0];
            const childMenu = document.getElementsByClassName("child-menu")[0];
            const topStickySocialShare = document.getElementById(
                "top-sticky-social-share"
            );

            if (
                socialShare < window.pageYOffset &&
                window.pageYOffset < articleBody
            ) {
                document.getElementById("shareArticleTitle").innerHTML =
                    getDataAttribute.getAttribute("data-articleTitle");
                document
                    .getElementById("getShareData")
                    .setAttribute(
                        "data-articleTitle",
                        getDataAttribute.getAttribute("data-articleTitle")
                    );
                document
                    .getElementById("getShareData")
                    .setAttribute(
                        "data-articleUrl",
                        getDataAttribute.getAttribute("data-articleUrl")
                    );
                document
                    .getElementById("getShareData")
                    .setAttribute(
                        "data-articleCount",
                        getDataAttribute.getAttribute("data-articleCount")
                    );

                topMenu.style.transform = "scale(0)";
                window.setTimeout(function () {
                  topMenu.style.display = "none";
                }, 50);
                if (childMenu != undefined) {
                  childMenu.style.transform = "scale(0)";
                  window.setTimeout(function () {
                    childMenu.style.display = "none";
                  }, 50);
                }

                topStickySocialShare.style.display = "block";
                window.setTimeout(function () {
                    topStickySocialShare.style.opacity = 1;
                    topStickySocialShare.style.transform = "scale(1)";
                }, 0);
            } else if (socialShare > window.pageYOffset) {
                topMenu.style.display = "flex";
                window.setTimeout(function () {
                    topMenu.style.opacity = 1;
                    topMenu.style.transform = "scale(1)";
                }, 0);
                if (childMenu != undefined) {
                    childMenu.style.display = "flex";
                    window.setTimeout(function () {
                        childMenu.style.opacity = 1;
                        childMenu.style.transform = "scale(1)";
                    }, 0);
                }

                topStickySocialShare.style.transform = "scale(0)";
                window.setTimeout(function () {
                    topStickySocialShare.style.display = "none";
                }, 50);
            }

            return true;
        }
    }
    let skinning_ads_close_btn = document.getElementById("skinnerAdClosebtn");
    if (skinning_ads_close_btn) {
        skinning_ads_close_btn.addEventListener("click", () => {
            skinning_ads_close_btn.setAttribute("style", "display: none");
            let skinning_ads = document.getElementsByClassName("skinnerAd");
            for (let a = 0; a < skinning_ads.length; a++) {
                skinning_ads[a].setAttribute("style", "display:none");
            }
        });
    }
});

/**
 * Pvutils metthod to be accessible from any where
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        console.log("define");
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
    } else {
        root.pvutils = factory();
    }
})(this, function () {
    var pvutils = {
        apiUrl: "https://" + window.location.host,
        ajaxapiUrl: window.location.origin,
        uiElements: {},
        /**
         * Lazyloading of images implementation
         */
        lazyloadImage: function () {
            var lazyImages = [].slice.call(
                document.querySelectorAll("img.lazy")
            );
            let lazyIframes = [].slice.call(
                document.querySelectorAll("iframe.lazy")
            );
            let lazyScripts = [].slice.call(
                document.querySelectorAll("script.lazy")
            );
            lazyImages = lazyImages.concat(lazyIframes);
            lazyImages = lazyImages.concat(lazyScripts);
            pvutils.setupLazyload(lazyImages);
        },
        loadScript: function (path, id, async, placement = "body") {
            let j = document.createElement("script");
            if (async === false) {
                j.defer = true;
            } else {
                j.async = true;
            }
            j.src = path;
            if (id) {
                j.id = id;
            }
            if (placement == "head") {
                document.head.appendChild(j);
            } else {
                document.body.appendChild(j);
            }
            return j;
        },

        generateUUID: function () {
            var d = new Date().getTime();
            var d2 =
                (performance && performance.now && performance.now() * 1000) ||
                0;
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = Math.random() * 16;
                    if (d > 0) {
                        r = (d + r) % 16 | 0;
                        d = Math.floor(d / 16);
                    } else {
                        r = (d2 + r) % 16 | 0;
                        d2 = Math.floor(d2 / 16);
                    }
                    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
                }
            );
        },

        getTimestamp: function () {
            let date = new Date() * 1;
            return date;
        },

        getDomElementById: function (id) {
            if (!this.uiElements.hasOwnProperty(id)) {
                let dom = document.getElementById(id);
                this.uiElements[id] = dom;
            }
            return this.uiElements[id];
        },

        showModal: function (modal) {
            let modalElem = document.getElementById(modal);
            modalElem.style.display = "block";
            document.body.classList.add("noscroll");
        },

        hideModal: function (modal, event) {
            let modalElem = document.getElementById(modal);
            if (event.target === modalElem) {
                modalElem.style.display = "none";
                document.body.classList.remove("noscroll");
            }
        },

        getUserInfo: function () {
            let user = localStorage.getItem("lscache-pfb:user") || "{}";
            user = JSON.parse(user);
            return user;
        },

        setUserIcon: function (container) {
            let user = this.getUserInfo();
            let imageElem = this.getDomElementById(container);
            imageElem.src = user.photoURL;
        },

        makeApiCall: function (data, method, endpoint) {
            let user = this.getUserInfo();
            data.uuid = user.id ? user.id.uuid : "";
            let params = {
                method: method,
            };
            if (method === "POST") {
                params.body = JSON.stringify(data);
            }
            return new Promise((resolve) => {
                fetch(this.apiUrl + endpoint, params)
                    .then((response) => response.json())
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        // console.error('Error:', error);
                    });
            });
        },

        makeAjaxApiCall: function (data, method, endpoint) {
            let user = this.getUserInfo();
            data.uuid = user.id ? user.id.uuid : "";
            let params = {
                method: method,
                cache: "no-cache",
            };
            if (method === "POST") {
                params.body = JSON.stringify(data);
            }
            return new Promise((resolve) => {
                fetch(this.ajaxapiUrl + endpoint, params)
                    .then((response) => response.json())
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        // console.error('Error:', error);
                    });
            });
        },

        createElement: function (container, id, classes, content, title) {
            const element = document.createElement(container);
            element.id = id;
            element.className = classes;
            if (content) {
                switch (container) {
                    case "img":
                    case "iframe":
                        element.src = content;
                        break;
                    case "a":
                        element.href = content;
                        element.innerText = title;
                        break;
                    case "source":
                        element.setAttribute("data-srcset", content);
                        break;
                    default:
                        element.innerHTML = content;
                }
            }
            return element;
        },

        insertAfter: function (newNode, existingNode) {
            existingNode.parentNode.insertBefore(
                newNode,
                existingNode.nextSibling
            );
        },

        insertBefore: function (newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode);
        },

        appendMultiple: function (container, elements) {
            elements.forEach((element) => {
                container.appendChild(element);
            });
            return container;
        },
        addAttributes: function (container, elements) {
            for (var key in elements) {
                if (elements.hasOwnProperty(key)) {
                    var val = elements[key];
                    container.setAttribute(key, val);
                }
            }
            return container;
        },
        getFormatedNumber: function (number) {
            if (isNaN(number)) return number;
            if (number < 999) {
                return number;
            } else if (number < 1000000) {
                return Math.round((number * 10) / 1000) / 10 + "K";
            } else if (number < 10000000) {
                return (number * 10) / 1000000 / 10 + "M";
            }
            if (number < 1000000000) {
                return Math.round((number * 10) / 1000000) / 10 + "M";
            } else if (number < 1000000000000) {
                return Math.round((number * 10) / 1000000000) / 10 + "B";
            }
            return number;
        },

        getUserDevice: function () {
            var device = "desktop";
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                device = "mobile";
            } else if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                ) &&
                window.innerWidth <= 1280 &&
                window.innerHeight >= 800
            ) {
                device = "tablet";
            }
            return device;
        },

        getToastContent: function (message, top, bottom, type) {
            let content = this.createElement("div", "", "messagepopup"),
                messageContent = this.createElement(
                    "div",
                    "",
                    "col-xs-12",
                    message
                ),
                bg = type === 1 ? "#99fa42" : "#5fbc0c";
            bg = " background-color: " + bg;
            messageContent.style.textAlign = "center";
            content = this.appendMultiple(content, [messageContent]);
            let pos = "left: 36%; width:28%;";
            if (this.getUserDevice() === "mobile") {
                pos = "left: 4%; width:90%;";
            }
            let css =
                "z-index:99999;animation:fadeIn 1s; position: fixed;bottom:" +
                bottom +
                "px;top:" +
                top +
                ";right: auto; padding: 10px 0px;border-radius: 20px;" +
                pos +
                bg;
            content.setAttribute("style", css);
            document.body.appendChild(content);
            setTimeout(() => {
                content.remove();
            }, 2000);
            return content;
        },

        getDateTime: function (date) {
            let d = new Date(date * 1000);
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            var day = d.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            var month = monthNames[d.getMonth()];
            var year = d.getFullYear();
            let finalDate = day + " " + month + " " + year;
            return finalDate;
        },

        timeSince: function (date, action) {
            var seconds = Math.floor(new Date() / 1000 - date);
            if (action === "left") {
                seconds = -seconds;
            } else {
                action = " ago";
            }
            interval = seconds / 1814400;
            if (interval > 1) {
                return this.getDateTime(date);
            }
            interval = seconds / 604800;
            if (interval > 1) {
                return Math.floor(interval) + " weeks " + action;
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days " + action;
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours " + action;
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " mins " + action;
            }
            if (seconds < 0) {
                return "2 secs " + action;
            }
            return Math.floor(seconds) + " secs " + action;
        },

        setupLazyload: function (lazyImages) {
            let self = this;
            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver(function (
                    entries,
                    observer
                ) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            self.lazyLoad(lazyImage);
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });
                lazyImages.forEach(function (lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                lazyImages.forEach(function (lazyImage) {
                    self.lazyLoad(lazyImage);
                });
            }
        },
        lazyLoad: function (lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImage.classList.add("lazyloaded");
        },

        setCookie: function (cvalue, cookieHandle, exhrs, domain) {
            var expires = "",
                path = "path=/;";
            if (domain) {
                path = "path=/;domain=." + domain;
            }
            cvalue = JSON.stringify(cvalue);
            if (exhrs) {
                var d = new Date();
                d.setTime(d.getTime() + exhrs * 60 * 60 * 1000);
                expires = "expires=" + d.toUTCString();
            }
            var coockieValue =
                cookieHandle + "=" + cvalue + "; " + path + "; " + expires;
            document.cookie = coockieValue;
        },

        getCookie: function (cookieHandle) {
            var sessionData = "",
                name = cookieHandle + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    sessionData = c.substring(name.length, c.length);
                }
            }
            return sessionData;
        },

        triggerGA: function (category, action, label, value) {
            // gtag("event", action, {
            //     event_category: category,
            //     event_label: label,
            //     value: value,
            // });
        },

        // triggerGA: function (category, action, label, value) {
        //     gtag("event", action, {
        //         event_category: category,
        //         event_label: label,
        //         value: value,
        //     });
        // },

        getUserDevice: function () {
            var device = "desktop";
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                device = "mobile";
            } else if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                ) &&
                window.innerWidth <= 1280 &&
                window.innerHeight >= 800
            ) {
                device = "tablet";
            }
            return device;
        },
        openAccordion: function (containerClass, e, closeIconClass) {
            let container = document.getElementById(containerClass),
                closeIcon = document.getElementById(closeIconClass);
            container.classList.add("show");
            container.classList.remove("hide");
            closeIcon.classList.add("show");
            closeIcon.classList.remove("hide");
            e.classList.add("hide");
            e.classList.remove("show");
        },
        closeAccordion: function (containerClass, e, openIconClass) {
            let container = document.getElementById(containerClass),
                openIcon = document.getElementById(openIconClass);
            container.classList.add("hide");
            container.classList.remove("show");
            openIcon.classList.add("show");
            openIcon.classList.remove("hide");
            e.classList.add("hide");
            e.classList.remove("show");
        },
        reloadEmbeddedPost: () => {
            if (typeof FB !== "undefined") {
                FB?.XFBML?.parse(); // to parse fb elements for loading
            }
            if (typeof twttr !== "undefined") {
                // dynamic loading of twitter
                twttr?.widgets?.load($(".twitter-tweet"));
            }
            window?.instgrm?.Embeds?.process();
        },
    };
    return pvutils;
});

document.addEventListener("DOMContentLoaded", function () {
    var current_time = Date.now();
    var nb_notify_val = localStorage.getItem("nb_notify");
    if (typeof nb_notify_val === "undefined" || nb_notify_val == "") {
        localStorage.setItem("nb_notify", current_time);
        var noti_bell_alink =
            document.getElementsByClassName("noti_bell_alink")[0];
        noti_bell_alink.classList.add("active");
    } else {
        var page_uri = window.location.href;
        if (
            page_uri == "https://telugu.pinkvilla.com/latest" ||
            page_uri == "https://telugu.xynie.com/latest"
        ) {
            localStorage.setItem("nb_notify", current_time);
        } else {
            cookie_val = nb_notify_val;
            var time_diff_in_sec = (current_time - cookie_val) / 1000;
            if (time_diff_in_sec > 600) {
                //10 Min - 600 sec
                //setCookie('nb_notify', current_time, 1 );
                //localStorage.setItem('nb_notify', current_time);
                var noti_bell =
                    document.getElementsByClassName("noti_bell_alink")[0];
                //noti_bell.classList.add("active");
                //console.log("BELL : Setting Active Class");
            }
        }
    }
});
