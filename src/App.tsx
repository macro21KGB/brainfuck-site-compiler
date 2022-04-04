import {FC, useState} from 'react'
import './App.css'
import Cell from './components/Cell'
import styled from 'styled-components'
import {nanoid} from 'nanoid'


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

interface CellType {
  id: string;
  value: string;
}


const App : FC = () => {


  //Fill 50 cellType with value 0
  const [cells, setCells] = useState<CellType[]>(Array(50).fill({
    id: nanoid(),
    value: 0
  }))

  return (
    <div className="App">

      
      <CodeTextArea></CodeTextArea>
      <CellList>
      {
        cells.map((cell) => {
          return <Cell id={cell.id} value={cell.value} onClick={() => {}}/>
        })
      }
      </CellList>

    </div>
  )
}

export default App
