import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit';

export function generatePokemonPDF(pokemon: any) {
  const doc = new PDFDocument();
  const stream = doc.pipe(createWriteStream(`${pokemon.name}.pdf`));

  doc.font('Helvetica-Bold').fontSize(24).text(pokemon.name, { align: 'center' });
  doc.image(pokemon.sprites.front_default, { width: 200, height: 200, align: 'center' });
  // Añade más información del pokemon al archivo PDF si lo deseas

  doc.end();
  
  return stream;
}
