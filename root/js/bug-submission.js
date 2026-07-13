/* File: navbar.js */
/* Author: James Holland */

const submissionBtn = document.getElementById("bug-submission");
const bugTextBox	= document.getElementById("bug-textbox");
const bugGenre		= document.getElementById("error-type");

submissionBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const BugSubject = bugGenre.value;
	const BugBody	 = bugTextBox.value;
	fetch('https://formsubmit.co/ajax/holland.jd6002@gmail.com', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"Error Type": BugSubject,
			"Report Message": BugBody
		})
	})
	.then(response => response.json())
	.then(data => {
		alert("The submission went through! I will work on your request as soon as possible.");
		bugTextBox.value = "";
	});
});