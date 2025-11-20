document.addEventListener("DOMContentLoaded", () => {
    function updateLine2() {
        const adj = document.getElementById("adj").value;
        const noun1 = document.getElementById("noun1").value;
        const verb = document.getElementById("verb").value;
        const noun2 = document.getElementById("noun2").value;
        document.getElementById("line2").textContent =
            `${adj} ${noun1} ${verb} in the ${noun2}`.trim();
    }
    ["adj", "noun1", "verb", "noun2"].forEach(id => {
        document.getElementById(id).addEventListener("input", updateLine2);
    });

    const form = document.getElementById("poemForm");
    const preview = document.getElementById("poemPreview");
    const galleryContainer = document.getElementById("galleryContainer");
    const closeBtn = document.getElementById("closePreview");
    const keepPrivate = document.getElementById("keepPrivate");
    const saveGalleryBtn = document.getElementById("saveGallery");
    const downloadBtn = document.getElementById("download");

    // Load gallery
    function loadGallery() {
        galleryContainer.innerHTML = "";
        let gallery = JSON.parse(localStorage.getItem("poemGallery") || "[]");
        gallery.forEach((poem, index) => {
            const card = document.createElement("div");
            card.classList.add("poemCard");
            card.innerHTML = `
                <button class="deletePoem" data-index="${index}">X</button>
                <h3>${poem.title}</h3>
                <p>${poem.content}</p>
            `;
            galleryContainer.appendChild(card);
        });
    }
    loadGallery();

    function savePoemToGallery(poem) {
        let gallery = JSON.parse(localStorage.getItem("poemGallery") || "[]");
        gallery.push(poem);
        localStorage.setItem("poemGallery", JSON.stringify(gallery));
    }

    // Form submit → open preview modal
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const name = document.getElementById("name").value;
        const adj = document.getElementById("adj").value;
        const noun1 = document.getElementById("noun1").value;
        const verb = document.getElementById("verb").value;
        const noun2 = document.getElementById("noun2").value;
        const noun3 = document.getElementById("noun3").value;
        const noun4 = document.getElementById("noun4").value;
        const adjective = document.getElementById("adjective").value;
        const question = document.getElementById("question").value;
        const finalLine = document.getElementById("line2").textContent;


        const poemText = `
My name is ${name}.<br>
Today I feel like ${adj} ${noun1} ${verb} in the ${noun2}.<br>
Sometimes I am ${noun3}.<br>
Sometimes I am ${noun4}.<br>
But always I am ${adjective}.<br>
I ask the world : " ${question} "<br>
And the answer is : ${finalLine}. <br>    
        `;

        document.getElementById("previewTitle").innerText = title;
        document.getElementById("previewContent").innerHTML = poemText;

        preview.style.display = "flex"; // show modal
    });

    // Close modal
    closeBtn.addEventListener("click", () => preview.style.display = "none");
    keepPrivate.addEventListener("click", () => preview.style.display = "none");

    // Save to gallery
    saveGalleryBtn.addEventListener("click", function () {
        const title = document.getElementById("previewTitle").innerText;
        const content = document.getElementById("previewContent").innerHTML;
        savePoemToGallery({ title, content });
        loadGallery();
        preview.style.display = "none";
    });

    downloadBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const title = document.getElementById("previewTitle").innerText;
        const content = document.getElementById("previewContent").innerHTML.replace(/<br\s*\/?>/gi, "\n");

        doc.setFontSize(16);
        doc.text(title, 10, 20);
        doc.setFontSize(12);

        const splitContent = doc.splitTextToSize(content, 180);
        doc.text(splitContent, 10, 40);

        doc.save("MyPoem.pdf");
    });

    // Delete poem from gallery
    galleryContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("deletePoem")) {
            let index = e.target.getAttribute("data-index");
            let gallery = JSON.parse(localStorage.getItem("poemGallery") || "[]");
            gallery.splice(index, 1);
            localStorage.setItem("poemGallery", JSON.stringify(gallery));
            loadGallery();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const regionPoems = {
        "London": [
            { title: "L'Amoureux", img: "../lifeinauz/pics/poems/uk/amoureux.png" },
            { title: "6 Word Memoirs", img: "../lifeinauz/pics/poems/uk/memoir.png" },
            { title: "Bloody Feet", img: "../lifeinauz/pics/poems/uk/bloodyfeet.png" },
            { title: "In the Slaughterhouse", img: "../lifeinauz/pics/poems/uk/slaughterhouse.png" },
            { title: "It was supposed to be butterflies", img: "../lifeinauz/pics/poems/uk/butterflies.png" },
            { title: "Untitled", img: "../lifeinauz/pics/poems/uk/carcass.png" },
            { title: "Les tartines chaudes", img: "../lifeinauz/pics/poems/uk/les-tartines.png" },
            { title: "Lovestuck", img: "../lifeinauz/pics/poems/uk/lovestuck.png" }
        ],
        "Cesson-Sévigné": [
            { title: "Chez Guy et Marie", img: "../lifeinauz/pics/poems/fr/guyetmarie.png" },
            { title: "M pour manque", img: "../lifeinauz/pics/poems/fr/moman.png" }
        ],
        "Adelaide": [
            { title: "About a body", img: "../lifeinauz/pics/poems/auz/body.png" },
            { title: "Untitled", img: "../lifeinauz/pics/poems/auz/gawd.png" },
            { title: "Untitled", img: "../lifeinauz/pics/poems/auz/home.png" },
            { title: "Untitled", img: "../lifeinauz/pics/poems/auz/potions.png" },
            { title: "18/08/2025", img: "../lifeinauz/pics/poems/auz/18.png" },
            { title: "19/11/2025", img: "../lifeinauz/pics/poems/auz/19.png" }
        ]
    };

    const mapCard = document.getElementById('mapCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardContent = document.getElementById('cardContent');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentPoems = [];
    let currentIndex = 0;

    // Show poems for clicked region
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            const region = marker.getAttribute('data-region');
            const poems = regionPoems[region] || [];
            currentPoems = poems;

            cardTitle.textContent = region;
            cardContent.innerHTML = poems.map((p, i) => `
            <div class="book" data-index="${i}">
              <p>${p.title}</p>
              <img src="${p.img}" alt="${p.title}" class="poem-img">
              <div class="cover"><p>Click to expand</p></div>
            </div>
          `).join('');

            mapCard.style.display = 'block';
        });
    });

    // Open lightbox
    cardContent.addEventListener('click', e => {
        const book = e.target.closest('.book');
        if (!book) return;
        currentIndex = parseInt(book.getAttribute('data-index'));
        openLightbox(currentIndex);
    });

    function openLightbox(index) {
        const poem = currentPoems[index];
        if (!poem) return;
        lightboxImg.src = poem.img;
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function showNext() {
        if (currentPoems.length === 0) return;
        currentIndex = (currentIndex + 1) % currentPoems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        if (currentPoems.length === 0) return;
        currentIndex = (currentIndex - 1 + currentPoems.length) % currentPoems.length;
        openLightbox(currentIndex);
    }

    // Navigation + keyboard
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    document.addEventListener('keydown', e => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeLightbox();
        }
    });

    // Close events
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    document.getElementById('closeCardBtn').addEventListener('click', () => {
        mapCard.style.display = 'none';
    });
});




