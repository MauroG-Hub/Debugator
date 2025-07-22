//import { PDFDocument, rgb } from 'pdf-lib';
  const { PDFDocument } = PDFLib;

const PDFFieldsName = {
  Numero: "Text38",
  SolicitadoPor: "Text1",
  Codigo: "Text6",
  Equipo: "Text5",
  Ubicacion: "Text7",
  Fecha: "Text8",
  Ciudad: "Text12",
  Cliente: "Text9",
  Seccion: "Text13",
  PersonaContacto: "Text46",
  Cargo: "Text14",
  Direccion: "Text11",
  Telefono: "Text15",
  MotivoSolicitud: "Text16",
  PlandeTrabajo: "Text13",
  DescripcionServicio: "Text13",

  dia1_fecha: "Text14",
  dia1_entrada: "Text15",
  dia1_salida: "Text16",
  dia1_descripcion: "Text17",

  dia2_fecha: "Text18",
  dia2_entrada: "Text19",
  dia2_salida: "Text20",
  dia2_descripcion: "Text21",

  dia3_fecha: "Text22",
  dia3_entrada: "Text23",
  dia3_salida: "Text24",
  dia3_descripcion: "Text25",

  dia4_fecha: "Text26",
  dia4_entrada: "Text27",
  dia4_salida: "Text28",
  dia4_descripcion: "Text29",

  FechaCliente: "Text30",
  FechaPerosnalAsistencia: "Text31"

};

let DataValidated = {
  Numero: "",
  SolicitadoPor: "",
  Codigo: "",
  Equipo: "",
  Ubicacion: "",
  Fecha: "",
  Ciudad: "",
  Cliente: "",
  Seccion: "",
  PersonaContacto: "",
  Cargo: "",
  Direccion: "",
  Telefono: "",
  MotivoSolicitud: "",
  PlandeTrabajo: "",
  DescripcionServicio: "",

  dia1_fecha: "",
  dia1_entrada: "",
  dia1_salida: "",
  dia1_descripcion: "",

  dia2_fecha: "",
  dia2_entrada: "",
  dia2_salida: "",
  dia2_descripcion: "",

  dia3_fecha: "",
  dia3_entrada: "",
  dia3_salida: "",
  dia3_descripcion: "",

  dia4_fecha: "",
  dia4_entrada: "",
  dia4_salida: "",
  dia4_descripcion: "",

  FechaCliente: "",
  FechaPerosnalAsistencia: ""

};

let DataRaw = {
  Numero: "",
  SolicitadoPor: "",
  Codigo: "",
  Equipo: "",
  Ubicacion: "",
  Fecha: "",
  Ciudad: "",
  Cliente: "",
  Seccion: "",
  PersonaContacto: "",
  Cargo: "",
  Direccion: "",
  Telefono: "",
  MotivoSolicitud: "",
  PlandeTrabajo: "",
  DescripcionServicio: "",

  dia1_fecha: "",
  dia1_entrada: "",
  dia1_salida: "",
  dia1_descripcion: "",

  dia2_fecha: "",
  dia2_entrada: "",
  dia2_salida: "",
  dia2_descripcion: "",

  dia3_fecha: "",
  dia3_entrada: "",
  dia3_salida: "",
  dia3_descripcion: "",

  dia4_fecha: "",
  dia4_entrada: "",
  dia4_salida: "",
  dia4_descripcion: "",

  FechaCliente: "",
  FechaPerosnalAsistencia: ""

};


document.getElementById('serviceReport').addEventListener('submit', function(e) {
      e.preventDefault();
      GeneratePDf();
    });

async function GeneratePDf(){
  GetDataRaw();
  ValidateData();
  const pdfBlob = await FillPDF();         // espera la creación del PDF
  await SendtoGdrive(pdfBlob);             // lo envía después
}

