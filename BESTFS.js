function BESTFS()
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
    S.push(start);
    while(S.length > 0)
    {
        let ds = S.pop();
        let dsstring = ds.toString();
        BFSallpassed.push(ds)
        if(ds == end)
        {   
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
            dict[dsstring].push(x);
            if(!allpassed.includes(x))
            {
                S.push(x);
                allpassed.push(x);
            }
        }
        S = Sortbydistancenew(S,end);
    }
    backtrack(dict,end,start);
    visualizeallpassed(true)
}

function getdistancenew(id,end)
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
    return( deltax + deltay);
}

function Sortbydistancenew(S,end)
{
    const dict ={}
    const temp = [];
    for(var value of S)
    {
        let x = getdistancenew(value,end)
        temp.push(x)
        if(Object.keys(dict).includes(x.toString()) == false)
        {
            dict[x.toString()] = [];
        }
        dict[x.toString()].push(value);
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
                newS.push(z);
            }
            passed.push(val);
        }
    }
    return newS;
}
