var BFSallpassed;
var BFSbacktrack;

function DFS()
{
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
function filters(result,walls,keys)
{
    var result1= result.filter(function(item){return !walls.includes(item)});
    var result2 = result1.filter(function(item){return !keys.includes(item.toString())});
    return result2;
}

function backtrack(dict,end,start,keys)
{
    const result = [];
    var num = end;
    while(num != start)
    {
        result.push(num);
        num = parseInt(dict.getKeyByValue(num));
    }
    BFSbacktrack = result;
}

async function visualizeallpassed(bool)
{
    let i = 0;
    while(true)
    {
        await sleep(speed);
        document.getElementById(BFSallpassed[i].toString()).classList.add("visited");
        if(i == BFSallpassed.length - 1)
        {
            break;
        }
        i++;
    }
    if(bool == true)
    {
        visualizebacktrack();
    }
    else
    {
        swal({
            text: "no outcome",
            icon: "error",
            buttons:{sadge: "sadge"}
        });
    }   
}

async function visualizebacktrack()
{
    let i = 0;
    while(true)
    {
        await sleep(20);
        document.getElementById(BFSbacktrack[i].toString()).classList.add("backtrack");
        if(i == BFSbacktrack.length - 1)
        {
            break;
        }
        i++;
    }
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(() => resolve(), time))
}

Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ].includes(value) )
                 return prop;
        }
    }
}

