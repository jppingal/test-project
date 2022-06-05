import { useState, useEffect } from 'react';
import Styles from "../src/common/Styles";
import { validateEmail } from "../src/common/helper"
import UserTable from "../src/components/UserTable";
import EditUser from './components/EditUser';
import RegistrationForm from './components/RegistrationForm';
import './index.css';
function App() {

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

	console.log("hjdhsjfhdjshfkdjfsf", itemToEdit)
	const getUsers = () => {
		fetch("https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users").then(res => res.json()).then(res => setUsers(res));
	}

	useEffect(() => {
		getUsers();
	}, []);

	const onClickEditButton = (item) => {
		setEditFormState(true)
		setItemToEdit(item);
	}

	const onClickDeleteButton = (item) => {
		fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${item.id}`, { method: 'DELETE' }).then(res => {
			getUsers();
		}
		);
	}
	//---=-=--=====-===========Edit form====== start------===--==-==-=
	const onClickUpdateButton = () => {
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
		let reqBody = {
			id: itemToEdit.id,
			name: !!name ? name : itemToEdit.name,
			email: !!email ? email : itemToEdit.email,
			gender: !!gender ? gender : itemToEdit.gender,
			country: !!country ? country : itemToEdit.country,
			hobbies: !!hobbies ? hobbies : itemToEdit.hobbies
		};
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		};

		fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${itemToEdit.id}`, requestOptions).then(res => {
			getUsers();
			setEditFormState(false);
		}
		);
	}
	const genderRadioSelectedEdit = (e) => {
		console.log("Here is the event", e)
		setGender(e.target.value)
	}
	const handleOnChangeEdit = (e) => {
		let tempHobbies = hobbies;
		if (e.target.checked) {
			tempHobbies.push(e.target.value);
		} else {
			tempHobbies = hobbies.filter(item => item !== e.target.value)
		}
		setHobbies(tempHobbies)
	}


	const renderEditForm = () => {


		const { registerFormInputStyle, registerButton, registerFormContainer } = Styles;
		return (
			<div style={registerFormContainer}>
				<h1 style={Styles.header}>Update User Here</h1>
				<input onChange={e => setName(e.target.value)} style={registerFormInputStyle} placeholder={itemToEdit.name}
					defaultValue={itemToEdit.name} />
				{!!nameError && <div style={{ color: 'red' }}>{nameError}</div>}
				<input
					onChange={e => setEmail(e.target.value)}
					style={registerFormInputStyle}
					placeholder={itemToEdit.email}
					defaultValue={itemToEdit.email}
				/>
				{!!emailError && <div style={{ color: 'red' }}>{emailError}</div>}
				<div style={{ marginTop: 10 }}>
					<label>Select Your Gender: </label>
					<div onChange={(e) => genderRadioSelectedEdit(e)} style={{ margin: 10 }}>
						{itemToEdit.gender === "MALE" ? <input type="radio" checked value="MALE" name="gender" /> : <input type="radio" value="MALE" name="gender" />} Male

						{itemToEdit.gender === "FEMALE" ? <input type="radio" checked value="FEMALE" name="gender" /> : <input type="radio" value="FEMALE" name="gender" />} Female
					</div>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Select Your Country! </label>
					<select defaultValue={itemToEdit.country} onChange={e => setCountry(e.target.value)}>

						{!!itemToEdit.country === "India" ? <option selected value="India">India</option> : <option value="India">India</option>}
						{!!itemToEdit.country === "United State" ? <option selected value="United State">United State</option> : <option value="United State">United State</option>}
						{/* <option value="United State">United State</option> */}
						{!!itemToEdit.country === "Norway" ? <option selected
							value="Norway">Norway</option> : <option value="Norway">Norway</option>}
					</select>

				</div>
				<div style={{ marginTop: 10 }}>
					<label>Select Your Hobby :</label>
					<div>
						{/* <input defaultValue={itemToEdit.hobbies} /> */}
						<input
							type="checkbox"
							id="Reading"
							name="Reading"
							value="Reading"
							onChange={(e) => handleOnChangeEdit(e)}
							// defaultChecked={!!itemToEdit.hobbies === "Reading" || !!itemToEdit.hobbies === itemToEdit.hobbies.id ? false : true}
							defaultChecked={!!itemToEdit.hobbies !== "Reading" ? true : false}
						/>
						Reading
					</div>
					<div>
						<input
							type="checkbox"
							id="Writing"
							name="Writing"
							value="Writing"
							onChange={(e) => handleOnChangeEdit(e)}
							defaultChecked={!!itemToEdit.hobbies ? false : true}

						/>
						Writing
					</div>
					<div>
						<input
							type="checkbox"
							id="Traveling"
							name="Traveling"
							value="Traveling"
							onChange={(e) => handleOnChangeEdit(e)}
							defaultChecked={itemToEdit.hobbies ? false : true}
						/>
						Traveling
					</div>
				</div>
				{!!hobbiesError && <div style={{ color: 'red' }}>{hobbiesError}</div>}
				<button style={registerButton} onClick={() => onClickUpdateButton()}>Update</button>
			</div>
		);
	}
	//---=-=--=====-===========Edit-form--===--End======------===--==-==-=-=-=-=-=-==-
	//==-===-=-=-=-=-=oRegisterForm start-=-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=----=-=-=
	const onRegisterClick = () => {
		setRegisterFormState(true);
	}
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

		fetch("https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users", requestOptions).then(res => {
			getUsers();
			setRegisterFormState(false);
		}
		);
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

	if (registerFormState) {

		const { registerFormInputStyle, registerButton, registerFormContainer } = Styles;

		return (
			// <RegistrationForm />
			<div style={registerFormContainer}>
				<h1 style={Styles.header}>Register Here</h1>
				<input onChange={e => setName(e.target.value)} style={registerFormInputStyle} placeholder="name" />
				{!!nameError && <div style={{ color: 'red' }}>{nameError}</div>}
				<input
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
				<button
					style={registerButton}
					onClick={() => onRegisterButtonClick()}>
					Register
				</button>
			</div>
		)
	}
	//==-===-=-=-=-=-=oRegisterForm start-=-End=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=----=-=-=
	return (


		<div>
			{/* style={Styles.header}style={Styles.registerButton} */}
			<header className='header-container'>
				<h1 >Users</h1>
				<button
					style={Styles.registerButton}
					onClick={() => onRegisterClick()}
				>
					Register User
				</button>
			</header>
			{editFormState ? renderEditForm() : null}
			{/* {editFormState ? <EditUser itemEdit={itemToEdit} /> : null} */}
			{/* {!editFormState ? renderUsers() : null} */}
			{!editFormState ?
				<UserTable
					users={users}
					onClickEditButton={(item) => onClickEditButton(item)}
					onClickDeleteButton={(item) => onClickDeleteButton(item)}
				/> : null}
		</div>
	);
}

export default App;


