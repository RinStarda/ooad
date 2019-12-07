function drawProblemDomain(pname)
{
    pname=typeof(pname) !='undefined' ? pname : "problem domain";
    var CustomElement = joint.dia.Element.define('domain.CustomElement', {
        attrs: {
            label: {
                fill:'black'
            },
            body: {
                strokeWidth: 1,
                stroke: '#000000',
                fill: 'white'
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName:'text',
            selector:'label'
        }]
    });
    var element = new CustomElement();
    element.attr({
        label:{
            text: pname,
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '50%',
            refY: '50%',
        },
        body: {
            refWidth: '100%',
            refHeight: '100%',
        }
    });
    element.position(300, 50);
    element.resize(130, 50);
    element.addTo(graph);
    var models = paper.model.attributes.cells.models;
}