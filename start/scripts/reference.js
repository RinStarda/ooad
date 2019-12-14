function drawReference()
{
    joint.dia.Link.define('reference.CustomLink',{
        attrs: {
            line: {
                connection: true,
                stroke: '#333333',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                strokeDasharray: '5 5',
                strokeDashoffset: '2.5'
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
    var link = new joint.shapes.reference.CustomLink();
    link.source(source);
    link.target(target);
    link.addTo(graph);
    link.labels([{attrs: {text: {text: linkname.pop()}}}]);
}