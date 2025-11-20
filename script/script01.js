
//SCROLL 
$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

//RANDOMIZE

function goToRandomPage() {
  // Define an array of your website's page URLs
  const pages = [
    "../lifeinauz/gallery",
    "../lifeinauz/photography",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "../lifeinauz/poetry",
    "../lifeinauz/roadtrip",
    "../lifeinauz/recipes/crepes",
    "../lifeinauz/recipes/puree",
    "../lifeinauz/recipes/quiche",
    "../lifeinauz/recipes/R&B",
    "../lifeinauz/recipes/samon",
    "../lifeinauz/recipes/tomatoes",
  ];
  // Generate a random index within the array's bounds
  const randomIndex = Math.floor(Math.random() * pages.length);

  // Get the randomly selected URL
  const randomPage = pages[randomIndex];

  // Redirect the browser to the random page
  window.location.href = randomPage;
}


