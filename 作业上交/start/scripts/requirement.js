function drawRequirement(rname)
{
    if(requirement.id!=null)
    {
        alert('requirement existed!');
        return;
    }
    rname=typeof(rname) !='undefined' ? rname : "requirement";
    var CustomElement = joint.dia.Element.define('requirement.CustomElement', {
        attrs: {
            label: {
                fill:'black'
            },
            body: {
                refRx: '100%',
                refRy: '100%',
            }
        }
    }, {
        markup: [{
            tagName: 'ellipse',
            selector: 'body'
        }, {
            tagName:'text',
            selector:'label'
        }]
    });
    var element = new CustomElement();
    element.attr({
        label:{
            text: rname,
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '0%',
            refY: '0%',
            visibility: 'visible'
        },
        body: {
            strokeWidth: 1,
            stroke: 'black',
            fill: 'white',
            strokeDasharray: '5 5',
            strokeDashoffset: '2.5',
            visibility: 'visible'
        }
    });
    element.position(600, 150);
    element.resize(60, 30);
    element.addTo(graph);
    var models = paper.model.attributes.cells.models;
    requirement.id=models[models.length-1].id;
}