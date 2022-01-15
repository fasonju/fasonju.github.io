function generatestair()
{   
    resetnotstart();
    let startpos = 1320;
    while((startpos + 1) % 60 != 0)
    {
        while(startpos > 119 && (startpos + 1) % 60 != 0)
        {
            document.getElementById(startpos.toString()).toggleAttribute("iswall",true);
            startpos -= 59;
        }

        while(startpos < 1260 && (startpos + 1) % 60 != 0)
        {
            document.getElementById(startpos.toString()).toggleAttribute("iswall",true);
            startpos += 61;
        }
    }
}

function generaterandom()
{
    resetnotstart();
    let ctr1 = 0;
    for(let i = 0; i < 23; i++)
    {
        for(let j = 0; j < 60; j++)
        {
            if(Math.floor(Math.random() * 100) > 64) 
            {
                document.getElementById(ctr1.toString()).toggleAttribute("iswall",true);
            }
            ctr1++;
        }
    }
    checkifpossible();
}

function checkifpossible()
{
    var dict = {};
    const get = getmatrix();
    let start = get[0];
    let end = get[1];
    const walls = get[2]
    const Q = [];
    Q.push(start);
    const allpassed = [];
    var foundanswer = null;
    while(Q.length > 0)
    {
        var dq = Q.shift();
        keys = Object.keys(dict);
        const neighbors = BFSdirections(dq,walls,keys);
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
                Q.push(neighbor);
                allpassed.push(neighbor);
            }
        }
        if(foundanswer == true)
        {
            break;
        }
    }
    BFSallpassed = allpassed;
    if(foundanswer != true)
    {
        generaterandom();
    }

}

