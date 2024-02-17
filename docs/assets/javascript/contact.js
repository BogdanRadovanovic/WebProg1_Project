function createAgeSelectList(ageRanges) 
{
	let ageList = document.getElementById("ageList");
	if(ageList != null)
	{
		let ddList = document.createElement("select");
		ddList.setAttribute("id", "ddlAge");
		ddList.setAttribute("name", "ddlAge");
		ddList.classList.add("form-select", "inputElement");

		let ddlOption = document.createElement("option");
		ddlOption=document.createElement("option");
		ddlOption.setAttribute("value", 0);
		ddlOption.textContent = "-Select age-";
		ddList.appendChild(ddlOption);

		for (let i = 1; i < ageRanges.length; i++) 
		{
			ddlOption=document.createElement("option");
			ddlOption.setAttribute("value", ageRanges[i]);
			ddlOption.textContent = ageRanges[i];
			ddList.appendChild(ddlOption);
		}
		
		let ddlLabel = document.createElement("label");
		ddlLabel.setAttribute("for", "ddlAge");
		ddlLabel.classList.add("form-label");
		ddlLabel.appendChild(document.createTextNode("Age:"));
		ageList.appendChild(ddlLabel);
		ageList.appendChild(ddList);
	} 
}

function emptyFormFields() 
{
	let inputElements = document.querySelectorAll(".inputElement"); 
	let notificationsFrequencyDiv = document.getElementById("notificationsFrequency");

	if(inputElements.length > 0 && notificationsFrequencyDiv != null)
	{
		for (const inputElement of inputElements) 
		{
			let inputName = inputElement.tagName.toLowerCase();

			if(inputName == "textarea")
			{
				inputElement.value = ""; 
			}
			else if(inputName == "select")
			{
				inputElement.value = "0"; 
			}
			else 
			{
				let inputType = inputElement.getAttribute("type"); 
				if(inputType != null)
				{
					switch(inputType)
					{
						case "checkbox":
						case "radio": inputElement.checked = false; break; 
						default: inputElement.value = ""; 
					}
				}
			}
		}

		notificationsFrequencyDiv.style.display = "none";
	}
}

