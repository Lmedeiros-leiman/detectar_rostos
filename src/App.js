import React, { useEffect, useRef, useState } from "react"

import './App.css';

import VideoComponent from './VideoComponent/VideoComponent';

function App() {


  const [Gravando, setGravando] = useState(false)
  const [FluxoVideo, setFluxo] = useState(null)

  useEffect( () => {

    async function PegarFluxoVideo(){
      navigator.mediaDevices.getUserMedia( {video:true} )
      .then((FluxoVideo) => {
        setFluxo(FluxoVideo)
        
      })
      .catch((erro) => {alert("Erro tentando pegar video da webcam: \n \n" + erro)})
    }
    
    
    if (Gravando) { PegarFluxoVideo() }
    else { 
      if (FluxoVideo) {
        FluxoVideo.getTracks().forEach(track => track.stop() )
        setFluxo(null)
        
      } 
    }

  },[Gravando])


  return (
    <>
      <aside>

      </aside>
      <div style={{width:"600" ,maxWidth:"600px", maxHeight:"800px", height:"320px"}} >
        <VideoComponent FluxoVideo={FluxoVideo} Gravando={Gravando}/>
      </div>

      <div>

      <button style={{marginTop:'5rem'}} className= {`${Gravando ? 'false':'true'}`}
            onClick={ () => setGravando(!Gravando) }
            >{ Gravando ? "Desativar Camera" : "Ligar Camera"}</button>
      </div>

    </>
  );
}

export default App;
