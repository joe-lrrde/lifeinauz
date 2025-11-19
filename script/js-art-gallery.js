        const canvas = document.getElementById('pixelCanvas');
        const ctx = canvas.getContext('2d');

        let pixelSize = 20;
        let drawing = false;
        let ephemere = false;
        let erasing = false;

        const palettes = [
            ['#c6eaf9', '#b7a9f7', '#b9e0e5', '#52bfd0', '#e5c8f7'], // water
            ['#de5458', '#c16d24', '#fafad2', '#9c5b45', '#dddda0'], // fire
            ['#81dd79', '#2ebd7f', '#37c841', '#496a3d', '#0e350c']  // forrest
        ];

        let currentPalette = palettes[0];

        let fullRandom = false;

        function getRandomColor() {
            if (fullRandom) {
                // Combine all palettes into one array
                const allColors = palettes.flat();
                return allColors[Math.floor(Math.random() * allColors.length)];
            } else {
                return currentPalette[Math.floor(Math.random() * currentPalette.length)];
            }
        }

        function drawPixel(x, y) {
            if (erasing) {
                ctx.clearRect(x, y, pixelSize, pixelSize);
            } else {
                const color = getRandomColor();
                ctx.fillStyle = color;
                ctx.fillRect(x, y, pixelSize, pixelSize);
                if (ephemere) {
                    setTimeout(() => ctx.clearRect(x, y, pixelSize, pixelSize), 2000);
                }
            }
        }

        // Event listeners
        canvas.addEventListener('mousedown', () => drawing = true);
        canvas.addEventListener('mouseup', () => drawing = false);
        canvas.addEventListener('mouseleave', () => drawing = false);
        document.getElementById('fullRandom').addEventListener('click', e => {
            fullRandom = !fullRandom;
            e.target.textContent = `Full Random: ${fullRandom ? 'ON' : 'OFF'}`;
        });


        canvas.addEventListener('mousemove', e => {
            if (drawing) {
                const rect = canvas.getBoundingClientRect();
                const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
                const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;
                drawPixel(x, y);
            }
        });

        canvas.addEventListener('click', e => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
            const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;
            drawPixel(x, y);
        });

        // Controls
        document.getElementById('biggerPixel').addEventListener('click', () => { if (pixelSize < 100) pixelSize += 5; });
        document.getElementById('smallerPixel').addEventListener('click', () => { if (pixelSize > 5) pixelSize -= 5; });
        document.getElementById('toggleEphemere').addEventListener('click', (e) => {
            ephemere = !ephemere;
            e.target.textContent = `Ephemere: ${ephemere ? 'ON' : 'OFF'}`;

            if (ephemere) {
                // Change page background when Ephemere is ON
                document.body.style.background = '#f3e7f7'; // light purple pastel
            } else {
                // Revert page background when Ephemere is OFF
                document.body.style.background = '#f7f2f9'; // original background
            }
        });
        document.getElementById('eraser').addEventListener('click', e => {
            erasing = !erasing;
            e.target.textContent = `Eraser: ${erasing ? 'ON' : 'OFF'}`;
        });

        // Palette selection


        document.querySelectorAll('.palette-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                const index = parseInt(swatch.dataset.palette);
                currentPalette = palettes[index];
                document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
            });
        });

        // Fill canvas background white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
