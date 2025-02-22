document.getElementById('removeBgBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    const originalImage = document.getElementById('originalImage');
    const outputImage = document.getElementById('outputImage');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!fileInput.files[0]) {
        alert("Please upload an image");
        return;
    }

    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);
    formData.append('size', 'auto');

    try {
        // Display original image
        const reader = new FileReader();
        reader.onload = () => {
            originalImage.src = reader.result;
        };
        reader.readAsDataURL(fileInput.files[0]);

        // API call to remove background
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: "POST",
            headers: {
               'X-Api-Key': ""
            },
            body: formData,
        });

        console.log(response); // Debugging

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Display output image
        outputImage.src = url;
        outputImage.style.display = "block"; // Ensure it's visible

        // Enable download button
        downloadBtn.classList.remove('hidden');
        downloadBtn.onclick = () => {
            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.download = 'background-removed.png';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(url);
        };

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove background. Please try again.');
    }
});
