import { useEffect, useState } from "react"
const RailfenceComponent = () => {
  const [keyInput , setKeyInput] = useState("");
  const [plInput , setPlInput] = useState("");
  const [cipherOutput , setCipherOutput] = useState("");
  const [cipherOutput2 , setCipherOutput2] = useState("");
  useEffect(()=>{
    if(keyInput == "") return 
    let rows = Math.min(Number(keyInput) , plInput.length)
    if(rows < 2){
        // setCipherOutput("INVALID")
        return
    }
    console.log(rows)

    let cipher : string[] = []
    let decrypt: string[] = new Array(plInput.length)
    for(let i = 0 ; i < plInput.length ; ++i){
        decrypt[i] = 'X';
    }
    let k = 0
    for(let mode = 0 ; mode < 2 ; ++mode){
        let step1 = 2*rows - 2
        let step2 = 0
        for(let i = 0 ; i < rows ; ++i){
            let j = i 
            let prt = false
            while(j < plInput.length && k < plInput.length){
                if(mode){
                    decrypt[j] = plInput[k++]
                }
                else{
                cipher.push(plInput[j])
                }
                if(i == 0) j += step1 
                else if(i == rows - 1) j += step2 
                else j += (prt ? step2 : step1)
                prt = !prt
            }
            step1 -= 2
            step2 += 2
        }
    }

    // console.log(cipher)

    setCipherOutput(cipher.join(""))
    setCipherOutput2(decrypt.join(""))

  } , [plInput , keyInput])

  return (
    <div id="railfence-component">
        <div id="key-input-div">
           <label htmlFor="key-input-box">KEY:</label> 
           <input key="key-input-box" value={keyInput} onChange={(e)=>{
                /[1-9][0-9]*$|^$/g.test(e.target.value) && setKeyInput(e.target.value);
           }}></input>
        </div>
        <div id="plaintext-input-div">
            <label htmlFor="plaintext-input-box">PLAINTEXT:</label>
            <input key="plaintext-input-box" value={plInput} onChange={(e)=>{
                setPlInput(e.target.value.toUpperCase())
            }}></input>
        </div>
        <div id="grid-output-div" className="grid">
            encrypted : {cipherOutput} <br></br>
            decrypted : {cipherOutput2}
        </div>
    </div>
  )
}

export default RailfenceComponent