var BFSallpassed;
var BFSbacktrack;

function DFS()
{
    globaldeletedweights = [];
    removetrack();
    var dict = {};
    const get = getmatrix();
    let start = get[0];
    let end = get[1];
    const walls = get[2]
    const S = [];
    S.push(start);
    const allpassed = [];
    var foundanswer = null;
    while(S.length > 0)
    {
        var dq = S.pop();
        allpassed.push(dq)
        keys = Object.keys(dict);
        const neighbors = directions(dq,walls,keys);
        keys = Object.keys(dict);
        for(const neighbor of neighbors)
        {
            dqstring = dq.toString();
            if(neighbor == end)
            {
                foundanswer = true;
                try {
                    dict[dqstring].push(neighbor);
                    }
                catch{
                    console.log("noneighbor");
                    dict[dqstring] = [];
                    dict[dqstring].push(neighbor);
                }
                allpassed.push(neighbor);
                
                break;
            }
            try
            {
                dict[dqstring].push(neighbor);
            }
            catch(no)
            {
                dict[dqstring] = [];
                dict[dqstring].push(neighbor);
            }
            if(!allpassed.includes(neighbor))
            {
                S.push(neighbor);
                allpassed.push(neighbor);
            }
        }
        if(foundanswer == true)
        {
            break;
        }
    }
    BFSallpassed = allpassed;
    if(foundanswer == true)
    {
        backtrack(dict,end,start,keys);
        visualizeallpassed(true);
    }
    else
    {
        visualizeallpassed(false);
        
    }
}

function directions(dq,walls,keys)
{
    var result = [];
    if(dq > 59)
    {
        result.push(dq - 60);
    }
    if((dq + 1) % 60 != 0)
    {
        result.push(dq + 1);
    }
    if(dq < 1320)
    {
        result.push(dq + 60);
    }   
    if((dq) % 60 != 0)
    {
        result.push(dq - 1);
    }
    result = filters(result,walls,keys);
    return result;
}
