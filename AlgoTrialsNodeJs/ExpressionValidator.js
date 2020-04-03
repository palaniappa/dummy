let node = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

//a<b<c<d>a>c
//a<b>c<d //not sure how to insert?


let ValidateExpression = function (expression){
    let operandExists = {};
    let trees = null;
    let result = true;
    let lhs = expression[0];
    let idx = 1;
    while(idx < expression.length){
        let operator = expression[idx++];
        let rhs = expression[idx++];

        //check if both lsh and rhs exists, then check if condition satisfies
        // if both are not there then add both
        // if one is not there then add that

        lhs = rhs;
    }
    

    return result;
}