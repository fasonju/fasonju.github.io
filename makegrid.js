let index = 0;
let startexists = false;
let endexists = false;
let mousedown = false;
let sets = false;
let sete = false;
let speed = 41;
for(let i = 0; i < 20; i++)
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
        node.addEventListener("contextmenu",dbl);
        node.addEventListener("contextmenu", e => e.preventDefault());
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
            this.toggleAttribute("isstart");
            this.toggleAttribute("isend", false);
            startexists = true;
            sets = false;
            document.getElementById("pp").innerHTML=""
        }
        else if(sete)
        {
            removestartorend(false);
            this.toggleAttribute("isend");
            this.toggleAttribute("isstart", false);
            endexists = true;
            sete = false;
            document.getElementById("pp").innerHTML=""
        }
    this.removeAttribute("iswall");
}

function removestartorend(bool)
{
    let ctr1 = 0;
    var grid = document.getElementById(grid)
    for(let i = 0; i < 20; i++)
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
    for(let i = 0; i < 20; i++)
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