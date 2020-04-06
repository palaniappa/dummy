let Stack = function(){
    this.top = -1;
    this.items = [];

    this.isEmpty = function(){
        return this.top == -1;
    }

    this.push = function(data){
        this.items[++this.top] = data;
    }

    this.pop = function(){
        let data = -1;
        if(this.top > -1){
            data = this.items[this.top--];
        }
        return data;
    }

    this.peek = function(){
        let data = -1;
        if(this.top > -1){
            data = this.items[this.top];
        }
        return data;
    }
}

function main(){

    let s1 = new Stack();
    s1.push(5);
    s1.push(1);
    s1.push(2);
    s1.push(4);
    s1.push(3);

    //let topItem = s1.pop();
    //let topPeek = s1.peek();

    let newStack = sort(s1);
    
}


function sort(s){
    let s2 = new Stack();
    while(s.isEmpty() == false){
        let a = s.pop();
        if(s2.isEmpty() == false){
            let b = s2.peek();
            while(s2.isEmpty() == false && b < a){
                s.push(s2.pop());
                b = s2.peek();
            }
        }
        s2.push(a);
    }
    return s2;
}

main();