function checkProblemDiagram(){
    var models = paper.model.attributes.cells.models;
    var flag=false;
    var cph=true;
    var rph=true;
    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type=="constraint.CustomLink"){
            flag=true;
            if(models[i].phenomenon == undefined || models[i].phenomenon.length==0) cph = false;
        }

        if(models[i].attributes.type=="reference.CustomLink"){
            if(models[i].phenomenon == undefined || models[i].phenomenon.length==0) rph = false;
        }
    }
    if(flag==false) alert("Please add at least one constraint!");
    else if(cph==false) alert("Please add phenomenon on the constraint!");
    else if(rph==false) alert("Please add phenomenon on the reference!")
    else alert("Correct Problem Diagram!");
    return;
}

function showProblemDiagram(){
    var models = paper.model.attributes.cells.models;
    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type == "requirement.CustomElement")
        {
            models[i].attr('label/visibility','visible');
            models[i].attr('body/visibility','visible');
            models[i].attr('button/visibility','visible');
            models[i].attr('buttonLabel/visibility','visible');
        }
        else if (models[i].attributes.type == "reference.CustomLink"){
            models[i].attr('line/visibility','visible');
            updateLabel(models[i]);
        }
        else if (models[i].attributes.type == "constraint.CustomLink") {
            models[i].attr('line/visibility','visible');
            updateLabel(models[i]);
        }
    }
    return;
}