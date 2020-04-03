/**
 * Definition for singly-linked list.
 **/
  function ListNode(val) {
      this.val = val;
      this.next = null;
  }
 
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let currentNodePtr = {};
    currentNodePtr.ptr = head;
    return isPalindromeImpl(head,currentNodePtr);
};

var isPalindromeImpl = function(root, currentNodePtr){
    if(root == null){
        return true;
    }
    var r = isPalindromeImpl(root.next, currentNodePtr);
    if(r == true && currentNodePtr.ptr && root.val == currentNodePtr.ptr.val){
        currentNodePtr.ptr = currentNodePtr.ptr.next;
        return true;
    }
    return false;
}



let main = function(){
    let head = null;
    let tailnode = null;
    let data = 1;
    let incrementor = 1;
    for(var i = 1;i<10;++i){
        var node = new ListNode(data);
        if(head == null){
            head = node;
            tailnode = node;
        }
        else{
            tailnode.next = node;
            tailnode = node;
        }
        data = data + incrementor;
        if(data>5)
        {
            incrementor = -1;
            data = 4;
        }
    }

    let result = isPalindrome(head);
}

main();