const uploadInput = document.getElementById('uploadInput');
const uploadZone = document.getElementById('uploadZone');
const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');
const btnSalveaza = document.getElementById('btnSalveaza');
const btnCrop = document.getElementById('btnCrop');
const btnEfecte = document.getElementById('btnEfecte');
const efecte = document.getElementById('efecte');
const btnStergere = document.getElementById('btnStergere');
const btnScalare = document.getElementById('btnScalare');
const scaleInputForm = document.getElementById('scaleInputForm');
const newWidth = document.getElementById('Width');
const newHeight = document.getElementById('Height');
const btnApply2 = document.getElementById('btnApply2');
const btnAdaugaText = document.getElementById('btnAdaugaText');
const textInputForm = document.getElementById('textInputForm');
const Text = document.getElementById('Text');
const FontSize = document.getElementById('FontSize');
const TextColor = document.getElementById('TextColor');
const btnApply = document.getElementById('btnApply');
const btnHistogram = document.getElementById('btnHistogram');
const histogramCanvas = document.getElementById('histogramCanvas');
const ctxHistogram = histogramCanvas.getContext('2d');

let img = new Image(); 

//AFISAREA IMAGINII 
function displayImage(image) {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
}


uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});



uploadZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadZone.classList.add('dragging');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragging');
});

uploadZone.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadZone.classList.remove('dragging');
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});



img.onload = () => {
    displayImage(img);
};


//SALVARE
btnSalveaza.addEventListener('click', () => {
    if (canvas.toDataURL()) {
        const link = document.createElement('a');
        link.download = 'edit.png'; 
        link.href = canvas.toDataURL(); 
        link.click(); 
    } else {
        alert('Nu exista nicio imagine pe canvas pentru a putea fi salvata!');
    }
}); 


//SELECTIE
let imageLoaded = false;
let selecting = false;
let selectionStartX = 0;
let selectionStartY = 0;
let selectionEndX = 0;
let selectionEndY = 0;
let isMovingSelection = false; 
let offsetX = 0, offsetY = 0;


img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    imageLoaded = true;
};

function getMousePos(event) {
    const rect = photoCanvas.getBoundingClientRect();
    const scaleX = photoCanvas.width / rect.width; 
    const scaleY = photoCanvas.height / rect.height; 
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}


photoCanvas.addEventListener('mousedown', (event) => {
    if (!imageLoaded) return;

    const mousePos = getMousePos(event);

    if (
        event.shiftKey && 
        mousePos.x >= selectionStartX &&
        mousePos.x <= selectionStartX + selectionWidth &&
        mousePos.y >= selectionStartY &&
        mousePos.y <= selectionStartY + selectionHeight
    ) {
       
        isMovingSelection = true;
        offsetX = mousePos.x - selectionStartX;
        offsetY = mousePos.y - selectionStartY;
    } else {
        
        selectionStartX = mousePos.x;
        selectionStartY = mousePos.y;
        selectionWidth = 0;
        selectionHeight = 0;
        isSelecting = true;
    }
});


photoCanvas.addEventListener('mousemove', (event) => {
    if (!imageLoaded) return;

    const mousePos = getMousePos(event);

    if (isMovingSelection) {
       
        const newX = mousePos.x - offsetX;
        const newY = mousePos.y - offsetY;

        ctx.drawImage(img, 0, 0); 
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setLineDash([6]);
        ctx.strokeRect(newX, newY, selectionWidth, selectionHeight);

        
        selectionStartX = newX;
        selectionStartY = newY;
    } else if (isSelecting) {
      
        selectionWidth = mousePos.x - selectionStartX;
        selectionHeight = mousePos.y - selectionStartY;

        ctx.drawImage(img, 0, 0); 
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setLineDash([6]);
        ctx.strokeRect(selectionStartX, selectionStartY, selectionWidth, selectionHeight);
    }
});


photoCanvas.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
    } else if (isMovingSelection) {
        isMovingSelection = false;
    }
});

