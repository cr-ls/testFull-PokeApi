"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePokemonPDF = void 0;
const fs_1 = require("fs");
const pdfkit_1 = __importDefault(require("pdfkit"));
function generatePokemonPDF(pokemon) {
    const doc = new pdfkit_1.default();
    const stream = doc.pipe((0, fs_1.createWriteStream)(`${pokemon.name}.pdf`));
    doc.font('Helvetica-Bold').fontSize(24).text(pokemon.name, { align: 'center' });
    doc.image(pokemon.sprites.front_default, { width: 200, height: 200, align: 'center' });
    // Añade más información del pokemon al archivo PDF si lo deseas
    doc.end();
    return stream;
}
exports.generatePokemonPDF = generatePokemonPDF;
