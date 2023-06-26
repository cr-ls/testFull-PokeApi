import express, { Request, Response } from 'express';
import axios from 'axios';
import { generatePokemonPDF } from './pdfGenerator';

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware para procesar el body en las solicitudes POST
app.use(express.json());

// Endpoint GET para obtener los pokemons
app.get('/pokemons', async (req: Request, res: Response) => {
    try {
        const { limit, page, search } = req.query;
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

        const response = await axios.get(apiUrl, {
            params: {
                limit,
                offset: String((Number(page) - 1) * Number(limit)),
            },
        });

        let pokemons = response.data.results;

        if (search) {
            const searchRegex = new RegExp(String(search), 'i');
            pokemons = pokemons.filter((pokemon: { name: string }) =>
                searchRegex.test(pokemon.name)
            );
        }

        pokemons.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );

        res.json(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
});

// Endpoint POST para generar el archivo PDF del pokemon
app.post('/pokemon', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await axios.get(apiUrl);
        const pokemon = response.data;

        if (!pokemon) {
            res.status(404).json({ error: 'Pokemon no encontrado' });
            return;
        }

        const stream = generatePokemonPDF(pokemon);
        stream.on('finish', () => {
            res.sendFile(`${pokemon.name}.pdf`, { root: __dirname });
        });

        res.setHeader('Content-Disposition', `attachment; filename=${pokemon.name}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        const pdf = generatePokemonPDF(pokemon);
        res.send(pdf);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
