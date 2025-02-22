let images = [];

document.getElementById('imageInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const files = event.target.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgSrc = e.target.result;
            images.push({ src: imgSrc, file });
            displayImages();
        };
        reader.readAsDataURL(file);
    }
}

function displayImages() {
    const container = document.getElementById('imagePreviewContainer');
    container.innerHTML = ''; // Clear previous previews

    images.forEach((image, index) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-preview');
        imageWrapper.draggable = true;
        imageWrapper.addEventListener('dragstart', (e) => handleDragStart(e, index));
        imageWrapper.addEventListener('dragover', (e) => e.preventDefault());
        imageWrapper.addEventListener('drop', (e) => handleDrop(e, index));

        const img = document.createElement('img');
        img.src = image.src;
        imageWrapper.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.innerText = 'X';
        removeBtn.onclick = () => removeImage(index);
        imageWrapper.appendChild(removeBtn);

        container.appendChild(imageWrapper);
    });
}

function removeImage(index) {
    images.splice(index, 1);
    displayImages();
}

function handleDragStart(event, index) {
    event.dataTransfer.setData('text/plain', index);
}

function handleDrop(event, dropIndex) {
    const dragIndex = event.dataTransfer.getData('text');
    if (dragIndex !== dropIndex) {
        const draggedImage = images.splice(dragIndex, 1)[0];
        images.splice(dropIndex, 0, draggedImage);
        displayImages();
    }
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    if (images.length === 0) {
        alert("Please select at least one image.");
        return;
    }

    for (let i = 0; i < images.length; i++) {
        const img = await loadImage(images[i].file);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgAspectRatio = img.width / img.height;

        let imgWidth = img.width;
        let imgHeight = img.height;

        if (imgWidth > pdfWidth || imgHeight > pdfHeight) {
            if (imgAspectRatio > 1) {
                imgWidth = pdfWidth * 0.8;
                imgHeight = imgWidth / imgAspectRatio;
            } else {
                imgHeight = pdfHeight * 0.8;
                imgWidth = imgHeight * imgAspectRatio;
            }
        }

        const xOffset = (pdfWidth - imgWidth) / 2;
        const yOffset = (pdfHeight - imgHeight) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(img, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
    }

    pdf.save("images.pdf");
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => resolve(img);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
