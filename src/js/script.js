const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = document.querySelector(".menu__close"),
  links = document.querySelectorAll(".menu a");

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
});

closeElem.addEventListener("click", () => {
  menu.classList.remove("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    menu.classList.remove("active");
  }
});

//Ratings
const counters = document.querySelectorAll(".skills__ratings-counter"),
  lines = document.querySelectorAll(".skills__ratings-line span");

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

$(document).ready(function () {
  //Modal windows ------
  $("[data-modal=send-message]").on("click", function () {
    $(".overlay, #thanks").fadeIn("slow");
  });

  $(".modals__close").on("click", function () {
    $(".overlay, #thanks").fadeOut("slow");
  });

  //validate forms -------------------------------
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "I should know your name",
          minlength: jQuery.validator.format(
            "At least {0} characters required!"
          ),
        },
        email: {
          required: "I would like to know how to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
      },
    });
  }

  validateForms("#contacts-form");
  //-----------------------------------------------

  //Mailer for form
  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");

      $("form").trigger("reset");
    });
    return false;
  });

  //Smooth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      const hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});
