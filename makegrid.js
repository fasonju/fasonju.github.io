let index = 0;
let mousedown = false;
let sets = false;
let sete = false;
let speed = 100;
var weight = 25;
let disabledweight = false;
let tablewall= true;
let tableweight = false;
for(let i = 0; i < 23; i++)
{
    var row = document.createElement('div');
    for(let j = 0; j < 60; j++)
    {
        var node = document.createElement('div');
        node.id = index.toString();
        index++;
        node.className = "node";
        node.addEventListener("mousedown",iswall);
        node.addEventListener("mouseenter", function(){
            if(mousedown)
            {
                if(tablewall)
                {
                    if(!this.hasAttribute("isend") && !this.hasAttribute("isstart"))
                    {
                        this.toggleAttribute("iswall");
                        this.toggleAttribute("isweight",false);
                    }
                }
                else if(!this.hasAttribute("isend") && !this.hasAttribute("isstart")){
                    this.toggleAttribute("isweight")
                    this.toggleAttribute("iswall",false)
                }
            }
        });
        node.addEventListener("click",dbl);
        node.addEventListener("contextmenu", function(e){
            e.preventDefault();
        }, false);
        row.appendChild(node);
    }
    grid.appendChild(row);
}

function iswall()
{
    if(tablewall)
    {
        if(!this.hasAttribute("isend") && !this.hasAttribute("isstart"))
        {
            this.toggleAttribute("iswall");
            this.toggleAttribute("isweight",false);
        }
    }
    else if(!this.hasAttribute("isend") && !this.hasAttribute("isstart"))
    {
        this.toggleAttribute("isweight");
        this.toggleAttribute("iswall",false);
    }
    mousedown = true;
}

function dbl()
{
        if(sets)
        {
            removestartorend(true);
            this.toggleAttribute("isstart", true);
            this.toggleAttribute("isend", false);
            startexists = true;
            endexists = false;
            sets = false;
            document.getElementById("pp").innerHTML=""
            this.removeAttribute("iswall");
            this.removeAttribute("isweight");
        }
        else if(sete)
        {
            removestartorend(false);
            this.toggleAttribute("isend");
            this.toggleAttribute("isstart", false);
            sete = false;
            document.getElementById("pp").innerHTML=""
            this.removeAttribute("iswall");
            this.removeAttribute("isweight");
        }
}

function removestartorend(bool)
{
    let ctr1 = 0;
    var grid = document.getElementById(grid)
    for(let i = 0; i < 23; i++)
    {
        for(let k = 0; k < 60; k++)
        {
            var docunode = document.getElementById(ctr1.toString());
            if(bool)
            {
                docunode.toggleAttribute("isstart",false)
            }
            else{
                docunode.toggleAttribute("isend",false)
            }
            ctr1++;
        }
    }
}

function Reset()
{
    let ctr1 = 0;
    var grid = document.getElementById(grid)
    for(let i = 0; i < 23; i++)
    {
        for(let k = 0; k < 60; k++)
        {
            var docunode = document.getElementById(ctr1.toString());
            docunode.toggleAttribute("iswall", false)
            docunode.toggleAttribute("visited", false)
            docunode.classList.remove("visited");
            docunode.classList.remove("backtrack");
            docunode.toggleAttribute("isstart", false)
            globaldeletedweights = [];
            docunode.toggleAttribute("isweight",false)
            docunode.toggleAttribute("isend", false)

            ctr1++;
        }
    }
}

function resetnotstart()
{
    let ctr1 = 0;
    var grid = document.getElementById(grid)
    for(let i = 0; i < 23; i++)
    {
        for(let k = 0; k < 60; k++)
        {
            var docunode = document.getElementById(ctr1.toString());
            docunode.toggleAttribute("iswall", false)
            docunode.toggleAttribute("visited", false)
            docunode.classList.remove("visited");
            docunode.classList.remove("backtrack");
            globaldeletedweights = [];
            docunode.toggleAttribute("isweight",false)
            ctr1++;
        }
    }
}
globaldeletedweights =[];
function removetrack()
{
    let ctr1 = 0;
    var grid = document.getElementById(grid)
    for(let i = 0; i < 23; i++)
    {
        for(let k = 0; k < 60; k++)
        {
            var docunode = document.getElementById(ctr1.toString());
            docunode.toggleAttribute("visited", false)
            docunode.classList.remove("visited");
            docunode.classList.remove("backtrack");
            if(globaldeletedweights.includes(ctr1))
            {
                docunode.toggleAttribute("isweight",true)
            }
            ctr1++;
        }
    }
    globaldeletedweights = [];
}

function removeweights()
{
    if(disabled){
        return;
    }
    for(let i = 0; i< 1380; i++)
    {
        document.getElementById(i.toString()).toggleAttribute("isweight",false);
    }
    globaldeletedweights =[];
}

function removewalls()
{
    if(disabled){
        return;
    }
    for(let i = 0; i< 1380; i++)
    {
        document.getElementById(i.toString()).toggleAttribute("iswall",false);
    }
}