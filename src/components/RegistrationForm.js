import { useState, useEffect } from 'react';
// import Styles from "../common/Styles";
import Styles from "../../src/common/Styles";
import { validateEmail } from "../common/helper"
import '../index.css';


const RegistrationForm = () => {

	const [users, setUsers] = useState([]);
	const [editFormState, setEditFormState] = useState(false)
	const [registerFormState, setRegisterFormState] = useState(false)
	const [name, setName] = useState("");
	const [nameError, SetNameError] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [country, setCountry] = useState("");
	const [gender, setGender] = useState("");
	const [hobbies, setHobbies] = useState([]);
	const [hobbiesError, setHobbiesError] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);


	const onRegisterButtonClick = () => {
		if (name.length < 5) {
			SetNameError("Please input name at least of 5 character!!")
			return;
		} else {
			SetNameError("")
		}
		if (!validateEmail(email)) {
			setEmailError("Please input valid Email")
			return;
		} else {
			setEmailError("")
		}

		if (password.length < 6) {
			setPasswordError("Please input password at least of 5 character!!")
			return;
		} else {
			setPasswordError("")
		}

		if (password !== confirmPassword) {
			setConfirmPasswordError("Password does not match");
			return;
		} else {
			setConfirmPasswordError("");
		}

		if (hobbies.length === 0) {
			setHobbiesError("Please Select a hobby");
			return;
		} else {
			setHobbiesError("");
		}
		let hobbyString = hobbies.join(',');
		let reqBody = {
			name: name,
			email: email,
			gender: gender,
			country: country,
			password: password,
			hobbies: hobbyString
		};
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		};

		// fetch("https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users", requestOptions).then(res => {
		// 	getUsers();
		// 	setRegisterFormState(false);
		// }
		// );
	}

	const genderRadioSelected = (e) => {
		console.log("Here is the event", e)
		setGender(e.target.value)
	}

	const handleOnChange = (e) => {
		let tempHobbies = hobbies;
		if (e.target.checked) {
			tempHobbies.push(e.target.value);
		} else {
			tempHobbies = hobbies.filter(item => item !== e.target.value)
		}
		setHobbies(tempHobbies)
	}
	const { registerFormInputStyle, registerButton, registerFormContainer } = Styles;
	return (
		<div className='editFormContainer'>
			<div className='editFormContent'>
				<div className='form-title'>
					<h1
					>
						Register Here</h1>
				</div>
				<div className='editFormInput'>
					<input onChange={e => setName(e.target.value)}
						style={registerFormInputStyle}
						placeholder="name" />
					{!!nameError && <div style={{ color: 'red' }}>{nameError}</div>}			<input
						onChange={e => setEmail(e.target.value)}
						style={registerFormInputStyle}
						placeholder="email"
					/>
					{!!emailError && <div style={{ color: 'red' }}>{emailError}</div>}
					<input
						onChange={e => setPassword(e.target.value)}
						style={registerFormInputStyle}
						placeholder="password"
						type="password"
					/>
					{!!passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
					<input
						onChange={e => setConfirmPassword(e.target.value)}
						style={registerFormInputStyle}
						placeholder="Confirm password"
						type="password"
					/>
					{!!confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
				</div>
				<div className='editFormDown'>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Gender: </label>
						<div onChange={(e) => genderRadioSelected(e)} style={{ margin: 10 }}>
							<input type="radio" value="MALE" name="gender" /> Male
							<input type="radio" value="FEMALE" name="gender" /> Female
						</div>
					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Country! </label>
						<select onChange={e => setCountry(e.target.value)}>
							<option value="India">India</option>
							<option value="United State">United State</option>
							<option value="Norway">Norway</option>
						</select>

					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Hobby :</label>
						<div>
							<input
								type="checkbox"
								id="Reading"
								name="Reading"
								value="Reading"
								onChange={(e) => handleOnChange(e)}
							/>
							Reading
						</div>
						<div>
							<input
								type="checkbox"
								id="Writing"
								name="Writing"
								value="Writing"
								onChange={(e) => handleOnChange(e)}
							/>
							Writing
						</div>
						<div>
							<input
								type="checkbox"
								id="Traveling"
								name="Traveling"
								value="Traveling"
								onChange={(e) => handleOnChange(e)}
							/>
							Traveling
						</div>
					</div>
					{!!hobbiesError && <div style={{ color: 'red' }}>{hobbiesError}</div>}
				</div>
				<button className='form-btn'
					onClick={() => onRegisterButtonClick()}>
					Register
				</button>
			</div>
		</div>
	)
}
export default RegistrationForm;

