function drawProblemDomain(pname)
{
    pname=typeof(pname) !='undefined' ? pname : "problem domain";
    var CustomElement = joint.dia.Element.define('domain.CustomElement', {
        attrs: {
            r1: {
                strokeWidth: 1,
                stroke: 'black',
                fill: 'white'
            },
            r2: {
                strokeWidth: 1,
                stroke: '#000000',
                fill: 'white'
            },
            label: {
                fill:'black'
            },
            label2:{
                fill:'black'
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
            tagName: 'text',
            selector: 'label'
        }, {
            tagName: 'text',
            selector: 'label2'
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
            x:10
        },
        label2:{
            text: 'C',
            textVerticalAnchor:'middle',
            textAnchor: 'middle',
            refX: '95%',
            refY: '90%',
        },
        r1: {
            refWidth: '100%',
            refHeight: '100%',
        },
        r2: {
            x: 0, // additional x offset
            refWidth: '120%',
            refHeight: '100%',
        },
    });
    element.position(300, 50);
    element.resize(150, 55);
    element.addTo(graph);
}