function printData(data) 
{
	let infoDiv = document.getElementById("infoDiv");
	if(infoDiv != null)
	{
		infoDiv.innerHTML = "";

		let infoList = document.createElement("ul");
		let listElement;

		for(let i = 0; i < data.length; i++)
		{
			listElement = document.createElement("li");
			listElement.appendChild(document.createTextNode(data[i])); 
			infoList.appendChild(listElement);
		}

		let dateObj = new Date();
		let dateString = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`; 
		listElement = document.createElement("li");
		listElement.appendChild(document.createTextNode("Submitted on: "+dateString)); 
		infoList.appendChild(listElement);

		infoDiv.appendChild(infoList); 

		infoDiv.style.display = "block"; 

		emptyFormFields();
	}
}

function validateForm()
{
	let taNote = document.getElementById("taNote"); 

	if(taNote != null)
	{
		
		let message = taNote.value;

		if (message == "") 
		{
			alert("You haven't written us no message. Write what you want and resend."); 
			taNote.classList.add("border-2", "border-danger"); 
			taNote.labels.forEach(label => 
			{
				if(label.classList.contains("errorLabel"))
				{
					label.style.display = "inline-block"; 
				}
			}); 
			return false;
		}
		else
		{
			//RegEx
			const regEmail = /^[\w\d\._-]{3,}@\w{3,}(\.\w{2,3})+$/;
			const regName = /^[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,})+$/;
			const regNumber = /^06([0-6]|9)\d{6,7}$/;

			let invalidInputs = new Array();
			let validData = new Array();

			//Email check
			let tbEmail = document.getElementById("tbEmail");
			if(tbEmail != null)
			{
				let email = tbEmail.value.trim();
				if(regEmail.test(email))
				{
					validData.push("Email address: "+email);
					tbEmail.classList.remove("border-2", "border-danger");
					tbEmail.labels.forEach(label => 
					{
						if(label.classList.contains("errorLabel"))
						{
							label.style.display = "none"; 
						}
					}); 
				}
				else
				{
					invalidInputs.push(tbEmail);
				}
			}

			//Name check
			let tbName = document.getElementById("tbName"); 
			if(tbName != null)
			{
				let name = tbName.value.trim();
				if(regName.test(name))
				{
					validData.push("Full name: "+name);
					tbName.classList.remove("border-2", "border-danger");
					tbName.labels.forEach(label => 
					{
						if(label.classList.contains("errorLabel"))
						{
							label.style.display = "none"; 
						}
					}); 
				}
				else
				{
					invalidInputs.push(tbName);
				}
			}
			

			//Number check
			let tbNumber = document.getElementById("tbNumber");
			if(tbNumber != null)
			{
				let number = tbNumber.value.trim();
				if(number != "")
				{
					if(regNumber.test(number))
					{
						validData.push("Phone number: "+number);
						tbNumber.classList.remove("border-2", "border-danger");
						tbNumber.labels.forEach(label => 
						{
							if(label.classList.contains("errorLabel"))
							{
								label.style.display = "none"; 
							}
						}); 
					}
					else
					{
						invalidInputs.push(tbNumber);
					}
				}
				else
				{ 
					tbNumber.classList.remove("border-2", "border-danger"); 
					tbNumber.labels.forEach(label => 
					{
						if(label.classList.contains("errorLabel"))
						{
							label.style.display = "none"; 
						}
					}); 
				}
			}

			//Age check
			let ddlAge = document.getElementById("ddlAge");
			if(ddlAge != null)
			{
				if(ddlAge.value != "0")
				{
					validData.push("Age: "+ddlAge.value);
				}
			}

			//Notifications check
			let chbNotifications = document.getElementById("chbNotifications");
			let notifications = "No";
			if(chbNotifications != null)
			{
				if (chbNotifications.checked && document.form1 != undefined) 
				{
					//Notifications frequency check 
					let rbNotifications = document.form1.rbNotifications;
					if(rbNotifications != undefined)
					{
						if(rbNotifications.value != "")
						{ 
							let rbErrorLabel = document.querySelector("#notificationsFrequency .errorLabel"); 
							if(rbErrorLabel != null)
							{
								rbErrorLabel.style.display = "none";
							}

							for (let i = 0; i < rbNotifications.length; i++) 
							{
								rbNotifications[i].labels[0].classList.remove("text-danger-emphasis");
								rbNotifications[i].classList.remove("border-2", "border-danger"); 

								if (rbNotifications.value == rbNotifications[i].value)
								{
									notifications = "Yes - " + rbNotifications[i].value;
								}
							}

							validData.push("Notifications: "+notifications);
						}
						else
						{
							for (var i = 0; i < rbNotifications.length; i++) 
							{
								invalidInputs.push(rbNotifications[i]); 
							}  
						}
					}
				}
				else
				{
					validData.push("Notifications: "+notifications);
				}
			}

			validData.push("Message: "+message);
			taNote.classList.remove("border-2", "border-danger");
			taNote.labels.forEach(label => 
			{
				if(label.classList.contains("errorLabel"))
				{
					label.style.display = "none"; 
				}
			}); 

			console.log(validData);
			console.log(invalidInputs);

			//Final check
			if (invalidInputs == 0) 
			{
				alert("You have successfully submitted your message! \nCheck the message and your info, below the form."); 
				printData(validData); 
				return false;
			}
			else
			{
				for (let i = 0; i < invalidInputs.length; i++) 
				{ 
					if(invalidInputs[i].name != "rbNotifications")
					{
						invalidInputs[i].labels.forEach(label => 
						{
							if(label.classList.contains("errorLabel"))
							{
								label.style.display = "inline-block"; 
							}
						}); 
					}
					else
					{
						invalidInputs[i].labels[0].classList.add("text-danger-emphasis");

						let rbErrorLabel = document.querySelector("#notificationsFrequency .errorLabel"); 
						if(rbErrorLabel != null)
						{
							rbErrorLabel.style.display = "inline";
						} 
					}

					invalidInputs[i].classList.add("border-2", "border-danger");
				}
				return false;
			}
		}
	}
	else
	{
		return false; 
	}
}

window.addEventListener("load", function () 
{ 
	createAgeSelectList(ageRanges);
	
	$("#chbNotifications").change(function()
	{
		$("#notificationsFrequency").toggle();
	});

	document.getElementById("form1").onsubmit = validateForm;
}); 