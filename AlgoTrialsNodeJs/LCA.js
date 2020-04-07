let Node = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

function LCA (root, a , b ){
    if(root == null)
        return { done: false, afound: false, bfound:false, result:null};
    
    let afound = false;
    let bfound = false;
    if(root.data == a){
        afound = true;
    }
    if(root.data == b){
        bfound = true;
    }

    let lR = LCA(root.left,a, b);
    if(lR.done)
        return lR;

    let rR = LCA(root.right,a,b);
    if(rR.done)
        return rR;

    if( (lR.afound && bfound) || (lR.bfound && afound)
        || (rR.afound && bfound) || (rR.bfound && afound)
        || (lR.afound && rR.bfound) || (lR.bfound && rR.afound)
    ){
        return { done:true, result: root };
    }
    
    return { afound : afound || lR.afound || rR.afound, bfound: bfound || lR.bfound || rR.bfound, result: null};
}

function main(){
    let t = new Node(100);
    t.left = new Node(50);
    t.left.left = new Node(25);
    t.left.right = new Node(75);
    t.right = new Node(150);
    t.right.left = new Node(125);
    t.right.right = new Node(175);
    t.right.right.right = new Node(180);

    var x = LCA(t,25,75);
    x = LCA(t,25,180);
    x = LCA(t,175,180);
    

}

main();