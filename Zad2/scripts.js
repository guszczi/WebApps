"use strict"

let todoList = []; //declares a new array for Your todo list

let backendUrl = 'https://api.jsonbin.io/b/6165c9339548541c29c22c3f'
let backendKey = '$2b$10$8PQguuYP4XNUV14Y3m6uEePfQQNQor.RZL2iaUwXwCqrQeC53113i' // don't hack me :))))

let formatDate = function(value) {
	let date = new Date(value);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (month.length < 2) {
		month = '0' + month;
	}
		
	if (day.length < 2) {
		day = '0' + day;
	}

	return [day, month, year].join('.')
}

let isInFilterSearch = function(todo) {
	let filterInputValue = $("#inputSearch").val();

	return filterInputValue == "" ||
		   todoList[todo].title.includes(filterInputValue) ||
		   todoList[todo].description.includes(filterInputValue)
}

let updateTodoList = function() {
	let todoListDiv = $("#todoListView");

	//remove all elements
	todoListDiv.empty();

	//add all elements
	for (let todo in todoList) {

		if (!isInFilterSearch(todo)) {
			continue
		}

		let newElement = $("<tr />");

		// Add elements as table objects
		for (let [key, value] of Object.entries(todoList[todo])) {
			let elementContent = $("<td />");
			
			if (key == 'dueDate') {
				elementContent.html(formatDate(value)); // Make date more readable
			}
			else {
				elementContent.html(value);
			}

			newElement.append(elementContent);
		}

		let newDeleteButtonWrapper = $("<td />").addClass('center');
		let newDeleteButton = $("<input />").attr('type', 'button').val('Remove');

		newDeleteButton.on("click", function() { deleteTodo(todo); });

		todoListDiv.append(newElement);
		newElement.append(newDeleteButtonWrapper);
		newDeleteButtonWrapper.append(newDeleteButton);
	}
}

// let initList = function() {
// 	let savedList = window.localStorage.getItem("todos");
// 	if (savedList != null)
// 		todoList = JSON.parse(savedList);
// 	else
	
// 	//code creating a default list with 2 items
// 	todoList.push(
// 		{
// 			title: "Learn JS",
// 			description: "Create a demo application for my TODO's",
// 			place: "445",
// 			dueDate: new Date(2019,10,16)
// 		},
// 		{
// 			title: "Lecture test",
// 			description: "Quick test from the first three lectures",
// 			place: "F6",
// 			dueDate: new Date(2019,10,17)
// 		}
// 	);

// 	setTimeout(() => {
// 		updateTodoList(); //fix: update todo list to remove ~1s delay between init and view display
// 	}, 0)
// }

let deleteTodo = function(index) {
	todoList.splice(index, 1);

	updateJSONbin();
	updateTodoList(); //fix: update todo list to remove ~1s delay between delete and view display
}

let validateTodo = function(todo) {
	let error = '';

	if (!todo.title)
		error = 'Title is required!';
	else if (!todo.description)
		error = 'Description is required!';
	else if (!todo.place)
		error = 'Place is required!';
	else if (!todo.dueDate)
		error = 'Date is required!';
	else if (!(todo.dueDate instanceof Date && !isNaN(todo.dueDate)))
		error = 'Date is invalid!';

	if (error !== '')
		showAlert('error', error);

	return error === ''
}

let addTodo = function() {
	//get the elements in the form
	let inputTitle = $("#inputTitle");
	let inputDescription = $("#inputDescription");
	let inputPlace = $("#inputPlace");
	let inputDate = $("#inputDate");
	//get the values from the form
	let newTitle = inputTitle.val();
	let newDescription = inputDescription.val();
	let newPlace = inputPlace.val();
	let newDate = new Date(inputDate.val());
	//create new item
	let newTodo = {
		title: newTitle,
		description: newDescription,
		place: newPlace,
		dueDate: newDate
	};
	
	if (validateTodo(newTodo))
	{
		//add item to the list
		todoList.push(newTodo);
		//window.localStorage.setItem("todos", JSON.stringify(todoList));

		updateJSONbin();
		updateTodoList(); //fix: update todo list to remove ~1s delay between add and view display
	}
}

let showAlert = function(alertType, msg) {
	let alert = $(`#alert-${alertType}`);
	alert.html(msg)
	alert.removeClass('hidden');

	setTimeout(() => {
		alert.addClass('hidden');
	}, 2000)
}

let readJSONbin = function() {
	$.ajax({
		url: backendUrl + '/latest',
		type: 'GET',
		headers: {
			'secret-key': backendKey
		},
		success: (data) => {
			console.log(data);
			todoList = data;
			updateTodoList();
		},
		error: (err) => {
			showAlert('error', 'Could not read data!');
			console.log(err.responseJSON);
		}
	});
}

let updateJSONbin = function() {
	$.ajax({
		url: backendUrl,
		type: 'PUT',
		headers: {
			'secret-key': backendKey
		},
		contentType: 'application/json',
		data: JSON.stringify(todoList),
		success: (data) => {
			showAlert('success', 'Data has been saved to JSON bin.');
			console.log(data);
		},
		error: (err) => {
			showAlert('error', 'Could not save data!');
			console.log(err.responseJSON);
		}
	});
}

//initList();
readJSONbin();
setInterval(updateTodoList, 1000);