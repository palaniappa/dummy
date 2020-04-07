let Node = function(val){
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
};

let BST = function(){
    this.root = null;

    this.insert = function (val){
        if(this.root == null){
            this.root = new Node(val);
            return this.root;
        }
        else {
            return insertImpl(this.root,val);
        }
    }

    let insertImpl = function(root, val){
        if(val < root.val){
            if(root.left){
                return insertImpl(root.left,val);
            }
            else{
                root.left = new Node(val);
                root.left.parent = root;
                return root.left;
            }
        } else if( val >= root.val ){
            if(root.right){
                return insertImpl(root.right,val);
            }
            else{
                root.right = new Node(val);
                root.right.parent = root;
                return root.right;
            }
        }
    }


};

let successor = function(root){

    if(root == null){
        return null;
    }
    if(root.right) {
        return inorderNextNode(root.right);
    }
    let currentNode = root;
    while(currentNode != null && currentNode.parent != null){
        if(currentNode.parent.left == currentNode){
            return currentNode.parent;
        }
        if(currentNode.parent.right == currentNode){
            currentNode = currentNode.parent;
        }
    }
    return null;
}

let inorderNextNode = function(root){
    if(root == null){
        return null;
    }

    let resultNode = inorderNextNode(root.left);
    if(!resultNode){
        return root;
    }
    return resultNode;
}

let predecessor = function(root){
    if(root == null){
        return null;
    }

    if(root.left != null){
        return inorderNextNode(root.left);
    }
    if(root.parent){
        let currentNode = root;
        while(currentNode != null && currentNode.parent != null){
            if(currentNode.parent.right == currentNode){
                return currentNode.parent;
            }
            if(currentNode.parent.left == currentNode){
                currentNode = currentNode.parent;
            }
        }
    }
    return null;
}


function main(){

    let bst = new BST();
    let n100 = bst.insert(100);
    let n50 = bst.insert(50);
    let n75 = bst.insert(75);
    let n25 = bst.insert(25);
    let n80 = bst.insert(80);
    let n150 = bst.insert(150);
    let n180 = bst.insert(180);

    let s = successor(n75, n75);
    s = successor(n80, n80);
    s = successor(n180, n180);
    s = successor(n25, n25);

    s = predecessor(n75, n75);
    s = predecessor(n80, n80);
    s = predecessor(n180, n180);
    s = predecessor(n25, n25);
}

main();
