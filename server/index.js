import cors from 'cors';
import express from 'express';

import { convert } from "./convert.js";
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/summary/:id', async (request, response)=>{
  try{
    const {id} = request.params;
    await download(id)
    .then(async data => {
      console.log(data)
      if(data.status === 'Done'){
        const audioConverted = await convert();
        const result = await transcribe(audioConverted);

        return response.status(200).json({
          message: `Download do vídeo realizado com sucesso.`,
          result,
        });       
      }else{
        return response.status(400).json({
          message: `Failed`,
          result: data.status,
        });
      }
    });
  }catch(error){
    return response.status(400).json({
      message: `Failed`,
      result: error,
    });
  }
});

app.post('/summary', async (request, response)=>{
  try{
    const result = await summarize(request.body.text);
    return response.json({result});
  }catch(error){
    console.log(error);
    return response.json({error});
  }
});
app.listen(3333, ()=>{
  console.log(`Server running on port 3333.`);
});