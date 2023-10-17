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

//===Ratings===
// Function to check if an element is visible on the screen
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event and animation start
function handleScroll() {
  lines.forEach((item) => {
    if (isElementInViewport(item)) {
      const widthValue = item.innerHTML;
      const parentLine = item.parentElement;
      parentLine.style.width = widthValue;
      parentLine.style.animation = `fill 1s linear forwards ${widthValue}`;
    }
  });
}

const counters = document.querySelectorAll(".skills__ratings-counter"),
  lines = document.querySelectorAll(".skills__ratings-line span");
//scroll for animation of spans
window.addEventListener("scroll", handleScroll);
//taking % from html for filler
counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

//==========================================================================
$(document).ready(function () {
  //Modal windows ------
  // $("[data-modal=send-message]").on("click", function () {
  //   $(".overlay, #thanks").fadeIn("slow");
  // });

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
        checkbox: {
          required: true,
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
        checkbox: {
          required: "This is also required",
          checkbox: "This is also required",
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

    // Create object with each form data
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/mailer",
      data: JSON.stringify(formData),
      // The old version of the mailer
      // url: "mailer/smart.php",
      // data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $(".overlay, #thanks").fadeIn("slow");
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
