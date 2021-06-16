function loadHTMLFromString(content) {
    return (new DOMParser().parseFromString(content, "text/html").getRootNode().body.firstChild);
  }

window.addEventListener('load', () => {
    window.MyTdl = new MyTdl();


});

class MyTdl {
    constructor() { // Constructeur  avec la classe
        this.textArea = document.querySelector('input'); // Selectionne les élements entre '' du HTML pour les modifier.
        this.addButton = document.querySelector('#addButton');
        this.clrButton = document.querySelector('#clrButton');
        this.badge = document.querySelector('.badge');
        this.doneList = document.querySelector('#doneList');
        this.editList = document.querySelector('#editList');
        this.deleteList = document.querySelector('#deleteList');
        this.listItem = document.querySelector('.listItem');
        this.taskList = document.querySelector('#taskList');

// Ce qu'on entre dans l'input et VALIDER est stocké dans une Var text

        this.addButton.addEventListener('click', () => {
// Fin  : mettre une contrainte pour bloquer le bouton
            if (this.badge.textContent == "Max") {
                return this.badge;
            }

            this.addTask();
        });

// Tant que UL a des enfants, tu supprime le premier enfant de la liste.
        this.clrButton.addEventListener('click', () => {
            this.removeTask();
        });
        window.addEventListener('keyup', (e) => {
            if (e.key == 'Enter' && this.textArea.value!="") {
                if (this.badge.textContent == "Max") {
                    alert('Fais déja ce que tu dois faire !')
                    return;
                }
                this.addTask();      
            }
        });
    } 
//fin de constructor// début de méthodes

//Methodes
    addTask() {
        // Création d'un <li>
        let newLi = document.createElement('li');
        let textIntoLi = document.createElement('INPUT');
        textIntoLi.setAttribute("readonly", true);
        if(this.textArea.value !== ""){
            textIntoLi.style.transition = "1s";
            textIntoLi.value = this.textArea.value;
            textIntoLi.style.width = "600px";  
            newLi.appendChild(textIntoLi);
        }else{
            alert("Veuillez saisir une tâche.");
            return;
        }
        
// Create Valider Button
        let compteur = 0
        let iconCheck= `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>`;
        let newAddButton = document.createElement('button');
        let iconChecked = loadHTMLFromString(iconCheck);

        newAddButton.appendChild(iconChecked);
        newAddButton.className = 'btn btn-success';
        newAddButton.style.marginLeft = "20px"
        newLi.appendChild(newAddButton);
        newAddButton.addEventListener('click', ()=> {
            compteur++;
            if(compteur%2==1) {
                textIntoLi.style.backgroundColor="#2EA053";
            }else{
                textIntoLi.style.backgroundColor="#ffffff";
            }     
        });

//Bouton Editer tâche
        let iconEdit = `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>`;
        let newEditButton = document.createElement('button');
        let editIcon = loadHTMLFromString(iconEdit);

        newEditButton.appendChild(editIcon);
        newEditButton.style.marginLeft ="10px"
        newEditButton.className = "btn btn-primary";
        newEditButton.addEventListener("click", function () {
            if(textIntoLi.getAttribute("readonly", true)){
                textIntoLi.removeAttribute("readonly");
                textIntoLi.style.backgroundColor = "#bfd1ce";
            }else{
                textIntoLi.style.backgroundColor = "#ffffff";
                textIntoLi.setAttribute("readonly", true);
            }
            
        });
        newLi.appendChild(newEditButton);

// Bouton supprimer tâche
        let iconDelete= `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-octagon-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>`;
        let newDeleteButton = document.createElement('button');
        let iconDeleted = loadHTMLFromString(iconDelete);

        newDeleteButton.appendChild(iconDeleted);
        newDeleteButton.style.marginLeft ="10px"
        newDeleteButton.className = "btn btn-danger";
        newLi.appendChild(newDeleteButton);
        newDeleteButton.addEventListener("click", ()=> {
            newLi.parentNode.removeChild(newLi);
            this.badge.textContent--;
        });

// ++ Badge

        if (this.badge.textContent < 5) {
            this.badge.textContent++;
        } else {
            this.badge.textContent = "Max";
            return;
        }

        taskList.appendChild(newLi);
        this.textArea.value = "";
    }

    /*Fin de l'ajout de tâche */

    removeTask() {
        while (this.taskList.hasChildNodes()) {
            this.taskList.removeChild(this.taskList.firstChild);
        }
        this.badge.textContent = 0;
    }

} // fin de class