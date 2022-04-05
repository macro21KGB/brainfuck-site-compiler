import { FC, useEffect, useState } from 'react'
import './App.css'
import Cell from './components/Cell'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import { preCompile } from './compiler'
import useStore from './store/store'


const CellList = styled.div`
  display: grid;
  margin: 10px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 0.6rem;
  height: 100%;
`

const CodeTextArea = styled.textarea`
  min-height: 160px;
  width: 100%;
  margin: 10px auto;
  font-family: monospace;
  font-size: 1rem;
  border: none;
  resize: none;
  box-shadow: 0 0 0 1px #ccc;
  background-color: #fafafa;
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const ExecuteButton = styled.button`
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 0.5rem 0.8rem;
  border: none;
  margin: 0.5rem;
  width: 100%;
`;

export interface CellType {
  id: string;
  value: number;
}


const App: FC = () => {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const addValue = useStore((state) => state.addValueToCell);
  const currentIndex = useStore((state) => state.currentSelectedCell);
  const cells = useStore((state) => state.cells);
  const setCells = useStore((state) => state.setCells);
  const resetCells = useStore((state) => state.resetCells);
  const changePointedCell = useStore((state) => state.moveIndexByValue);
  const modifyCell = useStore((state) => state.modifyCell);
  const printASCIIToScreen = useStore((state) => state.printValue);
  const startLoop = useStore((state) => state.startLoop);
  const endLoop = useStore((state) => state.repeatOrEndLoop);

  //Fill 50 cellType with value 0
  useEffect(() => {
    const cells: CellType[] = []
    for (let i = 0; i < 50; i++) {
      cells.push({ id: nanoid(), value: 0 })
    }
    setCells(cells)
  }, []);




  const readCharFromUser = (index: number) => {
    const char = prompt('Enter a character. Max 255');
    if (char && (+char > 255)) {
      alert('Please enter a valid character');
      return;
    }
    if (char) {
      modifyCell(+char);
    }
  }


  const compile = () => {
    //@ts-ignore
    const finalCode = preCompile(code);

    resetCells();
    setOutput([]);
    let i = 0;

    while (i < finalCode.length) {
      const char = finalCode[i];
      switch (char) {
        case "+":
          console.log("add");
          addValue(1);
          break;
        case "-":
          console.log("sub");
          addValue(-1);
          break;
        case ">":
          console.log("next");
          changePointedCell(1);
          break;
        case "<":
          console.log("prev");
          changePointedCell(-1);
          break;
        case ".":
          console.log("print");
          const returnedValue = printASCIIToScreen();
          setOutput([...output, returnedValue]);

          break
        case ",":
          console.log("read");
          readCharFromUser(currentIndex);
          break;
        case "[":
          console.log("start loop");
          startLoop(i);

          break;
        case "]":
          console.log("end loop");

          const newCharIndex = endLoop();
          if (newCharIndex !== -1)
            i = newCharIndex;
          break;
      }

      i++;
    }
  }

  return (
    <div className="App">

      <CodeTextArea value={code} onChange={(e) => { setCode(e.target.value) }}></CodeTextArea>
      <ExecuteButton onClick={compile}>Execute</ExecuteButton>
      <h4>{currentIndex}</h4>
      <h2>{output}</h2>
      <CellList>
        {
          cells && cells.map((cell) => {
            return <Cell key={cell.id} id={cell.id} value={cell.value} />
          })
        }
      </CellList>

    </div>
  )
}

export default App
