//from root all paths that has the sum as given sum.

let Node = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
}


let PrintPathSum = function(root, sum, sumSoFar, pathCollector, pathSoFar){
   
    if(root ==  null){
        return;
    }

    let path = [];
    pathSoFar.forEach(element => {
        path.push(element);
    });
    path.push(root.data);

    if(sumSoFar + root.data == sum){
        pathCollector.push(path);
    }

    PrintPathSum(root.left, sum, sumSoFar + root.data, pathCollector, path);
    PrintPathSum(root.right, sum, sumSoFar + root.data, pathCollector, path);

    
}



function main(){
    let t = new Node(10);
    t.left = new Node(5);
    t.left.left = new Node(2);
    t.left.right = new Node(7);
    t.right = new Node(6);
    t.right.left = new Node(1);
    t.right.right = new Node(-2);
    t.right.right.right = new Node(3);

    let paths = [];
    var x = PrintPathSum(t, 17,0,paths,[]);
    

}

main();