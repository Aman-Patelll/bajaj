import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css"; // Add this for styling

const options = [
	{ value: "numbers", label: "Numbers" },
	{ value: "alphabets", label: "Alphabets" },
	{ value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
];

function App() {
	const [jsonInput, setJsonInput] = useState("");
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [responseData, setResponseData] = useState(null);

	const handleSubmit = async () => {
		try {
			const payload = JSON.parse(jsonInput); // Validate JSON
			const response = await axios.post("https://bajaj-backend-ruddy.vercel.app/bfhl", payload); // API call
			setResponseData(response.data);
		} catch (err) {
			alert("Invalid JSON format! Please check and try again.");
		}
	};

	const renderResponse = () => {
		if (!responseData) return null;

		const filteredResponse = selectedOptions.map((option) => ({
			label: option.label,
			value: responseData[option.value],
		}));

		return (
			<div style={{ marginTop: "20px" }}>
				<h3>Filtered Response</h3>
				{filteredResponse.map((item) => (
					<p key={item.label}>
						<strong>{item.label}:</strong>{" "}
						{item.value ? item.value.join(", ") : "None"}
					</p>
				))}
			</div>
		);
	};

	return (
		<div style={{ margin: "20px" }}>
			<h1>BFHL Challenge</h1>

			{/* JSON Input Box */}
			<label
				htmlFor="json-input"
				style={{ display: "block", marginBottom: "5px" }}
			>
				API Input
			</label>
			<input
				id="json-input"
				type="text"
				value={jsonInput}
				onChange={(e) => setJsonInput(e.target.value)}
				placeholder='{"data":["M", "1", "334", "4", "B"]}'
				style={{
					width: "100%",
					padding: "10px",
					fontSize: "16px",
					marginBottom: "10px",
					border: "1px solid #ccc",
					borderRadius: "4px",
				}}
			/>

			{/* Submit Button */}
			<button
				onClick={handleSubmit}
				style={{
					backgroundColor: "#007bff",
					color: "#fff",
					padding: "10px 20px",
					fontSize: "16px",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Submit
			</button>

			{/* Multi Filter Dropdown */}
			<div style={{ marginTop: "20px" }}>
				<label
					htmlFor="multi-filter"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Multi Filter
				</label>
				<Select
					id="multi-filter"
					isMulti
					options={options}
					onChange={setSelectedOptions}
					styles={{
						control: (base) => ({
							...base,
							border: "1px solid #ccc",
							borderRadius: "4px",
						}),
					}}
				/>
			</div>

			{/* Render Filtered Response */}
			{renderResponse()}
		</div>
	);
}

export default App;
