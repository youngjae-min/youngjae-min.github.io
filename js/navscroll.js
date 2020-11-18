// modified template from https://academind.com/learn/javascript/scroll-aware-navigation/

function selectElementByClass(className) {
  return document.querySelector(`.${className}`);
}

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

// intersection observer setup
const observerOptions_short = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
};
const observerOptions_long = {
  root: null,
  rootMargin: '0px',
  threshold: 0.25,
};

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // get the nav item corresponding to the id of the section
      // that is currently in view
      const navItem = navItems[entry.target.id];
      // add 'active' class on the navItem
      navItem.classList.add('active');
      //remove 'active' class from any navItem that is not
      // same as 'navItem' defined above
      Object.values(navItems).forEach((item) => {
        if (item != navItem) {
          item.classList.remove('active');
        }
      });
    }
  });
}

const observer_s = new IntersectionObserver(observerCallback, observerOptions_short);
const observer_l = new IntersectionObserver(observerCallback, observerOptions_long);

short_entries.forEach((ent) => observer_s.observe(ent));
long_entries.forEach((ent) => observer_l.observe(ent));
