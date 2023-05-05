import express from 'express';
import cors from 'cors';
import {PizzaService} from './src/services/pizzas-services.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`)
})


app.get('/pizza/:id', async (req,res) => {
    const pizza = await PizzaService.getById(req.params.id)
    res.status(200).send(pizza)
})

app.get('/pizza', async (req, res) => {
    const pizza = await PizzaService.getAll()
    res.status(200).send(pizza)
})

app.post('/pizza', async (req, res) => {
    console.log("en post, req:", req)
    try {
        await PizzaService.insert(req.body)
        res.status(200).json({message: 'Pizza creada'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:  'Fallo el insert'});
    }
})

app.put('/pizza', async (req, res) => {
    try{
        await PizzaService.update(req.body)
        res.status(200).json({message: 'Pizza actualizada'});

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Fallo el update'});
    }
})

app.delete('/pizza/:id', async (req, res) => {
    try {
        let lol = await PizzaService.deleteById(req.params.id)
        console.log(lol);
        res.status(200).json({message: 'Pizza eliminada !!!'});
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Fallo el delete'});
    }
})