//STERGE SELECTIA
btnStergere.addEventListener('click', () => {
    if (selectionWidth === 0 || selectionHeight === 0) {
        alert('Nu ati selectat nimic pentru a fi sters!');
        return;
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(selectionStartX, selectionStartY, selectionWidth, selectionHeight);

    selectionStartX = 0;
    selectionStartY = 0;
    selectionWidth = 0;
    selectionHeight = 0;

    alert('Selectia a fost stearsa!');
});

//CROP
btnCrop.addEventListener('click', () => {
    if (selectionWidth === 0 || selectionHeight === 0) {
        alert('Te rog selecteaza o zona din imagine pentru a efectua un crop!');
        return;
    }
    const croppedImageData = ctx.getImageData(
        selectionStartX,
        selectionStartY,
        selectionWidth,
        selectionHeight
    );

    photoCanvas.width = selectionWidth;
    photoCanvas.height = selectionHeight;

    ctx.putImageData(croppedImageData, 0, 0);

    selectionStartX = 0;
    selectionStartY = 0;
    selectionWidth = 0;
    selectionHeight = 0;

});

//EFECTE
btnEfecte.addEventListener('click', () => {
    efecte.style.display = efecte.style.display === 'none' ? 'block' : 'none';
});

efecte.addEventListener('change', () => {
    const efect = efecte.value;
    if (!efect) {
        alert('Te rog selectează un efect.');
        return;
    }

    if (selectionWidth === 0 || selectionHeight === 0) {
        alert('Te rog selectează o zona din imagine pentru a aplica un efect.');
        return;
    }

    const imageData = ctx.getImageData(
        selectionStartX,
        selectionStartY,
        selectionWidth,
        selectionHeight
    );
    const data = imageData.data;

    switch (efect) {
        case 'black-and-white': 
            for (let i = 0; i < data.length; i += 4) {
                const media = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = media; 
                data[i + 1] = media; 
                data[i + 2] = media; 
            }
            break;

        case 'invert': 
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i]; 
                data[i + 1] = 255 - data[i + 1]; 
                data[i + 2] = 255 - data[i + 2]; 
            }
            break;

        case 'brightness':
            const brightness =100; 
            for (let i = 0; i < data.length; i += 4) {
                data[i] += brightness; 
                data[i + 1] += brightness; 
                data[i + 2] += brightness; 
            }
            break;

        case 'darkness':
            const darkness = 100; 
            for (let i = 0; i < data.length; i += 4) {
                data[i] -= darkness; 
                data[i + 1] -= darkness; 
                data[i + 2] -= darkness; 
            }
            break;

        default:
            alert('Te rog selecteaza alt efect!');
            return;
    }

    ctx.putImageData(imageData, selectionStartX, selectionStartY);
    alert('Efect aplicat!');
});


//ADAUGA TEXT
let clickX = 0;
let clickY = 0;

btnAdaugaText.addEventListener('click', () => {
    textInputForm.style.display = 'block';
});


canvas.addEventListener('click', (e) => {
    if (!imageLoaded) {
        alert('Nu ati incarcat nicio imagine!');
        return;
    }

    const rect = canvas.getBoundingClientRect();
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;


});

btnApply.addEventListener('click', () => {

    const text = Text.value.trim();
    const fontSize = parseInt(FontSize.value, 10);
    const textColor = TextColor.value;

    if (text === '') {
        alert('Te rog sa introduci un text!');
        return;
    }

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor;

    ctx.fillText(text, clickX, clickY);

    textInputForm.style.display = 'none';
});


//SCALARE
btnScalare.addEventListener('click', () => {
    scaleInputForm.style.display = 'block';
});


btnApply2.addEventListener('click', () => {
    if (!imageLoaded) {
        alert('Te rog incarca o imagine!');
        return;
    }

    const newWidth = parseFloat(Width.value);
    const newHeight = parseFloat(Height.value);

    let scaledW, scaledH;

    if (newWidth && !newHeight) {
        scaledW = newWidth;
        scaledH = (img.height / img.width) * newWidth;
    } else if (newHeight && !newWidth) {
        scaledH = newHeight;
        scaledW = (img.width / img.height) * newHeight;
    } else {
        alert('Te rog sa introduci fie latimea, fie inaltimea!');
        return;
    }

    canvas.width = scaledW;
    canvas.height = scaledH;
    ctx.drawImage(img, 0, 0, scaledW, scaledH);

    Width.value = '';
    Height.value = '';
    scaleInputForm.style.display = 'none';
});



//HISTOGRAMA
function calcHistogram(x, y, width, height) {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;

    const histogram = {
        red: new Array(256).fill(0),
        green: new Array(256).fill(0),
        blue: new Array(256).fill(0)
    };

    for (let i = 0; i < data.length; i += 4) {
        histogram.red[data[i]]++;
        histogram.green[data[i + 1]]++;
        histogram.blue[data[i + 2]]++;
    }

    return histogram;
}

function drawHistogram(histogram) {
    ctxHistogram.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);

    const colors = ['red', 'green', 'blue'];
    const maxCount = Math.max(
        ...histogram.red,
        ...histogram.green,
        ...histogram.blue
    );

    const barWidth = histogramCanvas.width / 256;

    colors.forEach((color, colorIndex) => {
        ctxHistogram.fillStyle = color;

        const data = histogram[color];
        for (let i = 0; i < data.length; i++) {
            const barHeight = (data[i] / maxCount) * histogramCanvas.height;
            ctxHistogram.fillRect(
                i * barWidth,
                histogramCanvas.height - barHeight,
                barWidth,
                barHeight
            );
        }
    });
}

btnHistogram.addEventListener('click', () => {

    const histogram = calcHistogram(
        selectionStartX,
        selectionStartY,
        selectionWidth,
        selectionHeight
    );
    drawHistogram(histogram);
});