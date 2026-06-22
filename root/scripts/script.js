/* File: script.js */
/* Author: James Holland */
/* Note: index.html references this file with type="module". */
const CONFIG = {
	path: '../data/restaurants.csv' // csv located in data folder
}

// Class Name   : Restaurant 
// Parameters   : restaurantTitle (str), foodType (str), atmosphere (str), containsDriveThru (bool), address (str)
// Reason       : simplifies array-creation process in which the array stores Restaurant objects
class Restaurant {
	constructor(restaurantTitle, foodType, atmosphere, containsDriveThru, address) {
		this.restaurantTitle   = restaurantTitle;
		this.foodType          = foodType;
		this.atmosphere        = atmosphere;
		this.containsDriveThru = containsDriveThru;
		this.address 		   = address;
	}
}

// Function Name: initFetch 
// Parameters   : string correlating to path of .csv
// Reason       : allows for proper error-handling for fetch() function
async function initFetch(path) {
	const result = await fetch(path);
	if (!result.ok) throw new Error("Error: path not fetched");
	else return result;
}

// Function Name: parseCSV 
// Parameters   : Object returned from initFetch(path) that contains the entire .csv
// Reason       : Turns the string block into segmented array of lines, tokenized by end of line
async function parseCSV(response) {
	// read entire csv into entireDocument
	const entireDocument = await response.text();
	
	// parse entireDocument into an array of lines of text
	const lines = entireDocument.split(/\r?\n/).filter(line => line.trim() !== "");
	
	return lines;
}

// Function Name: instantiateRestaurants 
// Parameters   : Array of lines of text from the .csv
// Reason       : Tokenizes each line of text into 5 segments. Creates Restaurant object and appends to the array
function instantiateRestaurants(linesOfTextArr) {
	const restaurantArr = [];
	
	// iterate through list of lines and tokenize each word
	/* Index starts at 1 to ignore header line */
	for (let lineIndex = 1; lineIndex < linesOfTextArr.length; ++lineIndex) {
		const cleanLine	 = linesOfTextArr[lineIndex].replaceAll('"', ''); // removing quotes
		const tokens     = cleanLine.split(",");		  		  		  // tokenizing using commmas
		
		const name 	     = tokens[0];
		const genre 	 = tokens[1];
		const atmosphere = tokens[2];
		const driveThru  = tokens[3] === 'true'; // turns the string into a boolean
		const address    = tokens[4];
		
		const newRestaurant = new Restaurant(name, genre, atmosphere, driveThru, address);
		
		restaurantArr.push(newRestaurant);
	}
	return restaurantArr;
}

/* MAIN */
try {
	const response    = await initFetch(CONFIG.path);		 // async func to ensure path was correctly fetched
	const linesOfText = await parseCSV(response); 		     // chunks the entire text into an array of lines of text
	const restaurants = instantiateRestaurants(linesOfText); // returns array of all restaurants

	if (restaurants.length > 0) {
			document.getElementById("restaurants").innerText = restaurants[0].restaurantTitle;
	}
	
} catch (err) {
	document.getElementById("restaurants").innerText = "There was an error processing the data of the restaurants... Sorry!";
}
/* !MAIN */
