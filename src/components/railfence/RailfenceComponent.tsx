import { useEffect, useRef, useState } from "react"

function initiliazeMatrix(sz : number) : string[]{
  // console.log(sz)
  let matrix: string[] = []
  for(let i = 0 ; i < sz ; ++i){
    matrix.push(" ")
  }
  // console.log({"in_function" : matrix})
  return matrix
}

const RailfenceComponent = () => {

  const [keyInput , setKeyInput] = useState("");
  const [plInput , setPlInput] = useState("");
  // const [matrix , setMatrix] = useState<string[]>([])

  const fillMatrix = (plInput : string , rows : number , cols : number ) : string[] => {

    const plMod = plInput + "X".repeat(Math.max(cols - plInput.length,0))
    const matrix = initiliazeMatrix(rows*cols)
    let dX = 1
    let X = 0 , Y = 0

    for(let i = 0 ; i < cols ; ++i){
        matrix[X*cols + Y] = plMod[i]
        // setMatrix(()=>matrix.map((item , index) => index === X*cols + Y ? plMod[i] : item))
        if(X === 0) dX = 1
        if(X === rows - 1) dX = -1
        X += dX
        Y++
    }
    return matrix
  }

  let encrypted = "" , decrypted = "";

  const rows = Number(keyInput)
  let padding = plInput.length && Math.max(rows - plInput.length , 0)
  if(plInput.length > 0 && rows !== 1){
    while(((plInput.length + padding - rows) % (rows - 1) !== 0)){
      ++padding
    }
  }
  const cols = plInput.length + padding

  // const matrix = useRef<string[]>([])
  const matrix = fillMatrix(plInput , rows , cols)

  useEffect(()=>{

    const plMod = plInput + "X".repeat(Math.max(cols - plInput.length,0))
    const plLen = plMod.length

    if(plInput == "" || keyInput == "" || rows < 2){
      console.log("returning")
      return
    }

    let cipher : string[] = []
    let decrypt: string[] = new Array(plLen)
    //mode : 0 -> encrypt , 1 -> decrypt
    for(let mode = 0 ; mode < 2 ; ++mode){
        let k = 0
        let step1 = 2*rows - 2
        let step2 = 0
        for(let i = 0 ; i < rows ; ++i){
            let j = i 
            let prt = false
            while(j < plLen && k < plLen){
                if(mode){
                    decrypt[j] = plMod[k++]
                }
                else{
                    cipher.push(plMod[j])
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

    encrypted = cipher.join("")
    decrypted = decrypt.join("")

    // matrix.current = initiliazeMatrix(rows*cols)
    // setMatrix(()=>initiliazeMatrix(rows*cols))


    console.log({plMod : plMod , matrix : matrix})

  } , [plInput , keyInput])

  console.log({cols : cols})

  return (
    <>
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
        <div id="output">
            encrypted : {encrypted} <br></br>
            decrypted : {decrypted}
        </div>
        <div id="grid-output-div" className={`grid size-[300px]`} style={{gridTemplateColumns : `repeat(${cols}, minmax(0, 1fr))`}}>
            {
            matrix.map((item , index) => {
                return (
                    <div key={index} className="border border-black flex items-center justify-center">{item}</div>
                )
            })}
        </div>
      </>
  )
}

export default RailfenceComponent