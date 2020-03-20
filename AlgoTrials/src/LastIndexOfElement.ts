import * as readline from 'readline';


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("", (inputLine:string)=>{

    let elements = inputLine.split(" ");
    let countOfelements = Number(elements[0]);
    let elementToFind = Number(elements[1]);

    rl.question("",(elementString: string)=>{

        let dataElements = elementString.split(" ");
        let dataNumbers: number[] = [];
        dataElements.forEach( (e)=>{
            dataNumbers.push(Number(e));
        });
        
        let elementLastIndex = dataNumbers.length;
        for(; elementLastIndex>-1;--elementLastIndex){
            if(dataNumbers[elementLastIndex] == elementToFind){
                break;
            }
        }
        rl.write(elementLastIndex.toString());
    });

});