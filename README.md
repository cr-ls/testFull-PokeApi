# testFull PokeApi

Este ejercicio es una API construida con NodeJS, Express y TypeScript que consume la PokeAPI para obtener información sobre los Pokémon. La API tiene dos endpoints: uno para obtener una lista de Pokémon ordenada alfabéticamente y otro para generar archivos PDF con información básica de un Pokémon específico.

# Requisitos
Es necesario tener instalados las siguientes dependencias: 
 - Express
 - Typescript
 - ts-node
 - axios
 - pdfkit

# Instalación 
- Clona el repositorio
- Instala las dependencias.
```
npm install express typescript ts-node axios pdfkit
```
- Inicia el servidor. (Para esto debes de estar posicionado en el directorio 'dist' 
```
cd .\dist\
npx ts-node index.js
```


# Uso
- Obtener una lista de Pokémon
Método: GET
URL: /pokemons
Endpoint para obtener una lista de Pokémon. Puedes usar los siguientes parámetros de consulta (query parameters):

1. limit (opcional): Limita el número de Pokémon por página (valor por defecto: 20).
2. page (opcional): Especifica el número de página para la paginación (valor por defecto: 1).
3. search (opcional): Realiza una búsqueda parcial por nombre de Pokémon.

- Generar un archivo PDF de un Pokémon
Método: POST
URL: /pokemon
Endpoint para generar un archivo PDF con información básica de un Pokémon específico. El nombre del Pokémon debe proporcionarse en el cuerpo (body) de la solicitud

Ejemplo: 
```
POST /pokemon

Body:
{
  "name": "pikachu"
}
```
La respuesta tendra el archivo PDF para descargar.
