function view(button) {
    // Find the closest card and its image
    const card = button.closest('.card');
    const image = card.querySelector('img'); // Get the associated image

    // Set the modal image source to the image's source
    document.getElementById("img01").src = image.src;

    // Display the modal
    document.getElementById("modal01").style.display = "block";
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const card = document.getElementById('modal01');
    if (event.key === 'Escape' && card.style.display === 'block') {
      closeCard();
    }
  });

function openComment(button) {
    // Find the closest `.comment` div
    const commentDiv = button.closest('.card').querySelector('.comment');

    // Find the input inside the `.comment` div
    const inputField = commentDiv.querySelector('input');

    // Toggle the visibility of the input field
    if (inputField.style.display === "none") {
        inputField.style.display = "block"; // Show the input field
        inputField.focus(); // Optionally, focus the input field
    } else {
        inputField.style.display = "none"; // Hide the input field
    }
}

function noZoom() {
    alert("Sorry, I deactivated the possibility to zoom in the pictures because I find their quality too low...Hit me up on Instagram or by email if you want more info though ! ")
}

