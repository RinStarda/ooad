function drawInterface()
{
    joint.dia.Link.define('interface.CustomLink',{
        attrs: {
            line: {
                connection: true,
                stroke: '#333333',
                strokeWidth: 2,
                strokeLinejoin: 'round'
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
    var link = new joint.shapes.interface.CustomLink();
    link.source(source);
    link.target(target);
    link.addTo(graph);

    var removeButton = new joint.linkTools.Remove();
    var toolsView = new joint.dia.ToolsView({
        tools:[removeButton]
    });
    var linkView = link.findView(paper);
    linkView.addTools(toolsView);
    linkView.showTools();
}