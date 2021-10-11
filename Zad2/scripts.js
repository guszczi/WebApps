"use strict"

let todoList = []; //declares a new array for Your todo list

let updateTodoList = function() {
	let todoListDiv = document.getElementById("todoListView");

	//remove all elements
	while (todoListDiv && todoListDiv.firstChild) {
		todoListDiv.removeChild(todoListDiv.firstChild);
	}

	//add all elements
	let filterInput = document.getElementById("inputSearch");
	for (let todo in todoList) {
		if ((filterInput.value == "") ||
			(todoList[todo].title.includes(filterInput.value)) ||
			(todoList[todo].description.includes(filterInput.value))) {

			let newElement = document.createElement("tr");

			// Add elements as table objects
			for (let [key, value] of Object.entries(todoList[todo])) {
				let elementContent = document.createElement("td");
				
				if (key == 'dueDate') {
					elementContent.innerHTML = value.split("T")[0]; // Make date more readable
				}
				else {
					elementContent.innerHTML = value;
				}

				newElement.appendChild(elementContent);
			}

			let newDeleteButtonWrapper = document.createElement("td");
			let newDeleteButton = document.createElement("input");

			newDeleteButtonWrapper.classList.add('center');

			newDeleteButton.type = "button";
			newDeleteButton.value = "Remove";
			newDeleteButton.addEventListener("click", function() { deleteTodo(todo); });

			todoListDiv.appendChild(newElement);
			newElement.appendChild(newDeleteButtonWrapper);
			newDeleteButtonWrapper.appendChild(newDeleteButton);
		}
	}
}

let initList = function() {
	let savedList = window.localStorage.getItem("todos");
	if (savedList != null)
		todoList = JSON.parse(savedList);
	else
	
	//code creating a default list with 2 items
	todoList.push(
		{
			title: "Learn JS",
			description: "Create a demo application for my TODO's",
			place: "445",
			dueDate: new Date(2019,10,16)
		},
		{
			title: "Lecture test",
			description: "Quick test from the first three lectures",
			place: "F6",
			dueDate: new Date(2019,10,17)
		}
	);

	setTimeout(() => {
		updateTodoList() //fix: update todo list to remove ~1s delay between init and view display
	}, 0)
}

let deleteTodo = function(index) {
	todoList.splice(index, 1);

	updateTodoList() //fix: update todo list to remove ~1s delay between delete and view display
}

let addTodo = function() {
	//get the elements in the form
	let inputTitle = document.getElementById("inputTitle");
	let inputDescription = document.getElementById("inputDescription");
	let inputPlace = document.getElementById("inputPlace");
	let inputDate = document.getElementById("inputDate");
	//get the values from the form
	let newTitle = inputTitle.value;
	let newDescription = inputDescription.value;
	let newPlace = inputPlace.value;
	let newDate = new Date(inputDate.value);
	//create new item
	let newTodo = {
		title: newTitle,
		description: newDescription,
		place: newPlace,
		dueDate: newDate
	};
	//add item to the list
	todoList.push(newTodo);
	window.localStorage.setItem("todos", JSON.stringify(todoList));

	updateTodoList() //fix: update todo list to remove ~1s delay between add and view display
}

initList();
setInterval(updateTodoList, 1000);