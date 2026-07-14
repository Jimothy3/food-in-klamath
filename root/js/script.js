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
	constructor(restaurantTitle, foodType, atmosphere, containsDriveThru, address, openHour, closeHour, daysClosed) {
		this.restaurantTitle   = restaurantTitle;
		this.foodType          = foodType;
		this.atmosphere        = atmosphere;
		this.containsDriveThru = containsDriveThru;
		this.address 		   = address;
		this.openHour		   = openHour;
		this.closeHour		   = closeHour;
		this.daysClosed		   = daysClosed;
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
	// Index starts at 1 to ignore header line
	for (let lineIndex = 1; lineIndex < linesOfTextArr.length; ++lineIndex) {
		const cleanLine	 = linesOfTextArr[lineIndex].replaceAll('"', ''); // removing quotes
		const tokens     = cleanLine.split(",");		  		  		  // tokenizing using commmas
		
		const name 	     = tokens[0];
		const genre 	 = tokens[1];
		const atmosphere = tokens[2];
		const driveThru  = tokens[3] === 'TRUE'; // turns the string into a boolean
		const address    = tokens[4];
		const openHour   = tokens[5];
		const closeHour  = tokens[6];
		const daysClosed = tokens[7];
			
		const newRestaurant = new Restaurant(name, genre, atmosphere, driveThru, address, openHour, closeHour, daysClosed);
			
		restaurantArr.push(newRestaurant);
	}
	return restaurantArr;
}

// Function Name: instantiateMap 
// Parameters   : None
// Reason       : A map is crucial for logic such as a zoom when a restaurant is suggested
function instantiateMap() {
	const KLAMATH_LATITUDE  = 42.224869;
	const KLAMATH_LONGITUDE = -121.78167;
	
	var southWest  = L.latLng(42.1490493, -121.8596316),
	    northEast  = L.latLng(42.3167969, -121.5638341),
	    myBounds   = L.latLngBounds(southWest, northEast);
	
	var map = L.map('map', {
		maxBounds: myBounds,
		maxBoundsViscosity: 1.0
	}).setView([KLAMATH_LATITUDE, KLAMATH_LONGITUDE], 13);
	
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 20,
		minZoom: 12,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
}

// Function Name: randomButtonLogic
// Parameters   : None
// Reason       : Logic for the 'take me to a random restaurant' button
function randomButtonLogic() {
	const restaurantSubArr = restaurantListThatMatchesFilters();
	
	if (restaurantSubArr.length === 0)
		document.getElementById("address").innerText = "The filters you selected didn't fit any stores in the area.";
	else {
		const randIndex = Math.floor(Math.random() * restaurantSubArr.length);
		const title = restaurantSubArr[randIndex].restaurantTitle;
		const address = restaurantSubArr[randIndex].address + ', Klamath Falls, OR'; // address Klamath Falls, OR
		const encodedAddress = encodeURIComponent(address);					   // encoding address into readable URL for Google Maps
		const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodedAddress;
		document.getElementById("restaurant").innerText = title;
		document.getElementById("address").innerText = address;
		document.getElementById("address").href = mapUrl;
	}
}

// Function Name: restaurantIsOpen
// Parameters   : Selected restaurant in array (store: Restaurant)
// Reason       : The bare minimum check is to ensure the restaurant suggested is open currently
function restaurantIsOpen(store) {
	let isOpen = true;
	const d = new Date();
	
	var klamathFallsTime = new Intl.DateTimeFormat("en-US", {
		dateStyle: "short",
		timeStyle: "short",
		timeZone: "America/Los_Angeles"
	}).format(d);
	
	
	
	return isOpen;
}

function timeIsWithinWindow(currentTime, startTime, endTime) {
	
}

function restaurantMatchesFilters(store) {
	const containerDiv = document.getElementById("checkboxes");
	const checkboxes = containerDiv.querySelectorAll('input[type="checkbox"]');
	for (let i = 0; i < checkboxes.length; ++i) {
		if (!checkboxes[i].checked)
			continue; 
		
		var filterInGenre = false;
		var filterInAtmosphere = false;
		if (store.foodType.includes(checkboxes[i].value))
			filterInGenre = true;
		else if (store.atmosphere.includes(checkboxes[i].value))
			filterInAtmosphere = true;
		
		if (!filterInGenre && !filterInAtmosphere)
			return false;
	}
	return true;
}

function restaurantListThatMatchesFilters() {
	var subArr = [];
	for (let i = 0; i < restaurants.length; ++i) {
		if (restaurantMatchesFilters(restaurants[i]))
			subArr.push(restaurants[i]);
	}
	return subArr;
}

/* MAIN */
let restaurants = [];
instantiateMap();

const randButton = document.getElementById("randomButton");
randButton.addEventListener("click", randomButtonLogic);
restaurantIsOpen("bob");
try {
	const response    = await initFetch(CONFIG.path);		 // async func to ensure path was correctly fetched
	const linesOfText = await parseCSV(response); 		     // chunks the entire text into an array of lines of text
	restaurants = instantiateRestaurants(linesOfText); // returns array of all restaurants
} catch (err) {
	document.getElementById("restaurant").innerText = "There was an error processing the data of the restaurants... Sorry!";
}

/* !MAIN */
