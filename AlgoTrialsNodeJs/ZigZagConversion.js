/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    let newStrings = [];
    for(var j = 0;j<numRows;++j){
        newStrings[j] = "";
    }
    let idx = 0;
    let incrementor = 1;
    for(var c of s){
        newStrings[idx] = newStrings[idx] + c;
        idx += incrementor;
        if(idx == numRows){
            incrementor = -1;
            idx = numRows - 2;
            if(idx<0){
                idx = 0;
            }
        } else if (idx == -1){
            incrementor = 1;
            idx = 1;
            if(idx == numRows){
                idx = 0;
            }
        }
    }

    let newString = "";
    newStrings.forEach( e =>{
        newString = newString + e;
    });
    return newString;
};

convert("AB",1);