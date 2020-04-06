let Node = function(data){
    this.data = data;
    this.next = null;
}

function addList(root1, root2){

    let number1 = [];
    let number1Top = -1;
    let number2 = [];
    let number2Top = -1;
    

    let cpR1 = root1;
    let cpR2 = root2;
    while(cpR1 != null || cpR2!=null){
        if(cpR1){
            number1Top += 1;
            number1[number1Top] = cpR1.data;
            cpR1 = cpR1.next;
        }

        if(cpR2){
            number2Top += 1;
            number2[number2Top] = cpR2.data;
            cpR2 = cpR2.next;
        }
    }

    let remainder = 0;
    let newList = null;
    let newListTail = null;
    while(number1Top>-1 || number2Top > -1){
        
        let n1D = 0;
        let n2D = 0;
        if(number1Top > -1){
            n1D = number1[number1Top--];
        }

        if(number2Top > -1){
            n2D = number2[number2Top--];
        }

        let cv = (n1D + n2D + remainder);
        let currentDigit =  cv % 10;
        remainder = Math.floor(cv / 10);

        let newNode = new Node(currentDigit);
        if(newList == null){
            newList = newNode;
        }
        else {
            newNode.next = newList;
            newList = newNode;
        }
    }
    if(remainder > 0){
        let rNode = new Node(remainder);
        rNode.next = newList;
        newList = rNode;
    }
    return newList;
}

function test1(){
    let l1 = new Node(9);
    l1.next = new Node(8);
    l1.next.next = new Node(7);

    let l2 = new Node(9);
    l2.next = new Node(8);
    l2.next.next = new Node(7);
    l2.next.next.next = new Node(1);

    var r = addList(l1,l2);
}

test1();