/**
 * Definition for singly-linked list.
 * **/
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {

    let done = false;
    let newList = null;
    let newListTail = null;
    while(done == false){
        let currentNode = null;
        let idx = -1;
        for(var i=0;i<lists.length;++i){
            if(currentNode == null && lists[i] != null){
                currentNode = lists[i];
                idx = i;
            }
            else if(currentNode && lists[i] && currentNode.val > lists[i].val){
                currentNode = lists[i];
                idx = i;
            }
        }

        if(currentNode){
            lists[idx] = currentNode.next;
            if(newList == null){
                newList = currentNode;
                newListTail = currentNode;
            } else{
                newListTail.next = currentNode;
                currentNode.next = null;
                newListTail = currentNode;
            }
        }
        else{
            done = true;
        }
    }
    return newList;
};