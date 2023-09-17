import React from 'react';
import Form from './Components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './Components/Details';

const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Form />} />
					<Route path="/details" element={<Details />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
