
window.onload = function() {
  
    
        renderTasks();
 
}

const date = new Date();
 let day = date.getDate();
 let month = date.getMonth() + 1;
 let year = date.getFullYear();
 let currentDate = `${day}-${month}-${year}`;

let tasks =[];

// // let tasks = [
//     {
//         "title":"New Task ",
//         "date": currentDate,
//         "done": false
//     }
// // ];
if(localStorage.getItem("tasks")){
    tasks=JSON.parse(localStorage.getItem("tasks"));
}

// tasks=JSON.parse(localStorage.getItem("tasks"));


let tasksContainer = document.querySelector("#tasks");

// tasksContainer.innerHTML = ""; /// important // i add templat to html  to remove this step

document.querySelector(".add").addEventListener("click", function(){
    
    let newTask = {
        "title": "New task",
        "date": currentDate,
        "isdone": false
    };
    tasks.unshift(newTask);
    tasksContainer.innerHTML = "";
    renderTasks();
    storeTasks();
});

function renderTasks() {
   
   

    for (let i = 0; i < tasks.length; i++) {

        let task = tasks[i];
 
        let content = `

        <div class="task ${task.isdone ? "greendone":""}">         
           <div class="taskName">

           <h2 class="editable"  contentEditable="true"  >${task.title}</h2>                                                    
           

            
                    <p> <span class="material-symbols-outlined">calendar_month</span>${currentDate} </p>            
        </div>             
            <div class="taskAction">


                <button   onclick="deletTask(${i})"class="circuler " style="color: white; background-color:#ff884b; font-size: 26px;">
                🗑</button>

                    ${task.isdone ? '<button onclick="toggleDone('+i+')" class="circuler " style="color: white; background-color:seagreen;">✔</button>'
                     :
                      '<button onclick="toggleDone('+i+')" class="circuler " style="color: white; background-color:#75cfb8 "> ❌</button>' }



            </div>
        </div>

        `;
        if (task.isdone) {
            content = content.replace('<div class="task">', '<div class="task greendone">');
        }


        tasksContainer.innerHTML +=  content;


        
        
    }
    const editableHeaders = document.querySelectorAll(".editable");
    editableHeaders.forEach((editableHeader, i) => {
      editableHeader.addEventListener("blur", function() {
          tasks[i].title = editableHeader.innerText;
          storeTasks();
      });})


}


function deletTask(i){
     let yesNO = confirm(`Are you sure you want to delete ${tasks[i].title}?`);
     if(yesNO){
         tasks.splice(i, 1);
         tasksContainer.innerHTML="" ;
         
         renderTasks();

         storeTasks();
     }
 }



// function editTask(i) {
//     let newTitle = prompt("Enter new task title");
//     if (newTitle) {
//         tasks[i].title = newTitle;
//         tasksContainer.innerHTML = "";
//         renderTasks();
//         storeTasks();

//     }
// }
// function editTask(i) {
//     let newTitle = prompt("Enter a new title (max 30 characters)");
//     newTitle = newTitle.slice(0, 30);

//   if (newTitle) {
//         tasks[i].title = newTitle;
//         tasksContainer.innerHTML = "";
//         renderTasks();
//     }
// }


function toggleDone(i) {
    let task = tasks[i];
    task.isdone = !task.isdone;
    tasksContainer.innerHTML = "";
    renderTasks();
    storeTasks();
}
//******************storage functions******************//
function storeTasks(){
    let tasksString = JSON.stringify(tasks); //turn it to string //

    localStorage.setItem("tasks",tasksString); 

      // save it in local strorage//
  
}

/***********************maincheckbox********************** */
    // var mainbox = document.querySelector(".btndltall");
    // var checkboxes = document.querySelectorAll("#tasks input[type='checkbox']");
    // mainbox.addEventListener("change", function() {
    //     for (var i = 0; i < checkboxes.length; i++) 
    //                      if (mainbox.checked) {
               
    //                           checkboxes[i].style.display="none";
    //                            }
            
    //                     else{
    //                           checkboxes[i].style.display="flex";
        
    //                           }
    //     tasksContainer.innerHTML="" ;
         
    //     renderTasks();

    //     storeTasks();
    // });
   //***delet all taks function=************************************/    
    function deleteAll() {
        let confirmDelete = confirm("Are you sure you want to delete all tasks?");
        if (confirmDelete) {
            tasks = [];
            tasksContainer.innerHTML = "";
            storeTasks();
        }
    }    
 



/*****************************search bar********************* */
function emptyplcholder(){

    document.querySelector("input").placeholder="";

}


   function searchTasks() {

   
    var searchInput = document.querySelector("input").value;
    var tasks =document.querySelectorAll(".task")
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskH2 = task.querySelector("h2");
        if (taskH2.textContent.toLowerCase().includes(searchInput.toLowerCase()))
         {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    }
}


/************************enable editting on task name by click*****************/


const editableHeaders = document.querySelectorAll(".editable");
editableHeaders.forEach((editableHeader, i) => {
    editableHeader.addEventListener("blur", function() {
        tasks[i].title = editableHeader.innerText;
        tasksContainer.innerHTML = "";
        renderTasks();
        storeTasks();
    });
});
