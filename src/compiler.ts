
enum possibleOperator {
    "[",
    "]",
    "+",
    "-",
    ".",
    ",",
    ">",
    "<",
}


const preCompile = (code: string) => {
    let finalCode = [];

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        if (char in possibleOperator) {
            finalCode.push(char);
        }
    }
    return finalCode;
}



export { preCompile };