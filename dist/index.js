"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const pdfGenerator_1 = require("./pdfGenerator");
const app = (0, express_1.default)();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas
// Middleware para procesar el body en las solicitudes POST
app.use(express_1.default.json());
// Endpoint GET para obtener los pokemons
app.get('/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, search } = req.query;
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
        const response = yield axios_1.default.get(apiUrl, {
            params: {
                limit,
                offset: String((Number(page) - 1) * Number(limit)),
            },
        });
        let pokemons = response.data.results;
        if (search) {
            const searchRegex = new RegExp(String(search), 'i');
            pokemons = pokemons.filter((pokemon) => searchRegex.test(pokemon.name));
        }
        pokemons.sort((a, b) => a.name.localeCompare(b.name));
        res.json(pokemons);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
}));
// Endpoint POST para generar el archivo PDF del pokemon
app.post('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = yield axios_1.default.get(apiUrl);
        const pokemon = response.data;
        if (!pokemon) {
            res.status(404).json({ error: 'Pokemon no encontrado' });
            return;
        }
        const stream = (0, pdfGenerator_1.generatePokemonPDF)(pokemon);
        stream.on('finish', () => {
            res.sendFile(`${pokemon.name}.pdf`, { root: __dirname });
        });
        res.setHeader('Content-Disposition', `attachment; filename=${pokemon.name}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        const pdf = (0, pdfGenerator_1.generatePokemonPDF)(pokemon);
        res.send(pdf);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
}));
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
