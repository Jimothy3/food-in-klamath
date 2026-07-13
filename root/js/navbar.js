/* File: navbar.js */
/* Author: James Holland */

// Class Name: NavBar
// Parameters: None
// Reason    : All HTML pages share the same navigation bar, this allows for reusability
class NavBar extends HTMLElement {
	connectedCallback() {
		this.innerHTML = 
		`
			<aside>
				<nav>
					<ul>
						<li>
							<a href="https://FoodInKlamath.com">
								<button class="logo">
									<img src="images/burger_icon_large.png"/>
								</button>
							</a>
						</li>
						<li>
							<a href="index.html">
								<i class="bx bx-home"></i>
								<span>Home</span>
							</a>
						</li>
						<li>
							<a href="contact.html">
								<i class="bx bx-phone"></i>
								<span>Contact Us</span>
							</a>
						</li>
						<li>
							<a href="help.html">
								<i class="bx bx-info-circle"></i>
								<span>Help</span>
							</a>
						</li>
						<li>
							<a href="report-error.html">
								<i class="bx bx-bug"></i>
								<span>Report Inaccuracy</span>
							</a>
						</li>
						<li>
							<a href="sponsor.html">
								<i class="bx bx-dollar"></i>
								<span>Sponsor Us</span>
							</a>
						</li>
						<li>
							<a href="#" data-toggle="navbar">
								<i class="bx bx-menu"></i>
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		`;
		
		// Find the menu button inside this component
		const toggleBtn = this.querySelector('[data-toggle="navbar"]');
		
		// When clicked, toggle the 'expanded' class on the <nav-bar> itself
		toggleBtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.classList.toggle('expanded');
		});
	}
}

customElements.define('nav-bar', NavBar);