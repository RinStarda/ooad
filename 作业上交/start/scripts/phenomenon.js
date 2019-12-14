var vphenomenons = new Vue({
    el:'#showphenomenon',
    data: {
        items: null
    }
});
vphenomenons.items = new Array();

function addPhenomenon(phenomenon){
    vphenomenons.items.push({initiator:getLabelById(phenomenon.Initiator),reciever:getLabelById(phenomenon.Receiver),description:phenomenon.description});
}

function updatePhenomenon(oldname,newname){
    var links = vphenomenons.items;
    for(var i=0;i<links.length;i++){
        if(links[i].initiator == oldname){
            links[i].initiator = newname;

        }
        if(links[i].reciever == oldname){
            links[i].reciever = newname;

        }
    }

}

function getLabelById(id)
{
    var models = paper.model.attributes.cells.models;
    console.log(id);
    for(i=0;i<models.length;i++){
        if(models[i].id==id) return models[i].attributes.attrs.label.text;
    }
}
function getPhenomenonList(model){
    var phenomenons = model.phenomenon;
    var str = "<table border='1px' cellspacing='0' cellpadding='0'><tr><th bgcolor='#deb887'>Initiator</th><th bgcolor='#deb887'>Receiver</th><th bgcolor='#deb887'>Description</th></tr>";
    for(var i=0;i<phenomenons.length;i++){
        str += '<tr bgcolor="#f5f5dc">'+'<td>'+ getLabelById(phenomenons[i].Initiator)+'</td>'+'<td>'+ getLabelById(phenomenons[i].Receiver)+'</td>'+'<td>'+ phenomenons[i].description+'</td>'+'</tr>'
    }
    str += '</table>';
    return str;
}
