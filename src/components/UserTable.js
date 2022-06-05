import Styles from "../common/Styles";
import '../index.css';


const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Email-Id</th>
				<th>Gender</th>
				<th>hobbies</th>
				<th>Country</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>
		</thead>
	);
}

const renderTableBody = ({ users, onClickEditButton, onClickDeleteButton }) => {
	return users.map(item => {
		return (
			<tr key={item.id}>
				<td>{item.id}</td>
				<td>{item.name}</td>
				<td>{item.email}</td>
				<td>{item.gender}</td>
				<td>{item.hobbies}</td>
				{/* <td>{item.hobbies.map((item) => {
					return (
						<>
							<span style={{ marginLeft: 5 }}>{item},</span>
						</>
					)
				})}</td> */}
				<td>{item.country}</td>

				<td>
					<button
						style={{ ...Styles.buttonStyle, background: 'green' }}
						onClick={() => onClickEditButton(item)}
					>
						Edit
					</button>
				</td>
				<td className="td-btn">
					<button
						style={{ ...Styles.buttonStyle, background: 'red' }}
						onClick={() => onClickDeleteButton(item)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	})
}

const UserTable = ({ users, onClickEditButton, onClickDeleteButton }) => {
	return (
		<div className='todoList-container'>
			<div className="table-data">
				{/* <h1>Users</h1> */}
				<table>
					{<TableHeader />}
					<tbody>
						{renderTableBody({ users, onClickEditButton, onClickDeleteButton })}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UserTable;