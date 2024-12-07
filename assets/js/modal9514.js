// open modal header--------
function openModalHeadMobile() {
  var modalHeadMobile = document.getElementById("modal-header-mobile");
  modalHeadMobile.style.display = "block";
}

function closeModalHeader() {
  var modalHeadMobile = document.getElementById("modal-header-mobile");
  modalHeadMobile.style.display = "none";
}

function toggleCollapsibleModalHeader(event) {
  var button = event.currentTarget;
  var contentHeadMobile = button.nextElementSibling;
  contentHeadMobile.style.display =
    contentHeadMobile.style.display === "flex" ? "none" : "flex";

  var arrowModalHead = button.querySelector(".arrow_23_pv");
  arrowModalHead.classList.toggle("rotate");
  button.classList.toggle("active");
}

// new releaseSlider Scroll Function
function sideScroll(element, direction, speed, distance, step) {
  scrollAmount = 0;
  var slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

/*var newReleaseSliderLeft55 = document.querySelector(".new--release--right");
newReleaseSliderLeft55.onclick = function () {
  var container = document.querySelector(".new--release--flex");
  sideScroll(container, "left", 20, 250, 20);
};

var newReleaseSliderRight55 = document.querySelector(".new--release--left");
newReleaseSliderRight55.onclick = function () {
  var container = document.querySelector(".new--release--flex");
  sideScroll(container, "right", 20, 250, 20);
};*/

// Modal script
document.addEventListener("click",function (e) {
  console.log("click event - modal");
  e = e || window.event;
  var target = e.target || e.srcElement;
  console.log(target.getAttribute("data-toggle"));
  if ( target.hasAttribute("data-toggle") && target.getAttribute("data-toggle") == "modal--trailer--movies" ) {
    console.log(target.hasAttribute("data-target"));
    if (target.hasAttribute("data-target")) {
      console.log("modal open");
      var m_ID = target.getAttribute("data-target");
      document.getElementById('homepagev2videocontainer').setAttribute("src", target.getAttribute('data-video'))
      document.getElementById(m_ID).classList.add("open_modal_boxff");
      e.preventDefault();
    }
  }
  if ((target.hasAttribute("data-dismiss") && target.getAttribute("data-dismiss") == "modal--trailer--movies") || target.classList.contains("modal--trailer--movies")) {
    console.log("modal close");
    var modal = document.querySelector('.modal--trailer--movies.open_modal_boxff');
    modal.classList.remove("open_modal_boxff");
    e.preventDefault();
    modal.querySelector("iframe").src = "";
  }
},false);
