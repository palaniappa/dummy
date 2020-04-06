function MinElement(items){
    let st = 0;
    let end = items.length-1;
    let min = undefined;
    while(st<end){
        let mid = Math.floor((end+st)/2);
        if( st+1 == end){
            if(items[end] < items[st]){
                min = items[end];
            }
            st = end;
        }
        else if(items[st] > items[mid]){
            end = mid;
        } else{
            st = mid;
        }
    }
    if(min == undefined){
        min = items[0];
    }
    return min;
}

MinElement([5,6,7,8,9,1,2,3,4]);

MinElement([5,6,7,8,9,1]);

MinElement([1,2,3,4,5,6,7,8,9]);