var vphenomenons = new Vue({
    el:'#showphenomenon',
    data: {
        items: null
    }
});
vphenomenons.items = new Array();

function addPhenomenon(phenomenon){
    vphenomenons.items.push({Initiator:getLabelById(phenomenon.Initiator),Reciever:getLabelById(phenomenon.Receiver),description:phenomenon.description});
}

function updatePhenomenon(oldname,newname){
    var links = vphenomenons.items;
    for(var i=0;i<links.length;i++){
        if(links[i].Initiator == oldname){
            links[i].Initiator = newname;
        }
        if(links[i].Reciever == oldname){
            links[i].Reciever = newname;
        }
    }

}

function updateAllPhenomenon(){
    var phenomenons = new Array();
    var models = paper.model.attributes.cells.models;
    for(var i=0;i<models.length;i++){
        var type = models[i].attributes.type;
        if(type == "interface.CustomLink" || type=="reference.CustomLink"||type=="constraint.CustomLink"){
            for(var j=0;j<models[i].phenomenon.length;j++){
                phenomenons.push({Initiator:getLabelById(models[i].phenomenon[j].Initiator),Reciever:getLabelById(models[i].phenomenon[j].Receiver),description:models[i].phenomenon[j].description});
            }
        }
    }
    vphenomenons.items = phenomenons;
}

function getLabelById(id)
{
    var models = paper.model.attributes.cells.models;
    for(i=0;i<models.length;i++){
        if(models[i].id==id) return models[i].attributes.attrs.label.text;
    }
}
function getPhenomenonList(model){
    var phenomenons = model.phenomenon;
    var index = 0;
    var str = "<table border='1px' cellspacing='0' cellpadding='0'><tr><th bgcolor='#deb887'>Initiator</th><th bgcolor='#deb887'>Receiver</th><th bgcolor='#deb887'>Description</th></tr>";
    for(var i=0;i<phenomenons.length;i++){
        str += '<tr bgcolor="#f5f5dc" class="delete">'+'<td>'+ getLabelById(phenomenons[i].Initiator)+'</td>'+'<td>'+ getLabelById(phenomenons[i].Receiver)+'</td>'+'<td>'+ phenomenons[i].description+'</td>'+'<td onclick="deletePhenomenon('+"'"+model.id+"','"+index+"'"+')">'+ 'x'+'</td>'+'</tr>'
        index += 1;
    }
    str += '</table>';
    return str;
}

function deletePhenomenon(id, index){
    var models = paper.model.attributes.cells.models;
    for(var i=0;i<models.length;i++){
        if(models[i].id == id){
            models[i].phenomenon.splice(parseInt(index),1);
        }
    }
    updateAllPhenomenon();
}