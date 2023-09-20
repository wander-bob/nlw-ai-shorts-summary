import {summaryExample} from './utils/summary.js';
import { pipeline } from "@xenova/transformers";

export async function summarize(text){
  console.log(text);
  try {
    // return summaryExample;
    console.log('Resumindo o conteúdo...');

    const generator = await pipeline(
      'summarization', 
      'Xenova/distilbart-cnn-12-6'
    );
    const output = await generator(text);
    
    console.log('Resumo finalizado.');
    
    return output[0].summary_text

  } catch (error) {
    console.log('Não foi possível realizar o resumo', error);
    throw new Error(error);
  }
}