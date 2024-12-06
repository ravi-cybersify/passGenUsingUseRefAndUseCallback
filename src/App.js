import "./App.css";
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [characterAllow, setCharacterAllow] = useState(false);

  const passwordRef = useRef(null);

  const handlePasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "1234567890";
    if (characterAllow) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, characterAllow, numberAllow]);

  useEffect(() => {
    handlePasswordGenerator();
  }, [length, characterAllow, numberAllow]);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="w-full max-w-md shadow-md rounded-lg mx-auto my-12 py-7 px-7 ">
      <div className="flex flex-col gap-8 justify-center text-center">
        <h1 className="text-2xl font-bold">Password Generator</h1>
        <div className="">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="password.."
            className="shadow-sm border px-3 py-1"
            ref={passwordRef}
          />
          <button
            type="button"
            className="bg-blue-400 text-white rounded-lg px-3 py-1"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>

        <div className="flex gap-3 items-center justify-center\  ">
          <input
            type="range"
            value={length}
            min={6}
            max={100}             
            className="text-blue-600 cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="">Length:-</span>  
          <span>{length}</span>

          <input
            type="checkbox"
            defaultChecked={numberAllow}
            onChange={() => setNumberAllow((prev) => !prev)}
          />
          <label htmlFor="number">Number</label>

          <input
            type="checkbox"
            defaultChecked={characterAllow}
            onChange={() => setCharacterAllow((prev) => !prev)}
          />
          <label htmlFor="number">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
