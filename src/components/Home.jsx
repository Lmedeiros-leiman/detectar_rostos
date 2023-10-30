import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";





export default function Home() 
{
    const [permitidoGravar,alterarpermisao] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startWebcam = () =>
    {
        navigator.mediaDevices.getUserMedia({video:true})
        .then((video) => {
            videoRef.current.srcObject = video
        })
        .catch((error) => {
            console.error(error)
        })
    }
    const killWebcam = () =>
    {
        videoRef.current.srcObject = null
    }
    const loadModels = () => 
    {   
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models")
        ]).then (() => {
            faceDetect()
        })

    }
    const faceDetect = () => 
    {
        setInterval(async()=>{
            const detections = await faceapi.detectAllFaces(videoRef.current,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

            
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            faceapi.matchDimensions(canvasRef.current,{
                width:940,
                height:650
            })

            const resized = faceapi.resizeResults(detections,{
                width:940,
                height:650
            })

            faceapi.draw.drawDetections(canvasRef.current,resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current,resized)

        },1000)
    }

    useEffect(() => {
        if (permitidoGravar) 
        {
            startWebcam()
            videoRef && loadModels()
        }
        
        

    },[permitidoGravar])
    // variaveis para cosméticos.
    var corBotao = !permitidoGravar? "enabled" : "disabled";

    return (<>
    <div className="aplicativo">
        
        <div>
            <video width={940} height={650} autoPlay crossOrigin="anonymous" ref={videoRef} >se esta lendo isto, seu navegador precisa ser atualizado.</video>
        </div>    
        
        <canvas width={940} height={650} ref={canvasRef} > se esta lendo isto, ATUALIZE SEU NAVEGADOR.</canvas>
        
        <button className={` ${corBotao}`}
          onClick={ () =>{ alterarpermisao(!permitidoGravar) }}> 
            { !permitidoGravar ? "Ligar Webcam" : "Desligar Webcam" } 
        </button>
        
    </div>
    </>);
}