import React, { useEffect, useRef, useState } from "react"




export default function VideoComponent({FluxoVideo}) {

    const VideoRef = useRef(null)
    
    useEffect( () => {
        if (FluxoVideo) {
            VideoRef.current.srcObject = FluxoVideo
        } else {
            VideoRef.current.srcObject = null
        }
    },[FluxoVideo])
    

    
    return(
    <>
        
        <div className="VideoOutput" >
            <video ref={VideoRef} autoPlay playsInline
            > seu navegador precisa ser atualizado, ele não tem suporte a videos.
            </video>
        </div>

        <div> 
            { FluxoVideo && <ListStreans FluxoVideo={FluxoVideo} /> }
        </div>



    </>)
}

function ListStreans({FluxoVideo}) {
    
    const tracks = FluxoVideo.getTracks()
    tracks.map( track => track.enabled = true)
    //tracks.map( track => track.stop())
    
    const [SelectedOption, changeOption] = useState(null)
    return(
        
        <select id="Tracks" name="ListaTracks" onChange={(e) => { HandleTrackChange(e.target.value, SelectedOption) }}>
            { tracks.map(track => <option key={track.id} value={track.id}>{track.label}</option>) }
        </select>
    )  
}



function HandleTrackChange(e, CurrentOption) {
    e.preventDefault()
    console.log(CurrentOption)

}
