
//  Definition for singly-linked list.
  function ListNode(val) {
      this.val = val;
      this.next = null;
  }
 
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let result = removeImpl(head,n);
    return result.next;
};

function removeImpl(root, n){
    if(root == null){
        return { count : 0, next: null };
    }
        
    let returnVal = removeImpl(root.next,n);
    if(returnVal.count + 1 == n){
        // this is the nth  node from reverse s
        returnVal.next = root.next;
    }
    else{
        root.next = returnVal.next;
        returnVal.next = root;
    }
    returnVal.count = returnVal.count + 1;
    return returnVal;

}

function main(){
    let head = null;
    let tailnode = null;
    for(var i = 0;i<10;++i){
        var node = new ListNode(i);
        if(head == null){
            head = node;
            tailnode = node;
        }
        else{
            tailnode.next = node;
            tailnode = node;
        }
    }

    removeNthFromEnd(head,3);
}

main();