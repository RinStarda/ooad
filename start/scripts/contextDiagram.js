function checkContextDiagram(){

    var solomachine = true;//检查是否有孤立machine
    var notexistdomain = true;//是否存在domain
    var existph = true;//假设每个interface都有pheno...
    var domain = new Array();

    var models = paper.model.attributes.cells.models;
    var machine_id = null;

    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type == "machine.CustomElement") machine_id = models[i].id;
        if(models[i].attributes.type == "domain.CustomElement") domain.push(models[i].id);
    }

    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type == "interface.CustomLink"){
            if(models[i].attributes.source.id == machine_id) solomachine = false;
            if(models[i].attributes.target.id == machine_id) solomachine = false;
            if(models[i].phenomenon == undefined || models[i].phenomenon.length==0) existph = false;
            if(domain.indexOf(models[i].attributes.source.id)!=-1)domain.splice(domain.indexOf(models[i].attributes.source.id));
            if(domain.indexOf(models[i].attributes.target.id)!=-1)domain.splice(domain.indexOf(models[i].attributes.target.id));

        }
        else if(models[i].attributes.type == "domain.CustomElement") notexistdomain = false;
    }

    var correct = "Correct Context Diagram!";
    var error = null;

    if(solomachine==true) error = "There is an isolated machine!\n";//孤立machine怎么翻译
    else if(notexistdomain==true) {
        if(error==null){
            error = "Please add at least one domain!\n";
        }
        else error += "Please add at least one domain!\n";
    }
    else if(existph == false){
        if(error == null){
            error = "Please define the interface!\n";
        }
        else error += "Please define the interface!\n";
    }
    else if(domain.length!=0){
        if(error == null){
            error = "There is an isolated domain\n";
        }
        else error += "There is an isolated domain\n";
    }

    if(error!=null)
        alert(error);
    else
        alert(correct);
}

function showContextDiagram()
{
    var models = paper.model.attributes.cells.models;
    for(var i=0;i<models.length;i++){
        if(models[i].attributes.type == "requirement.CustomElement")
        {
            models[i].attr('label/visibility','hidden');
            models[i].attr('body/visibility','hidden');
            models[i].attr('button/visibility','hidden');
            models[i].attr('buttonLabel/visibility','hidden');
        }
        else if (models[i].attributes.type == "standard.Link") {
            models[i].attr('line/visibility','hidden');
        }
        else if (models[i].attributes.type == "reference.CustomLink"){//constraint.CustomLink
            models[i].attr('line/visibility','hidden')
        }
        else if (models[i].attributes.type == "constraint.CustomLink") {
            models[i].attr('line/visibility','hidden');
        }
    }
    return;
}
