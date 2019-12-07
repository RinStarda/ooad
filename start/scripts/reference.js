var references = new Vue({
    el:'#vue_references',
    data: {
        items: null
    }
});
references.items = new Array();

var ref = new Vue({
    el:'#addReference',
    data:{
        options: null,
        name:null,
        content:null
    }
});
ref.options = new Array();

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

var domainList = new Vue({
    el:'domainList',
    data:{
        items:null
    }
});
domainList.item = new Array();

var domain = new Vue({
    el:"domain",
    data:{
        id:null,
        connected:false
    }
});


function updateElement(){
    var models = paper.model.attributes.cells.models;
    selector.options.push(models[models.length-1].attributes.attrs.label.text);
}

function updateReference(){
    references.items.push({name:selector.name,content:selector.content});
}

function getLabelById(id)
{
    var models = paper.model.attributes.cells.models;
    for(i=0;i<models.length;i++){
        if(models[i].id==id) return models[i].attributes.attrs.label.text;
    }
}