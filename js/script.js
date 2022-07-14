let form=document.getElementById("form");
let textInput=document.getElementById("textInput");
let dateInput=document.getElementById("dateInput");
let textarea=document.getElementById("textarea");
let msg=document.getElementById("msg");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add");

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    formValidation();
});


let formValidation=()=>
{
    if(textInput.value === "")
    {
        msg.innerHTML="Text cannot be blank";
    }
    else
    {
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>
        {
            add.setAttribute("data-bs-dismiss","");
        })();

    }
}

let data=[];
let acceptData=()=>
{
    data.push
    (
        {
            "text":textInput.value,
            "date":dateInput.value,
            "description":textarea.value
        }
   );
    localStorage.setItem("data",JSON.stringify(data));
    createTask();
}

let createTask=()=>
{   
    tasks.innerHTML="";
    data.map((x,y)=>
    {
    let {text,date,description}=x;
    tasks.innerHTML+=
    `
    <div id="${y}">
        <span class="fw-bold">${text}</span>
        <span class="small text-secondary">${date}</span>
        <p>${description}</p>
        <span class="options">
            <i class="fas fa-edit" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
            <i class="fas fa-trash-alt" onclick="deleteTask(this);createTask()"></i>
        </span>
    </div>   
    `
    });
    resetForm();
}

let resetForm=()=>
{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
}

let deleteTask=(e)=>
{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
}

let editTask=(e)=>
{
    let selectItem=e.parentElement.parentElement;
    textInput.value=selectItem.children[0].innerHTML;
    dateInput.value=selectItem.children[1].innerHTML;
    textarea.value=selectItem.children[2].innerHTML;

    selectItem.remove();
    data.splice(selectItem.id,1);
    localStorage.setItem("data",JSON.stringify(data));
}



(()=>
{
    data= JSON.parse(localStorage.getItem("data")) || [];
    createTask();

})();








