"use strict"

let todoList = []; //declares a new array for Your todo list

let backendUrl = 'https://api.jsonbin.io/b/6165c9339548541c29c22c3f'
let backendKey = '$2b$10$8PQguuYP4XNUV14Y3m6uEePfQQNQor.RZL2iaUwXwCqrQeC53113i' // don't hack me :))))

let formatDate = function(value) {
	let date = new Date(value);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (month < 10) {
		month = '0' + month;
	}
		
	if (day < 10) {
		day = '0' + day;
	}

	return [day, month, year].join('.');
}

let isInFilterSearch = function(todo) {
	let filterInputValue = $("#inputSearch").val();
	let filterStartDate = $("#startDate").val();
	let filterEndDate = $("#endDate").val();

	let ret = filterInputValue == "" ||
			  todo.title.includes(filterInputValue) ||
			  todo.description.includes(filterInputValue);

	if (filterStartDate && filterEndDate) {
		let from = Date.parse(filterStartDate);
		let to = Date.parse(filterEndDate);
		let date = Date.parse(todo.dueDate);

		ret = ret && ((date <= to && date >= from))
	}

	return ret;
}

let updateTodoList = function() {
	let todoListDiv = $("#todoListView");

	//remove all elements
	todoListDiv.empty();

	//add all elements
	for (let todo in todoList) {
		
		let todoObj = todoList[todo]

		// Skip empty object (JSON bit cannot be empty, so we use empty object as placeholder) 
		if ($.isEmptyObject(todoObj)) {
			continue
		}

		// Check if in filter
		if (!isInFilterSearch(todoObj)) {
			continue
		}

		let newElement = $("<tr />");

		// Add elements as table objects
		newElement.append($("<td />").html(todoObj.title));
		newElement.append($("<td />").html(todoObj.description));
		newElement.append($("<td />").html(todoObj.place));
		newElement.append($("<td />").html(formatDate(todoObj.dueDate)));

		let newDeleteButtonWrapper = $("<td />").addClass('center');
		let newDeleteButton = $("<input />").attr('type', 'button').val('Remove');

		newDeleteButton.on('click', () => {
			deleteTodo(todo);
		});

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
		newTodo.dueDate = newTodo.dueDate.toISOString();
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