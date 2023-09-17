import React, { useEffect, useState } from 'react';
import './Form.css';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Form = () => {
	
const [countries, setCountries] = useState([]);

	 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/registerRoute/location');
        const responseData = await response.json();
        setCountries(responseData); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); 

	

	const navigate = useNavigate();
   const [country,setCountry]=useState("")
   const [state,setState]=useState("")
   const [city,setCity]=useState("")
   const[states,setStates]=useState([])
   const [cities,setCities]=useState([])

   const changeCountry=(e)=>{
const selectedCountry = e.target.value;
  setCountry(selectedCountry);
	setStates(countries.find(place=>place.name===e.target.value).states)
	setFormData({
      ...formData,
      country: e.target.value,
    });
}

const changeState=(e)=>{
	setState(e.target.value);
	setCities(states.find(state=>state.name===e.target.value).cities)
	setFormData({
      ...formData,
      state: e.target.value,
    });
}

const changeCity=(e)=>{
	setCity(e.target.value);
	setFormData({
      ...formData,
      city: e.target.value,
    });
}

	

	const [ formData, setFormData ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		state: '',
		city: '',
		age: '',
		dateofBirth: '',
		gender: ''
	});
	const [ errorFields, setErrorFields ] = useState([]);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.matches(/^[a-zA-Z .]+$/, 'First Name can only contain alphabets')
			.required('First Name is required'),
		lastName: Yup.string()
			.matches(/^[a-zA-Z .]+$/, 'Last Name can only contain alphabets')
			.required('Last Name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		country: Yup.string().required('Country is required'),
		state: Yup.string().required('State is required'),
		city: Yup.string().required('City is required'),
		dateofBirth: Yup.date()
			.max(new Date(), 'Date of Birth cannot be in the future')
			.required('Date of Birth is required'),
		age: Yup.number()
			.test('age', 'Age must be greater than 14', (value) => {
				const today = new Date();
				const birthDate = new Date(formData.dateofBirth);
				const age = today.getFullYear() - birthDate.getFullYear();
				return age > 14;
			})
			.required('Age is required'),
		gender: Yup.string().required('Gender is required')
	});

	const handleShowDetails = () => {
		navigate('/details');
	};

	useEffect(
		() => {
			if (formData.dateofBirth) {
				const today = new Date();
				const birthDate = new Date(formData.dateofBirth);
				let age = today.getFullYear() - birthDate.getFullYear();
				const monthDiff = today.getMonth() - birthDate.getMonth();

				if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
					age--;
				}

				setFormData({ ...formData, age: age });
			}
		},
		[ formData.dateofBirth ]
	);

	const handleChange = (e) => {
		const { id, value } = e.target;

		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await validationSchema.validate(formData, { abortEarly: false });

			fetch('http://localhost:3000/registerRoute/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Data sent successfully:', data);
					setFormData({
						firstName: '',
						lastName: '',
						email: '',
						country: '',
						state: '',
						city: '',
						age: '',
						dateofBirth: '',
						gender: ''
					});
				})
				.catch((error) => {
					console.log('Error sending data:', error);
				});
		} catch (validationErrors) {
			const errors = {};
			validationErrors.inner.forEach((error) => {
				errors[error.path] = error.message;
			});
			setErrorFields(errors);
		}
	};

	return (
		<div className="register">
			<form className="registerform" onSubmit={handleSubmit}>
				<h1 style={{ textAlign: 'center' }}>Register Here..</h1>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							placeholder="Firstname"
							value={formData.firstName}
							onChange={handleChange}
						/>
						{errorFields.firstName && <span className="error-message">{errorFields.firstName}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							placeholder="Lastname"
							value={formData.lastName}
							onChange={handleChange}
						/>
						{errorFields.lastName && <span className="error-message">{errorFields.lastName}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							style={{ width: '370px' }}
							value={formData.email}
							onChange={handleChange}
						/>
						{errorFields.email && <span className="error-message">{errorFields.email}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="country">Country</label>
						<select
							id="country"
							value={country}
							style={{ width: '125px' }}
							onChange={changeCountry}
						>
							<option value="">Select Country</option>
							{countries.map((place,index)=>(

							<option key={index} value={place.name}>{place.name}</option>
							))}
						</select>
						{errorFields.country && <span className="error-message">{errorFields.country}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="state">State</label>
						<select id="state" value={state} style={{ width: '121px' }} onChange={changeState}>
							<option value="">Select State</option>
							{states.map((state,index)=>(

							<option key={index} value={state.name}>{state.name}</option>
							))}
						</select>
						{errorFields.state && <span className="error-message">{errorFields.state}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="city">City</label>
						<select id="city" value={city} style={{ width: '121px' }} onChange={changeCity}>
							<option value="">Select City</option>
							{cities.map((city,index)=>(

							<option key={index} value={city}>{city}</option>
							))}
						</select>
						{errorFields.city && <span className="error-message">{errorFields.city}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="dateofBirth">Date of Birth</label>
						<input
							type="date"
							id="dateofBirth"
							placeholder="Date of Birth"
							style={{ width: '170px' }}
							value={formData.dateofBirth}
							onChange={handleChange}
						/>
						{errorFields.dateofBirth && <span className="error-message">{errorFields.dateofBirth}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="age">Age</label>

						<input
							type="number"
							id="age"
							placeholder="Age"
							style={{ width: '170px' }}
							value={formData.age}
							readOnly
						/>
						{errorFields.age && <span className="error-message">{errorFields.age}</span>}
					</div>
				</div>

				<div className="form-row gender-row">
					<div className="form-group">
						<label>Gender</label>
						<div className="radio-options">
							<input
								type="radio"
								id="male"
								value="Male"
								checked={formData.gender === 'Male'}
								onChange={() => setFormData({ ...formData, gender: 'Male' })}
							/>
							{errorFields.gender && <span className="error-message">{errorFields.gender}</span>}

							<label htmlFor="male">Male</label>

							<input
								type="radio"
								id="female"
								value="Female"
								checked={formData.gender === 'Female'}
								onChange={() => setFormData({ ...formData, gender: 'Female' })}
							/>
							<label htmlFor="female">Female</label>

							<input
								type="radio"
								id="other"
								value="Other"
								checked={formData.gender === 'Other'}
								onChange={() => setFormData({ ...formData, gender: 'Other' })}
							/>
							<label htmlFor="other">Other</label>
						</div>
					</div>
				</div>

				<button type="submit" className="submitbtn">
					{' '}
					Submit
				</button>
				<button className="submitbtn" onClick={handleShowDetails}>
					{' '}
					Show Details
				</button>
			</form>
		</div>
	);
};

export default Form;
