
function generatestair()
{   
    document.getElementById("dropdown").classList.remove("active")
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
    document.getElementById("dropdown").classList.remove("active")
    resetnotstart();
    let ctr1 = 0;
    for(let i = 0; i < 23; i++)
    {
        for(let j = 0; j < 60; j++)
        {
            if(Math.floor(Math.random() * 100) > 60) 
            {
                var doc =document.getElementById(ctr1.toString())
                if(!doc.hasAttribute("isstart") && !doc.hasAttribute("isend"))
                {
                    doc.toggleAttribute("iswall",true)
                }
                
            }
            ctr1++;
        }
    }
    checkifpossible(true)
    
}

function generaterandomweight()
{
    var selectedvalue = document.getElementById("dropdown2").value;
    if(selectedvalue != "Breadthfirst" && selectedvalue != "Depthfirst")
    {
        document.getElementById("dropdown").classList.remove("active")
        resetnotstart();
        let ctr1 = 0;
        for(let i = 0; i < 23; i++)
        {
            for(let j = 0; j < 60; j++)
            {
                if(Math.floor(Math.random() * 100) > 60) 
                {
                    var doc =document.getElementById(ctr1.toString())
                    if(!doc.hasAttribute("isstart") && !doc.hasAttribute("isend"))
                    {
                        doc.toggleAttribute("isweight",true)
                    }
                    
                }
                ctr1++;
            }
        }
    }
    else{
        swal("this algorithm is unweighted");
    }
    
}

function checkifpossible(bool)
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
        if(bool)
        {
            generaterandom();
        }
        else{
            randomprim();
        }
    }

}

function getmat()
{
    var matrix = [];
    resetnotstart();
    Q = []
    for(let i = 0; i < 23; i++)
    {
        var row =[]
        for(let j = 0; j < 60; j++)
        {
            row.push([]);
        }
        matrix.push(row);
    }
    return matrix;
}
function recursivedivisionmaze()
{
    const matrix = getmat()
    var id = []
    id.push(0);
    Q.push([matrix,id,[]]);
    const container = [];
    let num = 0;
    while(Q.count > 0)
    {
        const dqarr = Q.shift();
        var dq = dqarr[0];
        let id = dqarr[1];
        var past = dqarr[2];
        const LR = dividehorizontal(dq);
        num++;
        id.push(num);
        if(LR[0].length > 4 && LR[0][0].length > 4)
        {
            var pasttop = past.slice().push("top");
            Q.push([LR[0],id, pasttop])

        }
        else{
            container.push([LR[0],id,past])
        }
        if(LR[1].length > 4 && LR[1][0].length > 4)
        {
            var pastbot = past.slice().push("bot");
            Q.push([Lr[1],id, pastbot])
        }
        else{
            container.push([LR[1],id,pastbot])
        }
    }
}

function dividehorizontal(dq)
{
    let random = randomIntFromInterval(2, dq.length - 2);
    let hole = randomIntFromInterval(0, dq[0].length - 1);
    for(let i = 0; i < dq[0].length; i++)
    {
        if(i != hole)
        {
            dq[random][i]= 'W'
        }
        else{
            dq[random][i] ='.'
        }
    }
    const top = dq.slice(0,random)
    const bot = dq.slice(random,dq.length)
    return [top,bot]
    
}

function randomIntFromInterval(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomprim()
{
    resetnotstart();
    document.getElementById("dropdown").classList.remove("active")
    const matrix = [];
    const indexes = []
    for(let i = 0; i < 23; i++)
    {
        const row =[]
        for(let j = 0; j < 60; j++)
        {
            if(j != 0 && j != 59)
            {
                row.push(".")
            }
            else{
                row.push("W")
            }
        }
        matrix.push(row);
    }
    for( let j = 0; j < 60; j++)
    {
        matrix[0][j] = "W";
        matrix[22][j] = "W";
    }
    let begin = randomIntFromInterval(60,1319);
    while(begin + 1 % 60 == 0 && begin % 60 == 0)
    {
        begin = randomIntFromInterval(60,1319);
    }
    let num = 59;
    let yval =0;
    for(let i = 1; i <= 23; i++ )
    {
        if(begin <= num)
        {
            break;
        }
        num += 60;
        yval++;
    }
    let xval = begin - yval*60;
    const beginarr =[yval,xval]
    indexes.push(beginarr)
    const animatearr = [];
    while(indexes.length > 0)
    {
        var index = indexes.pop();
        if(matrix[index[0]][index[1]] == ".")
        {
            let count = 0;
            if(matrix[index[0]][index[1] + 1] == "P"){
                count++;
            }
            if(matrix[index[0]][index[1] - 1] =="P"){
                count++
            }
            if(matrix[index[0] + 1][index[1]] == "P"){
                count++;
            }
            if(matrix[index[0] - 1][index[1]] == "P"){
                count++;
            }
            if(count < 2){
                matrix[index[0]][index[1]] = "P"
                animatearr.push(index);
                const directions = primdirections(index,matrix)
                for(var direction of directions)
                {
                indexes.push(direction)
                }
            }
        }
        shuffleArray(indexes);
    }
    console.log(indexes.length)
    console.log(matrix);
    animatemazegen(animatearr)
    alltowalls();
}

async function animatemazegen(animatearr)
{
    for(var p of animatearr)
    {
        await sleep(speed);
        let index = p[0]*60 + p[1];
        document.getElementById(index.toString()).toggleAttribute("iswall",false)
    }
}

function alltowalls()
{
    let counter = 0;
    for(let i = 0; i< 23; i++)
    {
        for(let j = 0; j < 60; j++)
        {
            if(!document.getElementById(counter.toString()).hasAttribute("isend") && !document.getElementById(counter.toString()).hasAttribute("isstart"))
            {
                document.getElementById(counter.toString()).toggleAttribute("iswall",true);
            }
            counter++
        }
    }
}

function primdirections(index,matrix)
{
    const result = [];
    if(index[0] > 1 && matrix[index[0] - 1][index[1]] == "." && matrix[index[0] - 2][index[1]] != "P" && matrix[index[0] - 1][index[1] + 1] != "P" && matrix[index[0] - 1][index[1] - 1] != "P") 
    {
        result.push([index[0] - 1,index[1]])
    }
    if(index[0] < 22 && matrix[index[0] + 1][index[1]] == "." && matrix[index[0] + 2][index[1]] != "P" && matrix[index[0] + 1][index[1] + 1] != "P" && matrix[index[0] + 1][index[1] - 1] != "P")
    {
        result.push([index[0] + 1,index[1]])
    }
    if(index[1] < 59 && matrix[index[0]][index[1] + 1] == "." && matrix[index[0]][index[1] + 2] != "P" && matrix[index[0] + 1][index[1] + 1] != "P" && matrix[index[0] - 1][index[1] + 1] != "P")
    {
        result.push([index[0],index[1] + 1])
    }
    if(index[1] > 1 && matrix[index[0]][index[1] - 1] == "." && matrix[index[0]][index[1] - 2] != "P" && matrix[index[0] + 1][index[1] - 1] != "P" && matrix[index[0] -1][index[1] - 1] != "P")
    {
        result.push([index[0],index[1] - 1])
    }
    return result;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
