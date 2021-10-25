import React, { useEffect, useState } from 'react'
import { flashWord } from './Common/Text'

const MainComponent = () => {
    const [ typedWord, setTypedWord ] = useState("") 
    const [ sentance, setSentance ] = useState([])
    const [ key , setKey ] = useState("")
    const [visibility, setVisibility] = useState("visible")

    const handleKeyDown = (e) => {
        setKey(e.key)
    }

    useEffect(() => {
        setSentance(flashWord())
        document.addEventListener("keydown", handleKeyDown)
        const interval = setInterval(() => {
            setVisibility(prev => prev === "visible" ? "hidden" : "visible")
        }, 500)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            clearInterval(interval)
        }
    },[])

    useEffect(() => {
        if(key === sentance[0]){
            setSentance(prevSentance => prevSentance.slice(1))
            setTypedWord(prevTypedWord => `${prevTypedWord}${key}`)
        }
    },[key,sentance])

    return (
        <div style={{fontSize: "20px"}}>
            <span style = {{color : "red", letterSpacing: "3px"}}>{typedWord}</span>
            <div style = {{borderLeft: " 1px solid", display: 'inline', visibility: visibility}}></div>
            <span style = {{letterSpacing: "3px"}}>{sentance}</span>
        </div>
    )
}

export default MainComponent
