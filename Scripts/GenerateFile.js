//import { PDFDocument, rgb } from 'pdf-lib';
  const { PDFDocument } = PDFLib;

document.getElementById('serviceReport').addEventListener('submit', function(e) {
      e.preventDefault();
      llenarPDF();
    });

async function llenarPDF() {
  // Carga el archivo PDF de plantilla
  const url = '/Layout/Layout1.pdf'; // ajusta según la ruta real
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  // Crea el documento desde el PDF existente
  const pdfDoc = await PDFDocument.load(existingPdfBytes);




    // Obtener el formulario del PDF
    const form = pdfDoc.getForm();

    // Obtener todos los campos del formulario
    const fields = form.getFields();

    form.getTextField('Text1').setText('Text1');
form.getTextField('Text5').setText('Text5');
form.getTextField('Text6').setText('Text6');
form.getTextField('Text7').setText('Text7');
form.getTextField('Text8').setText('Text8');
form.getTextField('Text9').setText('Text9');
form.getTextField('Text11').setText('Text11');
form.getTextField('Text12').setText('Text12');
form.getTextField('Text13').setText('Text13');
form.getTextField('Text14').setText('Text14');
form.getTextField('Text15').setText('Text15');
form.getTextField('Text16').setText('Text16');
form.getTextField('Text17').setText('Text17');
form.getTextField('Text18').setText('Text18');
form.getTextField('Text19').setText('Text19');
form.getTextField('Text20').setText('Text20');
form.getTextField('Text21').setText('Text21');
form.getTextField('Text22').setText('Text22');
form.getTextField('Text23').setText('Text23');
form.getTextField('Text24').setText('Text24');
form.getTextField('Text25').setText('Text25');
form.getTextField('Text26').setText('Text26');
form.getTextField('Text27').setText('Text27');
form.getTextField('Text28').setText('Text28');
form.getTextField('Text29').setText('Text29');
form.getTextField('Text30').setText('Text30');
form.getTextField('Text31').setText('Text31');
form.getTextField('Text32').setText('Text32');
form.getTextField('Text33').setText('Text33');
form.getTextField('Text34').setText('Text34');
form.getTextField('Text35').setText('Text35');
form.getTextField('Text36').setText('Text36');
form.getTextField('Text37').setText('Text37');
form.getTextField('Text38').setText('Text38');
form.getTextField('Text46').setText('Text46');

  
//form.getFields().forEach(field => field.enableReadOnly());
form.getFields().forEach(field => field.enableReadOnly());
form.flatten();

  // Guarda el PDF generado
  const pdfBytes = await pdfDoc.save();

  // Descargarlo (modo navegador) o guardarlo (modo Capacitor)
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const urlBlob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = urlBlob;
  a.download = 'reporte-servicio.pdf';
  a.click();
}
