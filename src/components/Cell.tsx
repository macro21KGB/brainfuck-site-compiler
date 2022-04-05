import { FC } from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  color: white;
  font-size: 2em;
  font-weight: bold;
  border-radius: 5px;
`
interface CellProps {
  id: string;
  value: number;
}

const Cell: FC<CellProps> = (props) => {

  return (
    <StyledCell className="cell">
      <p>{props.value}</p>
    </StyledCell>
  );
}

export default Cell;
