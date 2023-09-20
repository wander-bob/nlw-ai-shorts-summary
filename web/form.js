import { server } from "./server.js";

const form = document.querySelector('#form');
const inputUrl = document.querySelector('#url');
const content = document.querySelector('#content');
form.addEventListener('submit', async (event)=>{
  event.preventDefault();
  
  content.classList.add('placeholder');
  const videoURL = inputUrl.value;
  
  if(!videoURL.includes('youtube.com/shorts')){
    content.textContent = 'O link selecionado não é de um short.';  
  }
  
  const [ _, videoParams] = videoURL.split('shorts/');
  const [videoId] = videoParams.split('?si=');
  content.textContent = 'Transcrevendo o conteúdo do vídeo...'

  const transcription = await server.get(`/summary/${videoId}`).then((response)=>{
    console.log(response);
    
    content.textContent = `Transcrição finalizada, iniciando o resumo...`;
    return response.data;
  }).catch((error)=>{
    content.textContent = `Ocorreu o erro: ${error.response.data.result}`;
  });

  await server.post('/summary', {
    text: transcription.result,
  }).then((response)=>{
    content.textContent = response.data.result;
  }).catch((error)=>{
    content.textContent = `Ocorreu um erro ao resumir o arquivo. Erro: ${error}`;
  });
  content.classList.remove('placeholder');
  
  
});