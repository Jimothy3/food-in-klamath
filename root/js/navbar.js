/* File: navbar.js */
/* Author: James Holland */

// Class Name: NavBar
// Parameters: None
// Reason    : All HTML pages share the same navigation bar, this allows for reusability
class NavBar extends HTMLElement {
	connectedCallback() {
		this.innerHTML = 
		`
		<div class="sidenav">
			<a href="https://FoodInKlamath.com">
				<button class="logo-button">
					<img src="images/burger_icon_large.png"/>
				</button>
			</a>
			<a href="index.html">Home</a>
			<a href="contact.html">Contact Us</a>
			<a href="sponsor.html">Sponsor Us</a>
			<a href="report-error.html">Wrong Info...</a>
			<a href="help.html">Help Me!</a>
		</div>
		`;
	}
}

customElements.define('nav-bar', NavBar);