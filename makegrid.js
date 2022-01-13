let index = 0;
let startexists = false;
let endexists = false;
let mousedown = false;

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
        node.addEventListener("dblclick",dbl);
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
    if(!startexists && !endexists)
    {
        this.toggleAttribute("isstart");
        startexists = true;
    }
    else if(startexists && !endexists)
    {
        if(this.hasAttribute("isstart"))
        {
            this.toggleAttribute("isstart")
            startexists = false;
        }
        else
        {
            this.toggleAttribute("isend")
            endexists = true;
        }
    }
    else if(!startexists && endexists)
    {
        if(this.hasAttribute("isend"))
        {
            this.toggleAttribute("isend");
            endexists = false;
        }
        else{
            this.toggleAttribute("isstart")
            startexists = true;
        }
        
    }
    else if(startexists && endexists)
    {
        if(this.hasAttribute("isstart"))
        {
            this.toggleAttribute("isstart")
            startexists = false;
        }
        else if(this.hasAttribute("isend"))
        {
            this.toggleAttribute("isend");
            endexists = false;
        }
    }
    this.removeAttribute("iswall");
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