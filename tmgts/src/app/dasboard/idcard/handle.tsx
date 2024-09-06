

handleExport() {
    const invoiceContentElement=document.getElementById('invoice_container') as HTMLElement;
    html2canvas(invoiceContentElement, {}).then(canvas=>{
    // is convert the canvas into base64 string url
    const imgData=canvas.toDataURL('image/png');
    // page width
    const pageWidth=210;
    const pageHeight=297;
    // calcuate the image actual height to fit with canvas and pdf
    const height=canvas.height*pageWidth/canvas.width;
    // initialize the PDF
    const pdf=new jsPDF("p", "mm", "a4");
    // add the image into pdf
    pdf.addImage(imgData, 'PNG,0,0, pageWidth, height);
    
    Pdf.save('id.pdf')


    }
}
    