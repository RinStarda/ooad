function drawConstraint()
{
    joint.dia.Link.define('constraint.CustomLink',{
        attrs: {
            line: {
                connection: true,
                stroke: '#333333',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                strokeDasharray: '5 5',
                strokeDashoffset: '2.5',
                targetMarker: {
                    'type': 'path',
                    'd': 'M 10 -5 0 0 10 5 z'
                }
            },
            wrapper: {
                connection: true,
                strokeWidth: 10,
                strokeLinejoin: 'round'
            }
        }
    }, {
        markup: [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'cursor': 'pointer',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none',
                'pointer-events': 'none'
            }
        }]
    });
    var link = new joint.shapes.constraint.CustomLink();
    link.source(source);
    link.target(target);
    link.addTo(graph);
    link.labels([{attrs: {text: {text: linkname.pop()}}}]);
}