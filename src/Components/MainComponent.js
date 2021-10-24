import React, { useEffect, useState } from 'react'
import { flashWord } from './Common/Text'

const MainComponent = () => {
    const [ typedWord, setTypedWord ] = useState("") 
    const [ sentance, setSentance ] = useState([])
    const [ key , setKey ] = useState("")

    const handleKeyDown = (e) => {
        setKey(e.key)
    }

    useEffect(() => {
        setSentance(flashWord())
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    },[])

    useEffect(() => {
        if(key === sentance[0]){
            setSentance(prevSentance => prevSentance.slice(1))
            setTypedWord(prevTypedWord => `${prevTypedWord}${key}`)
        }
    },[key,sentance])

    return (
        <div>
            <span style = {{color : "red"}}>{typedWord}</span>
            {sentance}
        </div>
    )
}

export default MainComponent
