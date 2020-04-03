/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
    let maxLength = 0;
    let indexes = {};
    let startIdx = 0;
    for(var idx=0;idx<s.length;++idx){
        let c = s[idx];
        if(indexes[c] == undefined)
        {
            indexes[c] = idx;
        }
        else{
            let newStartIndex = indexes[c] + 1;
            if(startIdx < newStartIndex){
                startIdx = newStartIndex;
            }
            indexes[c] = idx;
        }

        let currentLength = idx - startIdx + 1;
        if(maxLength < currentLength){
            maxLength = currentLength;
        }
    }
    return maxLength;
};

lengthOfLongestSubstring("dvdf");