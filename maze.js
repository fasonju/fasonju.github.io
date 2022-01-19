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
            if(Math.floor(Math.random() * 100) > 80) 
            {
                document.getElementById(ctr1.toString()).toggleAttribute("iswall",true);
            }
            ctr1++;
        }
    }
    //maze();
    checkifpossible()
    
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
/*let id = 0;
function maze()
{
    resetnotstart();
    createmaze = [];
    dict = {};
    for(let i = 0; i < 23; i++)
    {
        row = []
        for(let j = 0; j < 60; j++)
        {
            row.push('.');
        }
        createmaze.push(row);
    }
    const tracker = [];
    const holder = [];
    holder.push(createmaze);
    holder.push(tracker)
    holder.push([]);
    list = [];
    recursivedivisionhorizontal(holder,list);

    merge(list);
}

function recursivedivisionhorizontal(holder)
{
    gridvar = holder[0];
    if(gridvar.length <= 4 || gridvar[0].length <= 4)
    {
        return holder;
    }
    let randint = Math.floor(Math.random() * gridvar.length)
    for(let i = 0; i < gridvar[randint].length; i++)
    {
        gridvar[randint][i] ='W'
    }
    var grid1 = gridvar.slice(0,randint + 1)
    var grid2 = gridvar.slice(-(gridvar.length - randint - 1))
    console.log(grid1);
    console.log(grid2);
    var tracker = holder[1];
    const tracker1 = tracker.slice();
    const tracker2 = tracker.slice(); 
    tracker1.push("upper")
    tracker2.push("lower")
    id++;
    holder1 = []
    holder2 = []
    holder1.push(grid1)
    holder1.push(tracker1)
    holder1.push(holder[2].slice())
    holder2.push(grid2)
    holder2.push(tracker2)
    holder2.push(holder[2].slice())
    holder1[2].push(id)
    holder2[2].push(id)
    const newgrid = recursivevertical(holder1);
    const newgrid2 = recursivevertical(holder2);
    list.push(newgrid)
    list.push(newgrid2)
}

function recursivevertical(holder)
{
    var gridvar = holder[0];
    if(gridvar.length <= 4 || gridvar[0].length <= 4)
    {
        return holder;
    }
    grid1 = [];
    grid2 = [];
    holder3 = [];
    holder4 = [];
    let randint = Math.floor(Math.random() * gridvar[0].length)
    for(let i = 0; i < gridvar.length; i++)
    {
        for(let j = 0; j < gridvar[0].length; j++)
        {
            gridvar[i][randint] = 'W'
        }
        grid1.push(gridvar[i].slice(0,randint + 1));
        grid2.push(gridvar[i].slice(-(gridvar[i].length - randint - 1)));
    }
    console.log(grid1);
    console.log(grid2);
    var tracker = holder[1]
    const tracker1 = tracker.slice();
    const tracker2 = tracker.slice(); 
    tracker1.push("left")
    tracker2.push("right")
    id++;
    holder3.push(grid1)
    holder3.push(tracker1)
    holder3.push(holder[2].slice())
    holder4.push(grid2)
    holder4.push(tracker2)
    holder4.push(holder[2].slice())
    holder3[2].push(id)
    holder4[2].push(id)
    recursivedivisionhorizontal(holder3)
    recursivedivisionhorizontal(holder4)
}
function merge(list)
{

}
*/