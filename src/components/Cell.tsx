import {FC, useState} from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: 'black';
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-size: 2em;
  font-weight: bold;
`

const Cell : FC = ({value}) => {

  return (
    <StyledCell className="cell">
      <p>{value}</p>
    </StyledCell>
  );
}

export default Cell;
