import React, { useEffect, useState } from 'react';
import './Details.css';

const Details = () => {
	const [ data, setData ] = useState([]);
	const [ error, setError ] = useState(null);

	useEffect(() => {
		const fetchDataFromBackend = async () => {
			try {
				const response = await fetch('http://localhost:3000/registerRoute/details');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const responseData = await response.json();
				const fetchedData = responseData.data;
				console.log('Fetched data:', fetchedData);
				setData(fetchedData);
			} catch (error) {
				console.error('Error fetching data from backend:', error);
				setError('Error fetching data from backend');
			}
		};

		fetchDataFromBackend();
	}, []);

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th colSpan="9" className="table-header">
							Details
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="header-row">
						<td>First Name</td>
						<td>Last Name</td>
						<td>Email</td>
						<td>Date of Birth</td>
						<td>Age</td>
						<td>Gender</td>
						<td>Country</td>
						<td>State</td>
						<td>City</td>
					</tr>
					{Array.isArray(data) && data.length > 0 ? (
						data.map((item) => {
							const formattedDateOfBirth = new Date(item.dateofBirth).toLocaleDateString();
							return (
								<tr key={item._id}>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.email}</td>
									<td>{formattedDateOfBirth}</td>
									<td>{item.age}</td>
									<td>{item.gender}</td>
									<td>{item.country}</td>
									<td>{item.state}</td>
									<td>{item.city}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan="9" className="error-message">
								{error || 'No data available'}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Details;
