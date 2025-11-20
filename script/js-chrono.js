        let currentFrames = [];
        let currentIndex = 0;
        function openWeek(weekNumber) {
            document.querySelectorAll('.carousel-container').forEach(car => car.style.display = 'none');
            const container = document.getElementById(`week${weekNumber}`);
            container.style.display = 'flex';
            document.getElementById('closeBtn').style.display = 'block';
            currentFrames = Array.from(container.querySelectorAll('.frame'));
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
        document.addEventListener('click', function (e) {
            const frame = e.target.closest('.frame');
            if (frame && frame.dataset.src) {
                currentIndex = currentFrames.indexOf(frame);
                openTextPanel(frame.dataset.title, frame.dataset.desc, frame.dataset.src);
            }
        });
        document.getElementById('prevArrow').addEventListener('click', function () {
            if (currentFrames.length === 0) return;
            currentIndex = (currentIndex - 1 + currentFrames.length) % currentFrames.length;
            const frame = currentFrames[currentIndex];
            openTextPanel(frame.dataset.title, frame.dataset.desc, frame.dataset.src);
        });
        document.getElementById('nextArrow').addEventListener('click', function () {
            if (currentFrames.length === 0) return;
            currentIndex = (currentIndex + 1) % currentFrames.length;
            const frame = currentFrames[currentIndex];
            openTextPanel(frame.dataset.title, frame.dataset.desc, frame.dataset.src);
        });
