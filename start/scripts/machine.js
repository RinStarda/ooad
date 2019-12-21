function drawMachine(mname)
{
    if(machine.id!=null)
    {
        alert('machine existed!');
        return;
    }
    mname=typeof(mname) !='undefined' ? mname : "machine";


    var CustomElement = joint.dia.Element.define('machine.CustomElement', {
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
    element.position(100, 150);
    element.resize(80, 50);
    element.addTo(graph);
    var models = paper.model.attributes.cells.models;
    machine.id=models[models.length-1].id;
    return element;
}