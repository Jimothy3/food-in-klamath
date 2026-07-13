/* File: navbar.js */
/* Author: James Holland */

// Class Name: NavBar
// Parameters: None
// Reason    : All HTML pages share the same navigation bar, this allows for reusability
class NavBar extends HTMLElement {
	connectedCallback() {
		this.innerHTML = 
		`
		<body>
			<aside>
				<nav>
					<ul>
						<li>
							<a href="https://FoodInKlamath.com">
								<span class="logo-button">
									<img src="images/burger_icon_large.png"/>
								</span>
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
								<i class="bx bx-headphone-mic"></i>
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
								<i class="bx bx-piggy-bank"></i>
								<span>Sponsor Us</span>
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		</body>
		<div class="sidenav">
			<button class="collapse-button">
				<img src="images/collapse_icon.png"/>
			</button>
		</div>
		`;
	}
}

customElements.define('nav-bar', NavBar);