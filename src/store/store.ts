import { CellType } from './../App';
import create from 'zustand'

interface LoopState {
    charIndex: number;
    cellIndex: number;
}

interface CellState {
    cells: CellType[];
    loopState: LoopState;
    currentSelectedCell: number;
    setCells: (cells: CellType[]) => void;
    startLoop: (charIndex: number) => void;
    repeatOrEndLoop: () => number;
    addValueToCell: (value: number) => void;
    printValue: () => string;
    modifyCell: (value: number) => void;
    moveIndexByValue: (value: number) => void;
    resetCells: () => void;
}

const useStore = create<CellState>((set, get) => ({
    cells: [],
    currentSelectedCell: 0,
    loopState: {
        charIndex: -1,
        cellIndex: -1
    },
    resetCells: () => {
        //set every cell value to 0 and set currentSelectedCell to 0
        set(state => ({
            cells: state.cells.map(cell => ({ id: cell.id, value: 0 })),
            currentSelectedCell: 0
        }))

    },
    setCells: (cells: CellType[]) => set({ cells }),

    addValueToCell: (value: number) => {
        const cells = get().cells;
        const newCells = [...cells];
        const currentIndex = get().currentSelectedCell;
        const newValue = newCells[currentIndex].value + value < 0 ? 255 : newCells[currentIndex].value + value;
        newCells[currentIndex].value = newValue;
        set({ cells: newCells });

    },
    modifyCell: (value: number) => {
        const cells = get().cells;
        const newCells = [...cells];
        const currentIndex = get().currentSelectedCell;
        newCells[currentIndex].value = value;
        set({ cells: newCells });
    },
    moveIndexByValue: (value: number) => {
        set(state => ({
            currentSelectedCell: state.currentSelectedCell + value
        }))
    },
    printValue: () => {
        const cells = get().cells;
        const currentIndex = get().currentSelectedCell;
        return String.fromCharCode(cells[currentIndex].value);
    },
    startLoop: (charIndex: number) => {
        set(state => ({
            loopState: {
                charIndex,
                cellIndex: state.currentSelectedCell
            }
        }));
    },
    repeatOrEndLoop: () => {
        const currentLoop = get().loopState;
        const cells = get().cells;

        if (cells[currentLoop.cellIndex].value !== 0) {
            set({
                currentSelectedCell: currentLoop.cellIndex,
            })
            return currentLoop.charIndex;
        }

        set({
            loopState: {
                charIndex: -1,
                cellIndex: -1
            }
        })
        return -1;
    }
}))

export default useStore;