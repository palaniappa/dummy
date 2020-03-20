main();

function main(){
    let root = { data:-3, left:null, right: null};
    root.left = { data: 2, left: null, right: null};
    root.right = { data: 3, left: null, right: null};
    root.left.left = { data: 4, left: null, right: null};
    root.left.right = { data: 5, left: null, right: null};
    root.right.left = { data: 6, left: null, right: null};
    root.right.right = { data: 7, left: null, right: null};

    let maxSum = { sum: 0};
    maxPathSum(root, maxSum);
    process.stdout.write(" The max path sum is : " + maxSum.sum);
}

function maxPathSum(root, maxSum){
    if(!root)
        return 0;
    let leftSum = maxPathSum(root.left, maxSum);
    let rightSum = maxPathSum(root.right, maxSum);

    let maxForContinuation = Math.max(leftSum + root.data, rightSum + root.data);
    let sumAtcurrentLevel = leftSum + rightSum + root.data;
    maxSum.sum = Math.max(maxForContinuation, sumAtcurrentLevel, maxSum.sum);
    return maxForContinuation ;
}