/* File: script.js */
/* Author: James Holland */

class Restaurant {
	constructor(restaurantTitle, foodType, atmosphere, containsDriveThru, address) {
		this.restaurantTitle   = restaurantTitle;
		this.foodType          = foodType;
		this.atmosphere        = atmosphere; // this entails the 'vibe' of the restaurant.
		this.containsDriveThru = containsDriveThru;
		this.address 		   = address;
	}
};

async function ParseCSV(path, arr) {
	const response = await fetch(path);
	if (!response.ok) throw new Error("http error");
	
	// read entire csv into entireDocument
	let entireDocument = await response.text();
	
	// parse entireDocument into an array of lines of text
	const lines = entireDocument.split(/\r?\n/).filter(line => line.trim() !== "");
	
	// iterate through list of lines and tokenize each word
	for (let lineIndex = 1; lineIndex < lines.length; ++lineIndex) {
		let cleanLine	  = lines[lineIndex].replaceAll('"', ''); // removing quotes
		const tokens      = cleanLine.split(",");		  		  // tokenizing using commmas
		
		let name 	      = tokens[0];
		let genre 	      = tokens[1];
		let atmosphere    = tokens[2];
		let driveThru     = tokens[3];
		let address       = tokens[4];
		
		let newRestaurant = new Restaurant(name, genre, atmosphere, driveThru, address);
		
		arr.push(newRestaurant);
	}
	
	if (arr.length > 0) {
		document.getElementById("restaurants").innerText = arr[0].restaurantTitle;
	}
}

const restaurants = [];
const path = '../data/restaurants.csv';
ParseCSV(path, restaurants);