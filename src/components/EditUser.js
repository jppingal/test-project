import { useState, useEffect } from 'react';
import Styles from "../../src/common/Styles";
import { validateEmail } from "../../src/common/helper"
import '../index.css';

const EditUser = ({ itemEdit }) => {

	// const [users, setUsers] = useState([]);
	const [editFormState, setEditFormState] = useState(false)
	const [name, setName] = useState("");
	const [nameError, SetNameError] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [country, setCountry] = useState("");
	const [gender, setGender] = useState("");
	const [hobbies, setHobbies] = useState([]);
	const [hobbiesError, setHobbiesError] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);
	const [checked, setChecked] = useState(false);

	// const getUsers = () => {
	// 	fetch("https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users").then(res => res.json()).then(res => setUsers(res));
	// }

	// useEffect(() => {
	// 	getUsers();
	// }, []);

	const onClickEditButton = (item) => {
		setEditFormState(true)
		setItemToEdit(item);
	}

	const onClickUpdateButton = () => {
		setEditFormState(true)
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

		// fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${itemToEdit.id}`, requestOptions).then(res => {
		// 	getUsers();
		// 	setEditFormState(false);
		// }
		// );
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
	const { registerFormInputStyle, registerButton, registerFormContainer } = Styles;
	return (
		<div className='editFormContainer'>
			<div className='editFormContent'>
				<div className='form-title'>
					<h1>Update User Here</h1>
				</div>

				<div className='editFormInput'>
					<input onChange={e => setName(e.target.value)}
						style={registerFormInputStyle} placeholder={itemEdit.name}
						defaultValue={itemEdit.name} />
					{!!nameError && <div style={{ color: 'red' }}>{nameError}</div>}
					<input
						onChange={e => setEmail(e.target.value)}
						style={registerFormInputStyle}
						placeholder={itemEdit.email}
						defaultValue={itemEdit.email}
					/>
					{!!emailError && <div style={{ color: 'red' }}>{emailError}</div>}
				</div>
				<div className='editFormDown'>
					<div >
						<label>Select Your Gender: </label>
						<div onChange={(e) => genderRadioSelectedEdit(e)} style={{ margin: 10 }}>
							{itemEdit.gender === "MALE" ? <input type="radio" checked value="MALE" name="gender" /> : <input type="radio" value="MALE" name="gender" />} Male

							{itemEdit.gender === "FEMALE" ? <input type="radio" checked value="FEMALE" name="gender" /> : <input type="radio" value="FEMALE" name="gender" />} Female
						</div>
					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Country! </label>
						<select defaultValue={itemEdit.country} onChange={e => setCountry(e.target.value)}>

							{!!itemEdit.country === "India" ? <option selected value="India">India</option> : <option value="India">India</option>}
							{!!itemEdit.country === "United State" ? <option selected value="United State">United State</option> : <option value="United State">United State</option>}
							{/* <option value="United State">United State</option> */}
							{!!itemEdit.country === "Norway" ? <option selected value="Norway">Norway</option> : <option value="Norway">Norway</option>}
						</select>

					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Hobby :</label>
						<div>
							{/* <input defaultValue={itemEdit.hobbies} /> */}
							<input
								type="checkbox"
								id="Reading"
								name="Reading"
								value="Reading"
								onChange={(e) => handleOnChangeEdit(e)}
								// defaultChecked={!!itemToEdit.hobbies === "Reading" || !!itemToEdit.hobbies === itemToEdit.hobbies.id ? false : true}
								defaultChecked={!!itemEdit.hobbies !== "Reading" ? false : true}
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
								checked={!!itemEdit.hobbies === "Writing" ? false : true}

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
								defaultChecked={!!itemEdit.hobbies === "Traveling" ? false : true}
							/>
							Traveling
						</div>
					</div>
					{!!hobbiesError && <div style={{ color: 'red' }}>{hobbiesError}</div>}
				</div>
				<button className='form-btn'
					onClick={() => onClickUpdateButton()}>Update</button>
			</div>
		</div>
	);
}
export default EditUser;