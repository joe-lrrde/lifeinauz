function openWeek(weekNumber) {
    document.querySelectorAll('.carousel-container').forEach(car => car.style.display = 'none');
    document.getElementById(`week${weekNumber}`).style.display = 'flex';
    document.getElementById('closeBtn').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCarousels() {
    document.querySelectorAll('.carousel-container').forEach(car => car.style.display = 'none');
    document.getElementById('closeBtn').style.display = 'none';
}

function openTextPanel(title, desc, src) {
    const isPDF = src.toLowerCase().endsWith(".pdf");

    document.getElementById('panelTitle').innerText = title;
    document.getElementById('panelDesc').innerHTML = desc;

    const img = document.getElementById('panelImage');
    const pdf = document.getElementById('panelPDF');

    if (isPDF) {
        img.style.display = "none";
        pdf.style.display = "block";
        pdf.src = src;
    } else {
        pdf.style.display = "none";
        img.style.display = "block";
        img.src = src;
    }

    document.getElementById('textPanel').style.display = 'flex';
    document.getElementById('textPanel').scrollTop = 0;
}


function closeTextPanel() {
    document.getElementById('textPanel').style.display = 'none';
}

// Make text frames open expandable panel
document.addEventListener('click', function(e) {
  const frame = e.target.closest('.text-frame');
  if(frame) {
    openTextPanel(
      frame.dataset.title,
      frame.dataset.content,
      frame.dataset.bg
    );
  }
});

for (let w = 2; w <= 12; w++) {
    const div = document.createElement('div');
    div.id = `week${w}`;
    div.className = "carousel-container";
    div.innerHTML = `
          <div class="carousel">
            <div class="frame"><img src="https://placehold.co/400x250?text=Week+${w}+Image+1"></div>
            <div class="frame"><img src="https://placehold.co/400x250?text=Week+${w}+Image+2"></div>
            <div class="frame"><img src="https://placehold.co/400x250?text=Week+${w}+Image+3"></div>
          </div>
        `;
    document.getElementById('carousels').appendChild(div);
}