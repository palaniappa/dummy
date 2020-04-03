let sequence = function(start, end){
    this.start = start;
    this.end = end;
}

let charData = function(c){
    this.char = c;
    this.top = 0;
    this.list = [];
}

/**
 * @param {string} text
 * @return {number}
 */
var maxRepOpt1 = function(text) {

    let seqCounts = {};
    for(var idx=0;idx<text.length;++idx){
        let c = text[idx];
        if(seqCounts[c] == undefined){
            seqCounts[c] = new charData(c);
            seqCounts[c].list[seqCounts[c].top] = new sequence(idx,idx);
        } else{
            if(seqCounts[c].list[seqCounts[c].top].end + 1 == idx){
                seqCounts[c].list[seqCounts[c].top].end = idx;
            }
            else {
                seqCounts[c].top += 1;
                seqCounts[c].list[seqCounts[c].top] = new sequence(idx,idx);
            }
        }
    }

    let max = 0;
    Object.keys(seqCounts).forEach( c =>{

        let charData = seqCounts[c];
        let prevSeq = null;
        charData.list.forEach( seq =>{
            if(prevSeq == null){
                prevSeq = seq;
            }
            let currentSeqLength = seq.end - seq.start + 1;
            if( prevSeq != null && prevSeq.end + 2 == seq.start){
                
                currentSeqLength = seq.end - prevSeq.start;
                if(charData.list.length > 2){
                    currentSeqLength += 1;
                }
            }
            else if(charData.list.length > 1){
                currentSeqLength += 1; //swap is possible
            }
            max = Math.max(currentSeqLength, max);
            prevSeq = seq;

        });

    });

    return max;
};

maxRepOpt1("ababa");