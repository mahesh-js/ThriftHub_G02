

/*********************/
/*   App Js     */
/*********************/

class App {

  init() {

    const html = document.querySelector("html");
    const toggletheme = document.querySelector("#toggle-theme");
    const lightBtn = toggletheme?.querySelector('.light');
    const darkBtn = toggletheme?.querySelector('.dark');
    toggletheme?.addEventListener('click', () => {

      if (html.getAttribute('class') === "dark") {
        document.body.setAttribute("data-layout-mode", "light")
      } else {
        document.body.setAttribute("data-layout-mode", "dark")
      }

      html.classList.toggle("dark");
      const isDark = html.classList.contains('dark');
      (!isDark?darkBtn:lightBtn)?.classList.add('hidden');
      (isDark?darkBtn:lightBtn)?.classList.remove('hidden');

      // togglethemeicon.className = "ti ti-" + `${themeIcon}` + "  top-icon";
    })
  }
}




window.addEventListener('DOMContentLoaded', function (e) {
  new App().init();
})

try {
  // Icon
  lucide.createIcons();
} catch (err) { }
/*********************/
/*   Toggle menu     */
/*********************/
try {
  document.getElementById("toggle-menu").addEventListener("click", function(){
    var mobileMenu = document.getElementById("mobile-menu-2");
    mobileMenu.classList.toggle("hidden");
    // if (mobileMenu.classList.contains('block')) {
    //   mobileMenu.classList.remove("hidden");
    // }else{
    //   mobileMenu.classList.add("hidden");
    // }
  })
  
} catch (err) { }

/*********************/
/*   Menu Sticky     */
/*********************/
function windowScroll() {
  const navbar = document.getElementById("topbar");
  if (navbar != null) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

window.addEventListener('scroll', (ev) => {
  ev.preventDefault();
  windowScroll();
})




/*********************/
/*  Vertical Menu     */
/*********************/
function activeMenu() {


  function activeTwoColumn() {
    function activeTabMenu() {
      document.querySelectorAll('.tab-menu button').forEach((e) => {
        e.setAttribute('aria-selected', false);
      })
    }
    activeTabMenu();

    document.querySelectorAll('#Icon-menu a').forEach(function (element, index) {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      const target = element;

      if (element.href == pageUrl) {
        // tabPanelList list link active
        document.querySelectorAll('#Icon-menu [role="tabpanel"]').forEach(function (elem) {
          elem.classList.add('hidden');
          elem.querySelectorAll('.collapse-menu').forEach(function (accorElem) {
            accorElem.classList.add('hidden');
          });
        });

        target.classList.add('active');
        target.parentNode.classList.add('menuitem-active');
        let tabNode = null;
        if (target.parentNode.parentNode.parentNode.hasAttribute("role")) {
          target.parentNode.parentNode.parentNode.classList.remove('hidden');
          tabNode = target.parentNode.parentNode.parentNode;
        }
        if (target.parentNode.parentNode.parentNode.classList.contains("collapse-menu")) {
          target.parentNode.parentNode.parentNode.classList.remove('hidden');
          tabNode = target.parentNode.parentNode.parentNode;
        }
        if (target.parentNode.parentNode.parentNode.previousElementSibling) {
          target.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.nav-link').classList.add('active');
          target.parentNode.parentNode.parentNode.previousElementSibling.querySelector('[data-accordion-icon]')?.classList.add('rotate-180');
          target.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.nav-link').setAttribute('aria-expanded', "true");
          if (target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.hasAttribute("role")) {
            target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('hidden');
            tabNode = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          }
        }

        if (tabNode) {
          document.querySelectorAll(`.tab-menu button[data-tabs-target="#${tabNode.id}"]`).forEach((e) => {
            // e.setAttribute('aria-selected', true);
            e.click();
          })
        }
      }
    });
  }


  function activeHorizontal() {
    if (document.querySelector('nav#topbar')) {
      document.querySelectorAll('nav#topbar ul.NavMenu a').forEach(function (element, index) {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        const target = element;


        if (element.href == pageUrl) {
            console.info(element);
            element.classList.add("active")
            element.parentElement.parentElement.parentElement.querySelector('a')?.classList.add('active');
            element.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('a')?.classList.add('active');
        }
      });
    }
  }


  function activeLeftbar(){
    document.querySelectorAll('ul.navbar-nav a.nav-link').forEach(function (element, index) {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if(pageUrl===element.href){
        element.classList.add('active');
        const parent = element.parentElement.parentElement.parentElement.previousElementSibling;

        const pPrent = parent.parentElement.parentElement.parentElement.previousElementSibling;
        if(pPrent?.hasAttribute('data-fc-type')){
          frost.Collapse.getInstanceOrCreate(pPrent).show();
        }

        if(parent?.hasAttribute('data-fc-type')){
          frost.Collapse.getInstanceOrCreate(parent).show();
        }// element.
      }
    });
  }

  activeLeftbar();
  activeTwoColumn();
  activeHorizontal();


}

window.addEventListener("load", (event) => {
  activeMenu();
});



try {
  // Toggle menu
  document.getElementById("toggle-menu").addEventListener("click", function () {
    var mobileMenu = document.getElementById("mobile-menu-2");
    mobileMenu.classList.toggle("block");
    if (mobileMenu.classList.contains('block')) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  })
} catch (err) { }





// Default Mode
document.getElementById('default-size-check')?.addEventListener('click', () => {
  document.body.setAttribute("data-sidebar-size", "default")
});



//collapsed
var collapsedToggle = document.querySelector(".button-menu-mobile");
collapsedToggle?.addEventListener('click', function () {

  var sidebarSize = document.body.getAttribute("data-sidebar-size");

  if (sidebarSize == "collapsed") {
    document.body.setAttribute("data-sidebar-size", "default")

  } else {
    document.body.setAttribute("data-sidebar-size", "collapsed")
  }

});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 282 && window.innerWidth <= 1440) {
    document.body.setAttribute("data-sidebar-size", "collapsed")
  } else {
    document.body.setAttribute("data-sidebar-size", "default")
  }
})

