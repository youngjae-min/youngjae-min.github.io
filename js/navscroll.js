function selectElementByClass(className) {
  return document.querySelector(`.${className}`);
}

//const all_entries = document.querySelectorAll('section');
const short_entries = [
  selectElementByClass('home'),
  selectElementByClass('honor'),
];
const long_entries = [
  selectElementByClass('research'),
];

const navItems = {
  home: selectElementByClass('home_nav'),
  research: selectElementByClass('research_nav'),
  honor: selectElementByClass('honor_nav'),
};

function make_active(id) {
  const navItem = navItems[id];
  navItem.classList.add('active');
  Object.values(navItems).forEach((item) => {
    if (item != navItem) {
      item.classList.remove('active');
    }
  });
}

function long_callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var no_short = true;
      short_entries.forEach((item) => {
        if (item._intersectionRatio > 0.5) { no_short = false;}
      });
      if (no_short || entry.intersectionRect.height > 0.9 * document.documentElement.clientHeight) {
	make_active(entry.target.id);
      }
    }
  });  
}

function short_callback(entries, observer) {
  entries.forEach((entry) => {
    entry.target._intersectionRatio = entry.intersectionRatio;
    if (entry.intersectionRatio > 0.7) {
      make_active(entry.target.id);
    }
  });
}

// intersection observer setup
const observerOptions_short = {
  root: null,
  rootMargin: '0px',
  threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
};
const observerOptions_long = {
  root: null,
  rootMargin: '0px',
  threshold: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45,  0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
};

const observer_s = new IntersectionObserver(short_callback, observerOptions_short);
const observer_l = new IntersectionObserver(long_callback, observerOptions_long);

short_entries.forEach((ent) => observer_s.observe(ent));
long_entries.forEach((ent) => observer_l.observe(ent));

// to the top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
