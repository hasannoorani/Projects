async function mergePDFs() {
    const mergeInput = document.getElementById('mergeInput');
    const files = mergeInput.files;
    if (files.length === 0) {
        alert('Please select PDF files to merge.');
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();
    for (const file of files) {
        if (file.type !== "application/pdf") {
            alert(`File ${file.name} is not a PDF.`);
            continue;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const donorPdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const donorPages = await pdfDoc.copyPages(donorPdfDoc, donorPdfDoc.getPageIndices());
            donorPages.forEach((page) => {
                pdfDoc.addPage(page);
            });
        } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            alert(`Failed to process file ${file.name}.`);
        }
    }

    const mergedPdfBytes = await pdfDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const mergeResult = document.getElementById('mergeResult');
    mergeResult.innerHTML = `<a href="${url}" download="merged.pdf" class="btn btn-info">Download Merged PDF</a>`;
}

async function splitPDF() {
    const splitInput = document.getElementById('splitInput');
    const file = splitInput.files[0];
    if (!file) {
        alert('Please select a PDF file to split.');
        return;
    }

    if (file.type !== "application/pdf") {
        alert('Selected file is not a PDF.');
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const numPages = pdfDoc.getPageCount();

        for (let i = 0; i < numPages; i++) {
            const newPdfDoc = await PDFLib.PDFDocument.create();
            const [page] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(page);
            const newPdfBytes = await newPdfDoc.save();
            const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const splitResult = document.getElementById('splitResult');
            splitResult.innerHTML += `<a href="${url}" download="split_page_${i + 1}.pdf" class="btn btn-info">Download Page ${i + 1}</a><br>`;
        }
    } catch (error) {
        console.error('Error splitting PDF:', error);
        alert('Failed to split the PDF file.');
    }
}