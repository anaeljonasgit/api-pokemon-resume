const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Use /pokemon/{pokemon_name_or_id} para acessar um Pokemón.');
});

app.get('/pokemon/:pokemon_name_or_id', async (req, res) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemon_name_or_id}`)
        .then(response => {
            if (response.data) {
                let { id, name, abilities, height, weight } = response.data;

                return res.status(200).send({
                    id, name, abilities, height, weight
                });
            };

            return res.status(400).send({ error: 'Nada encontrado' });
        }).catch(error => {
            res.status(400).send({ error });
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log({ server: 'Server online' });
});