import ytdl from 'ytdl-core';
import fs from 'node:fs';

export const download = (videoId) => 
  new Promise(async (resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId;
    console.log(`Realizando o download com id: ${videoId}`);
    const videoDuration = (await ytdl.getBasicInfo(videoURL)).videoDetails.lengthSeconds;
    const checkVideoDuration = !(videoDuration > 60);
    
    if(checkVideoDuration){
      ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
      .on('end', ()=>{
        console.log(`Download finalizado.`);
        resolve({status: 'Done'});
      }).on('error', (error)=>{
        console.log(`Não foi possível realizar o download do vídeo. Erro: ${error.message}`);
        reject(error);
      }).pipe(fs.createWriteStream('./tmp/audio.mp4'));
      
    }else{
      const message = 'Falha ao realizar o download, o vídeo possui mais de 60 segundos.'
      console.log(message);
      reject(message);
    }
  });