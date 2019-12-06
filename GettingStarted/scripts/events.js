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
                elementView.model.attr('label/text',description);
                console.log(elementView.model);
            },
            'click .cancel': 'remove'
        },
        content: [
            '<div>',
            'Description: <input class="description" type="text" value="'+elementView.model.attributes.attrs.label.text+'"> <br><br>',
            '<button class="confirm">Confirm</button><br>',
            '<button class="cancel">Cancel</button>',
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
                updatePhenomenon(p);
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
                 '<input type="text" class="phenomenon"><br>'+
                 'phenomenonList<br>'+
                 getPhenomenonList(linkView.model)+
                 '<button class="add">add</button><br>'+
                 '</div>',
        target: document.getElementById('editor')
    });
   popup.render();
});