/**
 * Blatantly stolen from Olivero and adapted for our uses.
 */

(function (Drupal, once, tabbable) {
  function isNavOpen(navWrapper) {
    return navWrapper.classList.contains("is-active");
  }

  function toggleNav(props, state) {
    var value = !!state;
    props.navButton.setAttribute("aria-expanded", value);

    if (value) {
      props.body.classList.add("is-overlay-active");
      props.body.classList.add("is-fixed");
      props.navWrapper.classList.add("is-active");
    } else {
      props.body.classList.remove("is-overlay-active");
      props.body.classList.remove("is-fixed");
      props.navWrapper.classList.remove("is-active");
    }
  }

  function closeNav(props, state) {
    var value = !!state;

    if (!value) {
      props.body.classList.remove("is-overlay-active");
      props.body.classList.remove("is-fixed");
      props.navWrapper.classList.remove("is-active");
    }
  }

  function init(props) {
    props.navButton.setAttribute("aria-controls", props.navWrapperId);
    props.navButton.setAttribute("aria-expanded", "false");
    props.navButton.addEventListener("click", function () {
      toggleNav(props, !isNavOpen(props.navWrapper));
    });
    props.closeButton.addEventListener("click", function () {
      closeNav(props, false);
    });
    document.addEventListener("keyup", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        if (isNavOpen(props.navWrapper)) {
          toggleNav(props, false);
        }
      }
    });
    props.overlay.addEventListener("click", function () {
      toggleNav(props, false);
    });
    // props.overlay.addEventListener('touchstart', function () {
    //     toggleNav(props, false);
    // });
    props.header.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && isNavOpen(props.navWrapper)) {
        var tabbableNavElements = tabbable.tabbable(props.navWrapper);

        tabbableNavElements.unshift(props.navButton);
        var firstTabbableEl = tabbableNavElements[0];
        var secondTabbableEl = tabbableNavElements[1];
        var lastTabbableEl =
          tabbableNavElements[tabbableNavElements.length - 1];

        /**
         * This is more complicated than what is in olivero since the code in oliver depends on a specific layout.
         */
        if (e.shiftKey) {
          if (document.activeElement === firstTabbableEl) {
            //&& !props.olivero.isDesktopNav()
            lastTabbableEl.focus();
            e.preventDefault();
          } else if (document.activeElement === secondTabbableEl) {
            firstTabbableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastTabbableEl) {
            //&& !props.olivero.isDesktopNav()
            firstTabbableEl.focus();
            e.preventDefault();
          } else if (document.activeElement === firstTabbableEl) {
            secondTabbableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
    // window.addEventListener("resize", function () {
    //   if (props.olivero.isDesktopNav()) {
    //     toggleNav(props, false);
    //     props.body.classList.remove("is-overlay-active");
    //     props.body.classList.remove("is-fixed");
    //   }

    //   Drupal.olivero.closeAllSubNav();
    // });
    props.navWrapper.addEventListener("click", function (e) {
      if (
        e.target.matches(
          '[href*="'
            .concat(window.location.pathname, '#"], [href*="')
            .concat(
              window.location.pathname,
              '#"] *, [href^="#"], [href^="#"] *'
            )
        )
      ) {
        toggleNav(props, false);
      }
    });
  }

  Drupal.behaviors.radOffCanvas = {
    attach: function (context, settings) {
      var headerId = "site-header";
      var header = once("oc-nav", "#".concat(headerId), context).shift();
      var navWrapperId = "off-canvas";

      if (header) {
        var navWrapper = context.querySelector("#".concat(navWrapperId));
        var navButton = context.querySelector("#rad-offcanvas-toggle");
        var closeButton = context.querySelector(".off-canvas__close");
        var body = context.querySelector("body");
        var overlay = context.querySelector(".off-canvas__overlay");

        init({
          header: header,
          navWrapperId: navWrapperId,
          navWrapper: navWrapper,
          navButton: navButton,
          closeButton: closeButton,
          body: body,
          overlay: overlay,
        });
      }
    },
  };
})(Drupal, once, tabbable);
