document.addEventListener('DOMContentLoaded', () => {
    // Canvases and contexts
    const postcard = document.getElementById('postcardCanvas');
    const bgCanvas = document.getElementById('backgroundCanvas');
    const bgCtx = bgCanvas.getContext('2d');
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');

    // Tools
    let drawing = false;
    let currentTool = 'pen';
    let penColor = '#d18222';
    let penSize = 3;
    let bgColor = '#ffffff';

    // Resize canvases to fit container
    function resizeCanvas() {
        const width = postcard.clientWidth;
        const height = postcard.clientHeight;

        canvas.width = width;
        canvas.height = height;

        bgCanvas.width = width;
        bgCanvas.height = height;

        // redraw background
        bgCtx.fillStyle = bgColor;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --------- Drag & Drop Icons ---------
    const sidebarIcons = document.querySelectorAll('.sidebar .draggable-icon');
    sidebarIcons.forEach(icon => {
        icon.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', icon.src);
        });
    });

    postcard.addEventListener('dragover', e => e.preventDefault());
    postcard.addEventListener('drop', e => {
        e.preventDefault();
        const src = e.dataTransfer.getData('text/plain');
        const rect = postcard.getBoundingClientRect();
        const x = e.clientX - rect.left - 25;
        const y = e.clientY - rect.top - 25;

        const img = document.createElement('img');
        img.src = src;
        img.classList.add('draggable-icon');
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.position = 'absolute';

        img.onmousedown = function (event) {
            const shiftX = event.clientX - img.getBoundingClientRect().left;
            const shiftY = event.clientY - img.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                img.style.left = pageX - shiftX - rect.left + 'px';
                img.style.top = pageY - shiftY - rect.top + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        };

        postcard.appendChild(img);
    });

    // --------- Drawing ---------
    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.lineWidth = penSize;
        ctx.lineCap = 'round';

        if (currentTool === 'pen') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = penColor;
        } else if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out'; // erase only strokes
            ctx.strokeStyle = 'rgba(0,0,0,1)';
        }

        ctx.stroke();
    });

    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mouseout', () => drawing = false);

    // --------- Controls ---------
    document.getElementById('penBtn').addEventListener('click', () => currentTool = 'pen');
    document.getElementById('eraserBtn').addEventListener('click', () => currentTool = 'eraser');
    document.getElementById('penSize').addEventListener('input', (e) => penSize = e.target.value);
    document.getElementById('penColor').addEventListener('input', (e) => penColor = e.target.value);
    document.getElementById('bgColor').addEventListener('input', (e) => {
        bgColor = e.target.value;
        bgCtx.fillStyle = bgColor;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    });

    document.getElementById('startOverBtn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        postcard.querySelectorAll('img.draggable-icon').forEach(img => img.remove());
        document.getElementById('message').value = '';
        bgColor = '#ffffff';
        bgCtx.fillStyle = bgColor;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        alert("Unfortunately, the cards are not downloadable yet... We suggest you screenshot the postcard :)");
    });

    // --------- Active button highlighting ---------
    const buttons = document.querySelectorAll('.postcard-controls button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --------- Pen size thumb ---------
    const slider = document.getElementById('penSize');
    const thumb = document.getElementById('thumb');

    function updateThumb() {
        const min = slider.min;
        const max = slider.max;
        const value = slider.value;

        const percent = (value - min) / (max - min);
        const sliderWidth = slider.offsetWidth;
        thumb.style.left = `${percent * sliderWidth}px`;

        const scale = 0.5 + value / 10;
        thumb.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    updateThumb();
    slider.addEventListener('input', updateThumb);
    window.addEventListener('resize', updateThumb);
});
