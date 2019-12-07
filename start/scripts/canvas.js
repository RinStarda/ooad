var lock = false;
var source = null;
var target = null;
var machine = new Vue({
    el:'#machine',
    data:{
        id:null,
        connected:false
    }
});

var requirement = new Vue({
    el:'#requirement',
    data:{
        id:null,
        connected:false
    }
});

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1200,
    height: 600,
    gridSize: 1,
    drawGrid:true,
    background: {
        color:'whitesmoke'
    },
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


paper.on('element:pointerdblclick', function(elementView) {
    var popup = new joint.ui.Popup({
        events: {
            'click .confirm': function(){
                var description = this.$('.description').val();
                var oldname = elementView.model.attributes.attrs.label.text;
                elementView.model.attr('label/text',description);
                updatePhenomenon(oldname,description);
            },
            'click .cancel': 'remove'
        },
        content: [
            '<div>',
            'Description: <input class="description" type="text" value="'+elementView.model.attributes.attrs.label.text+'"> <br><br>',
            '<button class="confirm" style="background-color: beige;float:right">Confirm</button>',
            '<button class="cancel" style="background-color: beige;float:right"">Cancel</button>',
            '</div>'
        ].join(''),
        target: document.getElementById('editor')
    });
    popup.render();
});


paper.on('element:button:pointerdown', function(elementView, evt) {
    evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)

    var model = elementView.model;
    if(model.attributes.type=="machine.CustomElement") machine.id=null;
    else if(model.attributes.type=="requirement.CustomElement") requirement.id=null;
    else
    {
        for(i=0;i<domainList.item.length;i++)
        {
            if(domainList.item[i].id==model.id) {
                domainList.item.splice(i,1);
                break;
            }
        }
    }
    model.remove();
});



paper.on('link:pointerclick', function(linkView) {
    var source_id = linkView.model.attributes.source.id;
    var target_id = linkView.model.attributes.target.id;
    if(linkView.model.phenomenon == undefined ){
        linkView.model.phenomenon = new Array();
    };
    var popup = new joint.ui.Popup({
        events:{
            'click .add':function(){
                var phenomenon = this.$('.phenomenon').val();
                var selected = this.$('.select option:selected').val();
                var unselected = selected==target_id? source_id:target_id;
                var p = {
                    Initiator: selected,
                    Receiver: unselected,
                    description: phenomenon
                };
                linkView.model.phenomenon.push(p);
                addPhenomenon(p);
                popup.remove();
            }
        },
        content: '<div>'+
            'Initiator<br>'+
            '<select class="select">'+
            '<option value ="'+source_id+'">'+getLabelById(source_id)+'</option><br>'+
            '<option value ="'+target_id+'">'+getLabelById(target_id)+'</option><br>'+
            '</select><br>'+
            'phenomenon<br>'+
            '<input type="text" class="phenomenon" name="phenomenon"><br>'+
            'phenomenonList<br>'+
            getPhenomenonList(linkView.model)+
            '<br><button class="add" style="background-color: beige;float:right">add</button><br>'+
            '</div>',
        target: document.getElementById('editor')
    });
    popup.render();
});
