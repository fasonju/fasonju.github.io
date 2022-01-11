var index = 0;
var startexists = false;
var endexists = false;
let mousedown = false;
for(let i = 0; i < 15; i++)
{
    var row = document.createElement('div');
    for(let j = 0; j < 40; j++)
    {
        var node = document.createElement('div');
        node.id = index.toString();
        index++;
        node.className = "node";
        node.addEventListener("mousedown",iswall);
        node.addEventListener("mouseup", function(){mousedown = false;});
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
        this.toggleAttribute("isend");
        endexists = true;
    }
    else if(!startexists && endexists)
    {
        if(this.hasAttribute("isend"))
        {
            this.toggleAttribute("isend");
            endexists = false;
        }
        this.toggleAttribute("isstart")
        startexists = true;
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

function reset()
{
    const grid = document.getElementById(grid);
    while(true)
    {
        grid.removeChild(grid.firstChild);
        if(grid.firstChild == null)
        {
            break;
        }
    }
    var index = 0;
    var startexists = false;
    var endexists = false;
    let mousedown = false;
    for(let i = 0; i < 15; i++)
    {
        var row = document.createElement('div');
        for(let j = 0; j < 40; j++)
        {
            var node = document.createElement('div');
            node.id = index.toString();
            index++;
            node.className = "node";
            node.addEventListener("mousedown",iswall);
            node.addEventListener("mouseup", function(){mousedown = false;});
            node.addEventListener("mouseenter", function(){if(mousedown){this.toggleAttribute("iswall")}});
            node.addEventListener("dblclick",dbl);
            row.appendChild(node);
        }
        grid.appendChild(row);
    }
}