async function FillPDF() {
  // Carga el archivo PDF de plantilla
  const url = '/Layout/Layout1.pdf'; // ajusta según la ruta real
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  // Crea el documento desde el PDF existente
  const pdfDoc = await PDFDocument.load(existingPdfBytes);




    // Obtener el formulario del PDF
    const form = pdfDoc.getForm();

    // Obtener todos los campos del formulario
    const fields = form.getFields();

  form.getTextField(PDFFieldsName.Numero).setText(DataValidated.Numero);
  form.getTextField(PDFFieldsName.SolicitadoPor).setText(DataValidated.SolicitadoPor);
  form.getTextField(PDFFieldsName.Codigo).setText(DataValidated.Codigo);
  form.getTextField(PDFFieldsName.Equipo).setText(DataValidated.Equipo);
  form.getTextField(PDFFieldsName.Ubicacion).setText(DataValidated.Ubicacion);
  form.getTextField(PDFFieldsName.Fecha).setText(DataValidated.Fecha);
  form.getTextField(PDFFieldsName.Ciudad).setText(DataValidated.Ciudad);
  form.getTextField(PDFFieldsName.Cliente).setText(DataValidated.Cliente);
  form.getTextField(PDFFieldsName.Seccion).setText(DataValidated.Seccion);
  form.getTextField(PDFFieldsName.PersonaContacto).setText(DataValidated.PersonaContacto);
  form.getTextField(PDFFieldsName.Cargo).setText(DataValidated.Cargo);
  form.getTextField(PDFFieldsName.Direccion).setText(DataValidated.Direccion);
  form.getTextField(PDFFieldsName.Telefono).setText(DataValidated.Telefono);
  form.getTextField(PDFFieldsName.MotivoSolicitud).setText(DataValidated.MotivoSolicitud);
  form.getTextField(PDFFieldsName.PlandeTrabajo).setText(DataValidated.PlandeTrabajo);
  form.getTextField(PDFFieldsName.DescripcionServicio).setText(DataValidated.DescripcionServicio);

  form.getTextField(PDFFieldsName.dia1_fecha).setText(DataValidated.dia1_fecha);
  form.getTextField(PDFFieldsName.dia1_entrada).setText(DataValidated.dia1_entrada);
  form.getTextField(PDFFieldsName.dia1_salida).setText(DataValidated.dia1_salida);
  form.getTextField(PDFFieldsName.dia1_descripcion).setText(DataValidated.dia1_descripcion);

  form.getTextField(PDFFieldsName.dia2_fecha).setText(DataValidated.dia2_fecha);
  form.getTextField(PDFFieldsName.dia2_entrada).setText(DataValidated.dia2_entrada);
  form.getTextField(PDFFieldsName.dia2_salida).setText(DataValidated.dia2_salida);
  form.getTextField(PDFFieldsName.dia2_descripcion).setText(DataValidated.dia2_descripcion);

  form.getTextField(PDFFieldsName.dia3_fecha).setText(DataValidated.dia3_fecha);
  form.getTextField(PDFFieldsName.dia3_entrada).setText(DataValidated.dia3_entrada);
  form.getTextField(PDFFieldsName.dia3_salida).setText(DataValidated.dia3_salida);
  form.getTextField(PDFFieldsName.dia3_descripcion).setText(DataValidated.dia3_descripcion);

  form.getTextField(PDFFieldsName.dia4_fecha).setText(DataValidated.dia4_fecha);
  form.getTextField(PDFFieldsName.dia4_entrada).setText(DataValidated.dia4_entrada);
  form.getTextField(PDFFieldsName.dia4_salida).setText(DataValidated.dia4_salida);
  form.getTextField(PDFFieldsName.dia4_descripcion).setText(DataValidated.dia4_descripcion);

  form.getTextField(PDFFieldsName.FechaCliente).setText(DataValidated.FechaCliente);
  form.getTextField(PDFFieldsName.FechaPerosnalAsistencia).setText(DataValidated.FechaPerosnalAsistencia);

  
form.getFields().forEach(field => field.enableReadOnly());

  // Guarda el PDF generado
  const pdfBytes = await pdfDoc.save();

  // Descargarlo (modo navegador) o guardarlo (modo Capacitor)
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const urlBlob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = urlBlob;

  a.download = 'reporte-servicio.pdf';
  a.click();

  return blob;
}

function GetDataRaw() {
  const form = document.getElementById('serviceReport');
  const formData = new FormData(form);

  for (const key in DataRaw) {
    if (formData.has(key)) {
      DataRaw[key] = formData.get(key);
    }
  }
}

function ValidateData(){

}



async function SendtoGdrive(blob) {
  const formData = new FormData();
  formData.append("file", blob, "reporte-servicio.pdf");

  const response = await fetch("https://reporter-4k2k.onrender.com/upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Subido a Google Drive. ID:", result.fileId);
  } else {
    console.error("Error al subir:", await response.text());
  }
}
