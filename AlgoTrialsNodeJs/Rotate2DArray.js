let rotate = function(items){
    let cs = 0;
    let ce = items.length-1;
    let rs = 0;
    let re = items[0].length-1;

    while(rs<re && cs<ce){
        let itemCount = re-rs+1;
        for(var idx = cs;idx<ce;++idx){
            let i = rs;
            let j = idx;
            let temp2 = items[i][j];

            let newI = j;
            let newJ = ce;
            temp = items[newI][newJ];
            items[newI][newJ] = temp2;

            let newI2 = re;
            let newJ2 = ce - (j-cs);
            temp2 = items[newI2][newJ2];
            items[newI2][newJ2] = temp;

            let newI3 = re-(j-rs);
            let newJ3 = cs;
            temp = items[newI3][newJ3];
            items[newI3][newJ3] = temp2;

            items[i][j] = temp;
        }
        rs = rs + 1;
        re = re - 1;
        cs = cs + 1;
        ce = ce - 1;

    }

    return items;
}

// rotate(
//     [
//           [1,2,3]
//         , [4,5,6]
//         , [7,8,9]
//     ]
// );

rotate(
    [
          [ 1, 2, 3, 4]
        , [ 5, 6, 7, 8]
        , [ 9,10,11,12]
        , [13,14,15,16]
    ]
);