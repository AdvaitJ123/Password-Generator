import { useState , useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if (numberAllowed){
      string += "1234567890"
    }
    if (charAllowed){
      string += "~`!@#$%^&*()_-+=/*\|]}[{';:/?.>,<"
    }
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }
    setPassword(pass)
  } , [length, numberAllowed, charAllowed, setPassword])
  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordtoClip = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-4xl text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3 my-8 rounded-lg' placeholder='Password' readOnly ref={passwordRef}/>
          <button onClick={copyPasswordtoClip} className='ouline-none bg-blue-700 text-white py-0.75 px-3 shrink-0 my-8 rounded-lg' style={{maxHeight: '30px', minHeight: '30px'}}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked = {numberAllowed} id='numberInput' onChange={() => {
              setnumberAllowed((prev) => !prev)
            }}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked = {charAllowed} id='charInput' onChange={() => {
                setcharAllowed((prev) => !prev)
              }}/>
              <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App