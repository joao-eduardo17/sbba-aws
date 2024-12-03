const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cdsRoutes = require('./routes/cdsRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/cds', cdsRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serviço rodando na porta ${PORT}`);
});