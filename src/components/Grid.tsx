import { useEffect, useRef, useState } from "react";
import useAppContext from "../hooks/use-app-context";
import { createBigramPl } from "../utils/bigram";
function nextChar(key : string , insert : string , ptr : number) : [string , number] {
  if (ptr == key.length) insert = String.fromCharCode(insert.charCodeAt(0) + 1);
  else {
    ++ptr;
    if (ptr == key.length) {
      insert = "A";
    } else {
      insert = key[ptr];
    }
  }
  return [insert, ptr];
}
function intializeCells(N : number) : string[] {
  let cells = [];
  for (let i = 0; i <= N * N; ++i) {
    if (i + 65 == "J".charCodeAt(0)) continue;
    cells.push(String.fromCharCode(65 + i));
  }
  return cells;
}
// type GridArgumentType = {

// }
const Grid = (argument : object) => {
  console.log({ "GridArgument" : argument});
  
  const { keyInput, plInput, setCipherOutput, bigramIndex, cipherOutput , opMode} = useAppContext();
  console.log(opMode);
  const gridRef = useRef<HTMLDivElement>(null);
  const bigramPl = createBigramPl(plInput);
  const N = 5;
  const club = "J"; 
  const f = bigramPl[bigramIndex], s = bigramPl[bigramIndex + 1];

  const [cells, setCells] = useState(() => intializeCells(N));
  const updateCell = (index : number, element : string) => {
    setCells((prevCells) =>
      prevCells.map((item, idx) => (idx == index ? element : item))
    );
  };

  useEffect(()=>{
    for(let i = 0 ; i < 2 ; ++i){
      document.getElementById(`arrow-${i}`)?.remove();
    }
    if(bigramIndex === -1) return;
    const vals = [bigramPl[bigramIndex] , cipherOutput[bigramIndex] , bigramPl[bigramIndex + 1] , cipherOutput[bigramIndex + 1]];
    //xy[i][j][k] = this is the ith pair of bigram and cipher (there are only 2)
    //j = 0 means plaintext bigram , j = 1 means ciphertext bigram 
    // k = 0 means X coord, k = 1 means Y coord
    const xy = [[[0,0],[0,0]],[[0,0],[0,0]]]
    for(let i = 0 ; i < cells.length ; ++i){
      for(let j = 0 ; j < vals.length ; ++j){
        if(vals[j] === cells[i]){
          xy[Number(j>=2)][j&1][0] = i%5;
          xy[Number(j>=2)][j&1][1] = Math.floor(i/5);
        }
      }
    } 
    for(let i = 0 ; i < 2 ; ++i){

      let sameRowCase = 0 , adjColCase = 0 , adjColTopCase = 0 , adjRowRightCase = 0;
      let leftOffset = Math.min(xy[i][0][0] , xy[i][1][0]) * 50
      let topOffset = Math.min(xy[i][0][1] , xy[i][1][1]) * 50;
      let height = (Math.abs(xy[i][0][1] - xy[i][1][1]) + 1) * 50;
      let width = (Math.abs(xy[i][0][0] - xy[i][1][0]) + 1) * 50;
      //same row , and checking adjacency
      if(xy[i][0][1] === xy[i][1][1]){
         sameRowCase = 1;
         if(Math.abs(xy[i][0][0] - xy[i][1][0]) === 1){
          adjColCase = 1;
          leftOffset += 30;

          //edge case : pair is on top row
          if(xy[i][0][1] === 0){      
            topOffset += 50;
            adjColTopCase = 1;
          }
          else topOffset -= 20;

          height = 20;
          width = 40;
         }
         else{
          leftOffset += 50; 
          width -= 100;
          height -= 25
         }
      }
      else{
        if(xy[i][0][0] === 4){
          leftOffset -= 20;
          adjRowRightCase = 1;
        }
        else{
          leftOffset += 50;
        }
          topOffset += 30;
          height = 40;
          width = 20; 
      }

      const arrow = document.createElement("div")
      arrow.id = `arrow-${i}`
      arrow.style.position = "absolute"
      arrow.style.top = `${topOffset}px`
      arrow.style.left = `${leftOffset}px`
      arrow.style.height = `${height}px`
      arrow.style.width = `${width}px`
      arrow.style.border = "3px solid purple"
      if(sameRowCase){
        if(adjColTopCase){
          arrow.style.borderTop = "0"
          arrow.style.borderBottomLeftRadius = "30px"
          arrow.style.borderBottomRightRadius = "30px"
        }
        else if(adjColCase){
          arrow.style.borderBottom = "0"
          arrow.style.borderTopLeftRadius = "30px"
          arrow.style.borderTopRightRadius = "30px"
        }
        else{
          arrow.style.border = "0"
          arrow.style.borderBottom = "3px solid purple"
        }
      }
      else{
        if(adjRowRightCase){
          arrow.style.borderRight = "0"
          arrow.style.borderTopLeftRadius = "30px"
          arrow.style.borderBottomLeftRadius = "30px"
        }
        else{
          arrow.style.borderLeft = "0"
          arrow.style.borderTopRightRadius = "30px"
          arrow.style.borderBottomRightRadius = "30px"
        }
      }
      gridRef.current?.appendChild(arrow)
    }
  } , [bigramIndex])

  let cleanedKey = [
    ...new Set(keyInput.replace(/J/g, "I")),
  ].join("");

  useEffect(() => {
    var matrix = Array.from({ length: N }, () => new Array(N).fill(" "));
    var charToInd = new Array(26).fill(0);
    var ptr = 0,
      vis = 0;
    var insert = " ";
    insert = cleanedKey.length ? cleanedKey[0] : "A";
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        while (
          insert == club ||
          vis & (1 << (insert.charCodeAt(0) - "A".charCodeAt(0)))
        )
          [insert, ptr] = nextChar(cleanedKey, insert, ptr);
        vis |= 1 << (insert.charCodeAt(0) - "A".charCodeAt(0));
        charToInd[insert.charCodeAt(0) - "A".charCodeAt(0)] = i * N + j;
        matrix[i][j] = insert;
        updateCell(i * N + j, insert);
        [insert, ptr] = nextChar(cleanedKey, insert, ptr);
      }
    }
    charToInd["J".charCodeAt(0) - "A".charCodeAt(0)] =
      charToInd["I".charCodeAt(0) - "A".charCodeAt(0)];
    var ciphertext = "";
    for (let i = 0; i < plInput.length; ) {
      var f = plInput[i];
      var s = i + 1 == plInput.length ? "X" : plInput[i + 1];
      if (s == f) (s = "X"), ++i;
      else i += 2;
      var fVal = charToInd[f.charCodeAt(0) - "A".charCodeAt(0)];
      var sVal = charToInd[s.charCodeAt(0) - "A".charCodeAt(0)];
      var fX = Math.floor(fVal / N),
        fY = fVal % N;
      var sX = Math.floor(sVal / N),
        sY = sVal % N;
      if (fX == sX) {
        ciphertext += matrix[fX][(fY + (opMode ? -1 : 1) + N) % N];
        ciphertext += matrix[sX][(sY + (opMode ? -1 : 1) + N) % N];
      } else if (fY == sY) {
        ciphertext += matrix[(fX + (opMode ? -1 : 1) + N) % N][fY];
        ciphertext += matrix[(sX + (opMode ? -1 : 1) + N) % N][sY];
      } else {
        ciphertext += matrix[fX][sY];
        ciphertext += matrix[sX][fY];
      }
    }
    setCipherOutput(ciphertext);
  }, [keyInput, plInput , opMode]);

  return (
    <>
    <div id="grid" ref={gridRef} className="grid grid-cols-5 size-[250px] relative">
      {cells.map((item, index) => {
        const isSelectedBigram = (item === f || item === s) && bigramIndex >= 0;
        const keyFinished = index < cleanedKey.length;
        const isTargetCell = (item === cipherOutput[bigramIndex] ||
            item === cipherOutput[bigramIndex + 1]) &&
          bigramIndex >= 0;
        const isFirstIndexBigram = bigramIndex >= 0 && item === f;
        const isSecondIndexBigram = bigramIndex >= 0 && item === s;
        const isFirstIndexTarget = bigramIndex >= 0 && item === cipherOutput[bigramIndex];
        const isSecondIndexTarget = bigramIndex >= 0 && item === cipherOutput[bigramIndex + 1];
        return (
          <div
            key={index}
            id={`cell-${index}`}
            className={
              `border border-black flex items-center justify-center py-[10px] relative text-xl 
              ${
                keyFinished ? "bg-green-200" : "bg-slate-400"
              }
              ${
                isSelectedBigram && " border-[3px] border-red-600 "
              }
              ${
                isTargetCell && " border-[3px] border-blue-700 "
              }
              `
            }
          >
            {item}
          {
            isSelectedBigram && isTargetCell && (<div className="absolute inset-[1px] border-[2px] border-blue-700"></div>)
          }
          {
            isSelectedBigram && (isFirstIndexBigram || isSecondIndexBigram) && (<span className="absolute top-[0%] right-[0%] bottom-[70%] left-[80%] text-xs text-red-600">{isFirstIndexBigram ? '1' : '2'}</span>)
          }
          {
            isTargetCell && (isFirstIndexTarget || isSecondIndexTarget) && (<span className="absolute top-[60%] right-[0%] bottom-[0%] left-[10%] text-xs text-blue-700">{isFirstIndexTarget ? '1' : '2'}</span>)
          }
          </div>
        );
      })}
    </div>
    <div className="h-[100px]"></div>
    </>
  );
};

export default Grid;
