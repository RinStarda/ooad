function change(){
    var obj = document.getElementById("myholder");
    obj.attr("id","problemDiagram");
    alert(obj.id)
}

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: document.getElementById('problemDiagram'),
    model: graph,
    width: 780,
    height: 1000,
    gridSize: 1,
    drawGrid:true,
    background: {
        color:'whitesmoke'
    },
    elementView: joint.dia.ElementView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    }),
    linkView: joint.dia.LinkView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    })
});


paper.on('blank:pointerclick',function(){
    //resetAll(this);
    let rq = document.getElementById("requirement");
    let p = document.getElementById("problemDomain");
    let m = document.getElementById("machine");

    if(rq.checked === true)
    {
        drawRequirement();
        rq.checked=false;
        return;
    }

    if(p.checked === true)
    {
        drawProblemDomain();
        p.checked=false;
        return;
    }

    if(m.checked === true)
    {
        drawMachine();
        m.checked=false;
        return;
    }

})

paper.on('element:pointerclick', function(elementView) {
    if(lock == false){
        lock = true;
        source = elementView.model;
    }
    else{
        lock = false;
        target = elementView.model;
        let i = document.getElementById("interface");
        let r = document.getElementById("reference");
        let c = document.getElementById("constraint");
        if(i.checked === true)
        {
            drawInterface();
            i.checked=false;
            return;
        }
        if(r.checked === true)
        {
            drawReference();
            r.checked=false;
            return;
        }
        if(c.checked === true)
        {
            drawConstraint();
            c.checked=false;
            return;
        }
    }
});

paper.on('element:pointerclick', function(elementView) {
    joint.ui.Inspector.create('.inspector-container', {
        cell: elementView.model,
        inputs: {
            'attrs/label/text': {
                type: 'text',
                label: 'Name',
                group: 'basic',
                index: 1
            }
        },
        groups: {
            basic: {
                label: 'List',
                index: 1
            }
        }
    });
});

var lock = false;
var source = null;
var target = null;

function drawInterface2()
{
    var link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    link.attr({
        line:{
            targetMarker:{
                'type': 'rect',
                'width':1,
                'height':1
            }
        }
    });
    link.addTo(graph);
}




function drawProblemDomain2(pname)
{
    pname=typeof(pname) !='undefined' ? pname : "problemDomain";
    var rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 50);
    rect.resize(100, 50);
    rect.attr({
        body: {
            fill: 'white'
        },
        label: {
            text: pname,
            fill: 'black'
        }
    });
    rect.addTo(graph);
}
paper.on('link:pointerclick', function(linkView) {
    var link = linkView.model;
    var val = prompt("输入描述","interface");
    link.labels([{
        attrs: {
            text: {
                text: val
            }
        }
    }])
});

function drawMachine2(mname)
{
    mname=typeof(mname) !='undefined' ? mname : "machine";
    var CustomElement = joint.dia.Element.define('examples.CustomElement', {
        attrs: {
            label: {
                fill:'black'
            },
            r1: {
                strokeWidth: 1,
                stroke: '#000000',
                fill: 'white'
            },
            r2: {
                strokeWidth: 1,
                stroke: '#000000',
                fill: 'white'
            },
            r3: {
                strokeWidth: 1,
                stroke: '#000000',
                fill: 'white'
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'r1'
        }, {
            tagName: 'rect',
            selector: 'r2'
        }, {
            tagName: 'rect',
            selector: 'r3'
        },{
            tagName:'text',
            selector:'label'
        }]
    });

    var element = new CustomElement();
    element.attr({
        label:{
            text: mname,
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '50%',
            refY: '50%',
            x:20
        },
        r1: {
            refWidth: '100%',
            refHeight: '100%',
        },
        r2: {
            x: 10, // additional x offset
            refWidth: '100%',
            refHeight: '100%',
        },
        r3: {
            x: 20, // additional x offset
            refWidth: '100%',
            refHeight: '100%',
        }
    });
    element.position(280, 130);
    element.resize(80, 50);
    element.addTo(graph);

}



function handleCanvas2()
{
    let i = document.getElementById("interface");
    let r = document.getElementById("reference");
    let c = document.getElementById("constraint");
    let rq = document.getElementById("requirement");
    let p = document.getElementById("problemDomain");
    let m = document.getElementById("machine");

    if(i.checked === true)
    {
        drawInterface();
        i.checked=false;
        return;
    }

    if(r.checked === true)
    {
        drawReference();
        r.checked=false;
        return;
    }

    if(c.checked === true)
    {
        drawConstraint();
        c.checked=false;
        return;
    }

    if(rq.checked === true)
    {
        drawRequirment();
        rq.checked=false;
        return;
    }

    if(p.checked === true)
    {
        drawProblemDomain();
        p.checked=false;
        return;
    }

    if(m.checked === true)
    {
        drawMachine();
        m.checked=false;
        return;
    }
}