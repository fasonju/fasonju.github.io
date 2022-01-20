function Astar()
{
    removetrack();
    const get = getmatrix();
    let start = get[0];
    let end = get[1];
    const walls = get[2]
    S = []; 
    const dict ={};
    const allpassed = [];
    BFSallpassed = []
    startarr = [start,0]
    let foundanswer = false;   
    S.push(startarr);
    while(S.length > 0)
    {
        let arr = S.pop();
        let ds = arr[0]
        let depth = arr[1]
        let dsstring = ds.toString();
        BFSallpassed.push(ds);
        allpassed.push(ds);
        depth++;
        if(ds == end)
        {   
            foundanswer = true;
            break;
        }
        var keys = Object.keys(dict);
        var directs = directions(ds,walls,keys)
        for(var x of directs)
        {
            if(!dict.hasOwnProperty(dsstring))
            {
                dict[dsstring] = [];
            }
            dict[dsstring].push([x,depth]);
            if(!allpassed.includes(x))
            {
                S.push([x,depth]);
                allpassed.push(x);
            }
        }
        S = Sortbydistance(S,end,depth);
    }
    if(foundanswer)
    {
        backtrackAstar(dict,end,start);
    }
    visualizeallpassed(foundanswer)
}

function getdistance(id,end,depth)
{
    let num = 59;
    let yvalue1 = 0;
    let yvalue2 = 0;
    for(let i = 1; i <= 23; i++ )
    {
        if(end <= num)
        {
            break;
        }
        num += 60;
        yvalue1++;
    }
    num = 59;
    for(let i = 1; i <= 23; i++ )
    {
        if(id <= num)
        {
            break;
        }
        num += 60;
        yvalue2++;
    }
    let deltay = yvalue1 - yvalue2;
    if(deltay < 0)
    {
        deltay *= -1;
    }
    idx =  id - yvalue2 * 60;
    endx =  end - yvalue1 * 60;
    let deltax = idx - endx;
    if(deltax < 0)
    {
        deltax *= -1;
    }
    return( deltax + deltay + depth);
}

function Sortbydistance(S,end)
{
    const dict ={}
    const temp = [];
    for(var value of S)
    {
        let x = getdistance(value[0],end,value[1])
        temp.push(x)
        if(Object.keys(dict).includes(x.toString()) == false)
        {
            dict[x.toString()] = [];
        }
        dict[x.toString()].push([value[0],value[1]]);
    }
    const newS =[];
    temp.sort(function(a,b){return a-b;}).reverse();
    passed = [];
    for(var val of temp)
    {
        if(!passed.includes(val))
        {
            for(var z of dict[val.toString()])
            {
                let arr = z;
                newS.push(arr);
            }
            passed.push(val);
        }
    }
    return newS;
}

function backtrackAstar(dict,end,start)
{
    const result = [];
    var num = end;
    let depth = findthedepth(end,dict);
    while(num != start)
    {
        result.push(num);
        num = parseInt(dict.getKeyByValuearr([num,depth--]));
    }
    BFSbacktrack = result;
}

function findthedepth(end,dict)
{
    for(let key in dict)
    {
        for(var val of dict[key])
        {
            if(val.includes(end))
            {
                return val[1];
            } 
        }
    }
}

Object.prototype.getKeyByValuearr = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
            for(var arr of this[prop])
            {
                if(arr[0] == value[0] && arr[1] == value[1])
                {
                    return prop;
                }
            }
             
        }
    }
}