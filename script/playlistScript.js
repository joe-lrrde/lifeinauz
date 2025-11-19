const shuffleIcon = document.getElementById("shuffle");

shuffleIcon.addEventListener("mouseenter", () => {
  shuffleIcon.classList.add("animate__animated", "animate__flip");

  // Remove animation class when finished so it can restart next hover
  shuffleIcon.addEventListener("animationend", () => {
    shuffleIcon.classList.remove("animate__animated", "animate__flip");
  }, { once: true });
});

const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetSearch");
const songs = document.querySelectorAll("#playlist-back .song");

let isOpen = false;

// Toggle search input when clicking icon
searchIcon.addEventListener("click", () => {
  if (!isOpen) {
    searchInput.classList.add("expanded");
    searchInput.focus();
    searchIcon.classList.add("active");
    isOpen = true;
  } else {
    closeSearch();
  }
});

// Handle Enter key inside search
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();

    // Filtering logic → works on the whole song block
    songs.forEach(song => {
      const text = song.textContent.toLowerCase();
      if (text.includes(query)) {
        song.style.display = "block"; 
      } else {
        song.style.display = "none"; 
      }
    });

    // If input is empty → reset
    if (query.trim() === "") resetSongs();

    // Collapse search after filtering
    closeSearch();
  }
});

// Reset button restores all songs
resetBtn.addEventListener("click", () => {
  resetSongs();
  closeSearch();
});

// 🔹 Helpers
function resetSongs() {
  songs.forEach(song => song.style.display = "block");
}

function closeSearch() {
  searchInput.classList.remove("expanded");
  searchInput.blur();
  searchInput.value = "";
  searchIcon.classList.remove("active");
  isOpen = false;
}

const addSongBtn = document.getElementById("addSongBtn");
const newTitle = document.getElementById("newTitle");
const newArtist = document.getElementById("newArtist");
const playlist = document.getElementById("playlist-back");
const addSongForm = document.getElementById("addSongForm");

addSongBtn.addEventListener("click", () => {
  const title = newTitle.value.trim();
  const artist = newArtist.value.trim();

  if (title && artist) {
    // create new song block
    const songDiv = document.createElement("div");
    songDiv.classList.add("song");
    songDiv.innerHTML = `
      <p class="zicTitle">${title}</p>
      <p class="zicos">${artist}</p>
    `;

    // insert above the form
    playlist.insertBefore(songDiv, addSongForm);

    // clear inputs
    newTitle.value = "";
    newArtist.value = "";
  } else {
    alert("Please enter both title and artist!");
  }
});

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Select all the songs
  const songs = document.querySelectorAll("#playlist-back .song");
  let yPosition = 20; // initial vertical position in PDF

  songs.forEach(song => {
    const title = song.querySelector(".zicTitle").textContent;
    const artist = song.querySelector(".zicos").textContent;

    doc.setFontSize(14);
    doc.text(title, 20, yPosition);
    yPosition += 8;
    doc.setFontSize(12);
    doc.text(artist, 25, yPosition);
    yPosition += 12; // space between songs
  });

  // Save the PDF
  doc.save("playlist.pdf");
});




