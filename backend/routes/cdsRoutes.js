const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/post', async (req, res) => {
    const {nome, genero, preco} = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO cds(nome, genero, preco) VALUES (?, ?, ?);',
            [nome, genero, preco]
        );

        res.status(201).json({message: 'CD cadastrado com sucesso!'});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM cds;'
        );

        if(rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({message: 'Credenciais inválidas!'});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, genero, preco} = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE cds SET nome = ?, genero = ?, preco = ? WHERE id = ?',
            [nome, genero, preco, id]
        );

        if(result.affectedRows > 0) {
            res.status(201).json({message: 'CD atualizado com sucesso!'});
        } else {
            res.status(404).json({message: 'CD não encontrado'});
        }

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM cds WHERE id = ?',
            [id]
        );
        
        if(result.affectedRows > 0) {
            res.status(201).json({message: 'CD deletado com sucesso!'});
        } else {
            res.status(404).json({message: 'CD não encontrado'});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;