'use strict';

const inputForm = document.getElementsByTagName('input');
const cancelButton = document.getElementById('cancel');
const submitButton = document.getElementById('submit');
const checkboxForm =  document.querySelector('div.form-checkbox');

class Person{
	constructor(firstName, lastName, age, email, gender) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.email = email;
		this.gender = gender;
	}
}

//validation form

function validEmail() {
	const regexpEmail = /^\w+\.?\w+@[a-z]{3,8}(\.[a-z]{2,5})$/iu;
	return regexpEmail.test(inputForm.email.value)
}

function checkPassword(inputPassword) {
	const regexpPassword = /^\w{8,15}$/igu;
	return regexpPassword.test(inputPassword.value);
}


function validForm() {
	const formInputs = document.querySelectorAll('input');
	const inputEmail = document.querySelector('input[name="email"]');
	const gender = document.querySelector('input[name="gender"]:checked');
	const inputPassword = document.querySelector('input[name="password"]');
	const inputPasswordConfirm = document.querySelector('input[name="confirm password"]');
	const emptyInputs = Array.from(inputForm).filter(input => input.name !== 'gender').filter(input => input.value === '');
	//выделение полей
	formInputs.forEach(input => {
		if (input.value === ''){
			input.classList.remove('input-valid');
			input.classList.add('input-error');
		} else {
			input.classList.remove('input-error');
			input.classList.add('input-valid');
		}
	}
	)
	//проверка на радиокнопки
	if (!gender) {
		checkboxForm.classList.remove('input-valid');
		checkboxForm.classList.add('input-error')
		return false;
	} else {
		checkboxForm.classList.remove('input-error');
		checkboxForm.classList.add('input-valid')
	}
	
	//проверка на радиокнопки
	if (emptyInputs.length !==0) {
		return false;
	}
	//валидация email
	if (!validEmail()) {
		inputEmail.classList.remove('input-valid');
		inputEmail.classList.add('input-error')
		return false;
	} else {
		inputEmail.classList.remove('input-error');
		inputEmail.classList.add('input-valid');
	}
	//валидация пароля
	if (!checkPassword(inputPassword, inputPasswordConfirm)) {
		inputPassword.classList.remove('input-valid');
		inputPassword.classList.add('input-error')
		return false;
	} else {
		inputPassword.classList.remove('input-error');
		inputPassword.classList.add('input-valid');
	}
	//проверка на совпадение паролей
	if (inputPassword.value !== inputPasswordConfirm.value) {
		inputPasswordConfirm.classList.remove('input-valid');
		inputPasswordConfirm.classList.add('input-error')
		return false;
	} else {
		inputPasswordConfirm.classList.remove('input-error');
		inputPasswordConfirm.classList.add('input-valid');
	}

	return true;
}


//submitButton
function collectProps (event) {
	const firstName = inputForm.firstName.value;
	const lastName = inputForm.lastName.value;
	const age = inputForm.age.value;
	const email = inputForm.email.value;
	const gender = document.querySelector('input[name="gender"]:checked');
	
	event.preventDefault();
	
	if (validForm()){
		const accountUser = new Person(firstName, lastName, age, email, gender.value);
		localStorage.setItem(lastName, JSON.stringify(accountUser));
	}
}

submitButton.addEventListener('click', collectProps);

//cancelButton
function clearFofm (event) {
	const form = document.getElementById('form');
	const formInputs = document.querySelectorAll('input');
	
	event.preventDefault();
	
	form.reset()
	
	checkboxForm.classList.remove('input-valid')
	checkboxForm.classList.remove('input-error')

	formInputs.forEach(input => {
		input.classList.remove('input-error');
		input.classList.remove('input-valid');
	});
}

cancelButton.addEventListener('click', clearFofm);


