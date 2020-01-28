const onStage = document.querySelectorAll(".onstage-ani-js"),
  artist = document.querySelectorAll(".artist-ani-js"),
  podium = document.querySelectorAll(".podium-ani-js"),
  news = document.querySelectorAll(".news-ani-js");

const myFullpage = new fullpage(".fullpage", {
  navigation: true,
  navigationPosition: "right",
  responsiveWidth: 769,
  responsiveHeight: 470,
  onLeave: function(origin, destination, direction) {
    function chk(i, section, cn) {
      if (
        (origin.index === i && direction === "down") ||
        (destination.index === i + 1 && direction === "up")
      ) {
        section.forEach(function(element) {
          element.classList.add(cn);
        });
      } else {
        section.forEach(function(element) {
          element.classList.remove(cn);
        });
      }
      return;
    }

    chk(0, onStage, "onstage-ani");
    chk(1, artist, "artist-ani");
    chk(2, podium, "podium-ani");
    chk(3, news, "news-ani");
  }
});

const btnNav = document.querySelector(".btn-nav"),
  nav = document.querySelector(".nav-mobile"),
  navDim = document.querySelector(".nav-mobile__dim");

function openNav() {
  nav.classList.add("active");
}

function closeNav() {
  nav.classList.remove("active");
}

function responsiveNav() {
  if (window.innerWidth >= 767) {
    nav.classList.remove("active");
  }
}

btnNav.addEventListener("click", openNav);
navDim.addEventListener("click", closeNav);
window.addEventListener("resize", responsiveNav);
