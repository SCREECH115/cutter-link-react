import {Request, Response} from 'express';
import axios from 'axios';

const exrpess = require('express');
const app = exrpess();
const port = 3000;

app.get('/:id', async (req:Request, res:Response) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8090/api/collections/links/records/${req.params.id}`)
    res.redirect(response.data.input)
  } catch (error) {
    res.redirect('http://localhost:5173')
  }
})

app.get('/', async (req:Request, res:Response) => {
  try {
    const response = await axios.get(`http://127.0.0.1":8090/api/collections/links/records`)
    console.log(response);
    res.send(200)
  } catch(err){
    res.redirect('http://localhost:5173')
  }
})

app.listen(port, () => {
   console.log(`Server is on on port ${port}`);
})