//collapsed
var collapsedToggle = document.querySelector(".button-menu-mobile-2");
collapsedToggle?.addEventListener('click', function () {

  var sidebarSize = document.body.getAttribute("data-sidebar-size");

  if (sidebarSize == "collapsed") {
    document.body.setAttribute("data-sidebar-size", "default")
    // document.getElementById('default-size-check').checked = true;

  } else {
    document.body.setAttribute("data-sidebar-size", "collapsed")
  }

});



function dismissDropdownMenu() {
  document.querySelectorAll(".dropdown-menu").forEach(function (item) {
    item.classList.remove("block")
    item.classList.add("hidden")
  });
  document.querySelectorAll(".dropdown-toggle").forEach(function (item) {
    item.classList.remove("block")
  });
}

window.addEventListener('click', function (e) {
  dismissDropdownMenu();
});


try {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".drop-multi button, .second-level a").forEach(el => {
      el.addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('block');
        this.parentNode.classList.toggle('block');
      });
    });
  });

  // data-tw-auto-close
  Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(function (item) {
    var elem = item.parentElement
    if (item.getAttribute('data-tw-auto-close') == 'outside') {
      elem.querySelector(".dropdown-menu").addEventListener("click", function () {
        if (!isShowDropMenu) {
          isShowDropMenu = true;
        }
      });
    } else if (item.getAttribute('data-tw-auto-close') == 'inside') {
      item.addEventListener("click", function () {
        isShowDropMenu = true;
        isMenuInside = true;
      });
      elem.querySelector(".dropdown-menu").addEventListener("click", function () {
        isShowDropMenu = false;
        isMenuInside = false;
      });
    }
  });

  // window.addEventListener('click', function (e) {
  //   if (!isShowDropMenu && !isMenuInside) {
  //     dismissDropdownMenu();
  //   }
  //   isShowDropMenu = false;
  // });

} catch (err) { }


try{
  flatpickr(".dash_date", {
    defaultDate: "today",
    dateFormat: "d-M-Y",
  });
} catch (err){}


try{
function initDateRangrPicker() {
  if ($('#Dash_Date').length == 0) {
      return;
  }

  var picker = $('#Dash_Date');
  var start = moment();
  var end = moment();

  function cb(start, end, label) {
      var title = '';
      var range = '';

      if ((end - start) < 100 || label == 'Today') {
          title = 'Today:';
          range = start.format('MMM D');
      } else if (label == 'Yesterday') {
          title = 'Yesterday:';
          range = start.format('MMM D');
      } else {
          range = start.format('MMM D') + ' - ' + end.format('MMM D');
      }

      picker.find('#Select_date').html(range);
      picker.find('#Day_Name').html(title);
  }

  picker.daterangepicker({
      startDate: start,
      endDate: end,
      opens: 'left',
      applyClass: "btn btn-sm btn-primary",
      cancelClass: "btn btn-sm btn-secondary",
      ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb);

  cb(start, end, '');
}
} catch (err) { }