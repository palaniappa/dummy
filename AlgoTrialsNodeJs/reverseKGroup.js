function ListNode(val) {
    this.val = val;
    this.next = null;
}

var reverseImpl = function (root, k, currentK) {
    if (root == null) {
        return { ptr : null, possible: false };
    }
    let rest = null;
    if (currentK == 1) {
        //do not revers
        rest = reverseImpl(root.next,k,k);
        root.next = rest.ptr;
        rest.ptr = root;
        rest.possible = true;
    }
    else{
        let prevNext = root.next;
        rest = reverseImpl(root.next,k,currentK -1);
        if(rest && rest.possible && rest.ptr){
            let t = prevNext.next;
            prevNext.next = root;
            root.next = t;
        } else {
            rest.ptr =  root;
        }
    }
    return rest;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    return reverseImpl(head, k, k).ptr;
};

let main = function () {
    let head = null;
    let tailnode = null;
    for(var i = 1;i<6;++i){
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

    let result = reverseKGroup(head,2);
};

main();