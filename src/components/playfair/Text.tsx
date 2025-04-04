import useAppContext from "../../hooks/use-app-context";
import { createBigramPl } from "../../utils/bigram";
import Input from "../common/Input";
let buttonState = 0;
const Text = ( argument : object ) => {
  console.log({ "TextArgument" : argument })
  const {
    keyInput,
    setKeyInput,
    plInput,
    setPlInput,
    cipherOutput,
    bigramIndex,
    setBigramIndex,
    setOpMode
  } = useAppContext();
  const bigramPl = createBigramPl(plInput);
  return (
    <>
      <div id="mode" className="flex flex-row justify-between items-center w-[200px] h-[50px]">
        {/* <div>
        <input type="radio" id="button-encrypt" name="button-encrypt" value="Encrypt" onChange={()=>setOpMode(()=>0)}></input>
        <label htmlFor="button-encrypt"> ENCRYPT</label><br></br>
        </div>
        <div>
        <input type="radio" id="button-decrypt" name="button-decrypt" value="Decrypt" onChange={()=>setOpMode(()=>1)}></input>
        <label htmlFor="button-decrypt"> DECRYPT</label><br></br>
        </div> */}

        <button className={`hover:cursor-pointer border rounded-sm border-black ${!buttonState && " bg-green-300"}`} onClick={() => {
          buttonState = 0; 
          setOpMode(()=> 0)
        }}>ENCRYPT</button>
        <button className={`hover:cursor-pointer border rounded-sm border-black ${buttonState && " bg-green-300"}`} onClick={() => {
          buttonState = 1;
          setOpMode(()=> 1)
        }}>DECRYPT</button>
      </div>
      <div id="text" className="flex flex-col h-[300px]">
        <Input idDiv="key-input-div" label="KEY: " idInput="key-input-box" value={keyInput} placeholder="Enter key..."
        onChange={(e) => {
              setBigramIndex(-1);
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setKeyInput(e.target.value.toUpperCase())
            }}></Input>
        {/* <div
          id="key-input-div"
          className="flex flex-auto justify-center items-center  gap-x-2"
        >
          <label htmlFor="key" className="text-3xl">
            Key:
          </label>
          <input
            type="text"
            id="key"
            name="key"
            className="border border-black rounded-xl text-3xl"
            value={keyInput}
            placeholder="Enter key"
            onChange={(e) => {
              setBigramIndex(-1);
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setKeyInput(e.target.value.toUpperCase())
            }
            }
          />
        </div> 
        */}
        <div
          id="plaintext-input-div"
          className="flex flex-auto justify-center items-center  gap-x-2"
        >
          <label htmlFor="plaintext" className="text-3xl">
            Plaintext:
          </label>
          <input
            type="text"
            id="plaintext"
            name="plaintext"
            className="border border-black rounded-xl text-3xl"
            value={plInput}
            placeholder="Enter plaintext"
            onChange={(e) =>{
              setBigramIndex(-1);
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setPlInput(e.target.value.toUpperCase())
            }
            }
          />
        </div>
      {
        plInput.length ?  (
      <div id="bigram" className="flex flex-auto justify-center items-center  gap-x-2">
        <label htmlFor="bigram-list" className="text-3xl">
          Bigrams:
        </label>
        <span
          id="bigram-list"
          className="text-center text-xl"
        >
          {bigramPl.map((item, index) => {
            const isSelectedBigram =
              bigramIndex >= 0 && (index === bigramIndex || index === bigramIndex + 1);
            return (
              !(index & 1) && (
                <button
                  key={index}
                  onClick={() => setBigramIndex((prev)=> prev === index ? -1 : index)}
                  className={`hover:cursor-pointer ${
                    isSelectedBigram && " text-red-500 font-bold underline"
                  }`}
                >
                  <span className="text-3xl" key={index}>
                    [{item}
                    {bigramPl[index + 1]}]
                  </span>
                </button>
              )
            );
          })}
        </span>
      </div>) : null
      }
        {cipherOutput.length ? (
          <div
            id="ciphertext"
            className="flex flex-auto justify-center items-center  gap-x-2"
          >
            <label htmlFor="ciphertext" className="text-3xl">
              Ciphertext:
            </label>
            <span id="ciphertext" className="text-3xl">
              {cipherOutput.split("").map((item, index) => {
                const isCorrespIndex =
                  bigramIndex >= 0 && (index === bigramIndex ||
                  index === bigramIndex + 1)
                const isFirstIndexBigram =
                  bigramIndex >= 0 && index === bigramIndex;
                const isSecondIndexBigram =
                  bigramIndex >= 0 && index === bigramIndex + 1;
                return (
                  <span
                    key={index}
                    className={
                      isCorrespIndex ? "text-blue-500 underline font-bold" : "text-black"
                    }
                  >
                    {isFirstIndexBigram ? "[" : ""}
                    {item}
                    {isSecondIndexBigram ? "]" : ""}
                  </span>
                );
              })}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Text;
