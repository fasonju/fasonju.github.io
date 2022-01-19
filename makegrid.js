let index = 0;
let mousedown = false;
let sets = false;
let sete = false;
let speed = 151;
let disabled = false;
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
        node.addEventListener("mouseenter", function(){if(mousedown){this.toggleAttribute("iswall")}});
        node.addEventListener("click",dbl);
        row.appendChild(node);
    }
    grid.appendChild(row);
}

function iswall()
{
    this.toggleAttribute("iswall");
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
        }
        else if(sete)
        {
            removestartorend(false);
            this.toggleAttribute("isend");
            this.toggleAttribute("isstart", false);
            sete = false;
            document.getElementById("pp").innerHTML=""
        }
    this.removeAttribute("iswall");
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
            startexists = false;
            endexists = false;
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
            ctr1++;
        }
    }
}

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
            ctr1++;
        }
    }
}