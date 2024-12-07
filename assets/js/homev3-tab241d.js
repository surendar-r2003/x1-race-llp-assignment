function openTabEntertainment(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--entertainment");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("ent-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" ent-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " ent-sub-section-tab-active");
}

// fashion--------------
function openTabFashion(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--fashion");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("fashion-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" fashion-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " fashion-sub-section-tab-active");
}

function openTabLifestyle(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--lifestyle");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("lifestyle-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" lifestyle-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " lifestyle-sub-section-tab-active");
}

function openTabKorean(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--korean");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("korean-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" korean-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " korean-sub-section-tab-active");
}

function openTabSports(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--sports");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("sports-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" sports-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " sports-sub-section-tab-active");
}

// beauty--------------
function openTabBeauty(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--beauty");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("beauty-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" beauty-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " beauty-sub-section-tab-active");
}

// ---------------health
function openTabHealth(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--health");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("health-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" health-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " health-sub-section-tab-active");
}

function openTabSelect(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--select");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("select-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" select-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " select-sub-section-tab-active");
}

// movie review tab------js-
function tabMovieReview(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--mv--review");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("movie-review-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" movie-review-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "grid"),
    (e.currentTarget.className += " movie-review-sub-section-tab-active");
}
// top movie js-
function tabTopMovie(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--top--mv");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("movies-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" movies-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "flex"),
    (e.currentTarget.className += " movies-sub-section-tab-active");
}

// --------------tv-
function openTabTv(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--tv");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("tv-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" tv-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " tv-sub-section-tab-active");
}
// tech--------------
function openTabTech(e, t) {
    var a, s, l;
    for (
        a = 0, s = document.getElementsByClassName("tabcontent--tech");
        a < s.length;
        a++
        )
        s[a].style.display = "none";
    for (
        a = 0, l = document.getElementsByClassName("tech-sub-section-tab");
        a < l.length;
        a++
        )
        l[a].className = l[a].className.replace(" tech-sub-section-tab-active", "");
    (document.getElementById(t).style.display = "block"),
    (e.currentTarget.className += " tech-sub-section-tab-active");
}
