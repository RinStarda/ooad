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

var linkname = ['n','m','l','k','j','i','h','g','f','e','d','c','b','a'];

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1200,
    height: 635,
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
            link = drawInterface();
            i.checked=false;
        }
        else if(r.checked === true)
        {
            link = drawReference();
            r.checked=false;
        }
        else if(c.checked === true)
        {
            link = drawConstraint();
            c.checked=false;
        }
    }

});


paper.on('element:pointerdblclick', function(elementView) {
    var model = elementView.model;
    var render = null;
    if(model.attributes.type == "domain.CustomElement")
        render = {
            events: {
                'click .confirm': function(){
                    var description = this.$('.description').val();
                    var oldname = elementView.model.attributes.attrs.label.text;
                    model.attr('label/text',description);
                    updatePhenomenon(oldname,description);
                    updateAllLabel(model.id);
                },
                'click .cancel': 'remove',
                'click .confirmsize': function(){
                    var width = parseFloat(this.$('.width').val());
                    var height = parseFloat(this.$('.height').val());
                    model.resize(width, height);
                },
                'click .phy': function(){
                    var property = this.$('.phy').val();
                    if(property == "Design"){
                        model.attr('r2/x',12);
                        model.attr('r2/refWidth','70%');
                        model.attr('r1/refWidth','70%');
                    }
                    else
                        model.attr('r2/x',0);
                        model.attr('r2/refWidth','112%');
                },
                'click .dt': function(){
                    var type = this.$('.dt').val();
                    if(type == 'C'){
                        model.attr('label2/text','C')
                    }
                    else if(type == 'B'){
                        model.attr('label2/text','B')
                    }
                    else if(type == 'L'){
                        model.attr('label2/text','X')
                    }
                },
            },
            content: [
                '<div>',
                'Description <input class="description" type="text" value="'+elementView.model.attributes.attrs.label.text+'"> <br><br>',
                '<button class="confirm" style="background-color: beige;float:right">Confirm</button>',
                '<button class="cancel" style="background-color: beige;float:right"">Cancel</button>',
                '<br></div>',
                '<div>',
                'Size <br>',
                'width<input class="width" type="text" value="'+elementView.model.attributes.size.width+'"> <br><br>',
                'height<input class="height" type="text" value="'+elementView.model.attributes.size.height+'"> <br><br>',
                '<button class="confirmsize" style="background-color: beige;float:right">Confirm</button>',
                '<button class="cancel" style="background-color: beige;float:right"">Cancel</button>',
                '<br></div>',
                '<div>',
                'Physical Property<br><select class="phy"><option value="Design">DesignDomain</option><option value="Given">GivenDomain</option></select>',
                '</div>',
                '<div>',
                'DomainType<br><select class="dt"><option value="C">Causal</option><option value="B">Biddable</option><option value="X">Lexical</option></select>',
            ].join(''),
            target: document.getElementById('editor')
        }
    else
        render = {
            events: {
                'click .confirm': function(){
                    var description = this.$('.description').val();
                    var oldname = elementView.model.attributes.attrs.label.text;
                    elementView.model.attr('label/text',description);
                    updatePhenomenon(oldname,description);
                    updateAllLabel(model.id)
                },
                'click .cancel': 'remove',
                'click .confirmsize': function(){
                    var width = parseFloat(this.$('.width').val());
                    var height = parseFloat(this.$('.height').val());
                    model.resize(width, height);
                },
            },
            content: [
                '<div>',
                'Description: <input class="description" type="text" value="'+elementView.model.attributes.attrs.label.text+'"> <br><br>',
                '<button class="confirm" style="background-color: beige;float:right">Confirm</button>',
                '<button class="cancel" style="background-color: beige;float:right"">Cancel</button>',
                '</div>',
                '<div>',
                'Size <br>',
                'width<input class="width" type="text" value="'+elementView.model.attributes.size.width+'"> <br><br>',
                'height<input class="height" type="text" value="'+elementView.model.attributes.size.height+'"> <br><br>',
                '<button class="confirmsize" style="background-color: beige;float:right">Confirm</button>',
                '<button class="cancel" style="background-color: beige;float:right"">Cancel</button>',
                '<br></div>',
            ].join(''),
            target: document.getElementById('editor')
        }
    var popup = new joint.ui.Popup(render);
    popup.render();
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
                updateLabel(linkView.model);
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

function updateLabel(model){
    var initiators = new Array();
    var l = model.attributes.labels[0].attrs.text.text[0] + ":";
    for(var i=0;i<model.phenomenon.length;i++){
        initiators.push(model.phenomenon[i].Initiator);
    } 
    initiators = new Set(initiators);
    iniiter = initiators.values();
    for(var i=0;i<initiators.size;i++){
        var ini = iniiter.next();
        l += getLabelById(ini.value) + "!{";
        for(var j=0;j<model.phenomenon.length;j++){
            if(model.phenomenon[j].Initiator == ini.value){
                l += model.phenomenon[j].description + ",";
            }
        }
        l = l.substr(0,l.length-1);
        l += "}";
    }
    model.labels([{attrs: {text: {text: l}}}]);
}

function updateAllLabel(id){
    var models = paper.model.attributes.cells.models;
    for(var i = 0;i<models.length;i++){
        var type = models[i].attributes.type;
        if(type == "interface.CustomLink"||type=="constraint.CustomLink"||type=="reference.CustomLink"){
            var p = models[i].phenomenon;
            for(var j=0;j<p.length;j++){
                if(p[j].Initiator == id){
                    updateLabel(models[i]);
                    break;
                }
            }
        }
    }
}

function getDomainListHtml(){
    var combination = document.getElementById('combination');
    var innerHtml = "";
    var models = paper.model.attributes.cells.models;
    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type == "domain.CustomElement"){
            innerHtml += '<input type="checkbox" name="com" value="'+ models[i].id + '">' + getLabelById(models[i].id) + '<br>';
        }
    }
    innerHtml += '<button onclick="combination()">confirm</button>';
    combination.innerHTML = innerHtml;
}

/*function combination(){
    var models = paper.model.attributes.cells.models;
    var combination = document.getElementByName("com");
    drawProblemDomain();
    //获得即将合并的问题领域
    var comdomain = models[models.length-1];
    //修改线的连接
    for(var i = 0;i<models.length-1;i++){
        if()
    }


}*/