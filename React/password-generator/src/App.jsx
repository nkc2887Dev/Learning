import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(30);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [text, setText] = useState("");

  const generateString = useCallback(() => {
    let characters = "abcdefghijklmnopgrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numString = "1234567890";
    const charString = "!@#$%^&*";

    if (num) characters += numString;
    if (char) characters += charString;

    const newString = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");

    setText(newString);
  }, [length, num, char]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" className="bg-white"readOnly value={text} />
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(text);
          }}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={1}
            max={10}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor="length"> length ({length}) </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={num}
            onChange={() => setNum((prev) => !prev)}
          />
          <label htmlFor="num"> Numbers </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar((prev) => !prev)}
          />
          <label htmlFor="char"> Charactor </label>
        </div>
      </div>
    </div>
  );
}

export default App;
