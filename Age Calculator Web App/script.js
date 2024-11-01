const currDate = document.getElementById("currDate");
const dateOfBirth = document.querySelector("#DOB");
const CalcAge = document.getElementById("CalcAge");
const popupModal = document.getElementById("popupModal");
const Age = document.getElementById("age");
const closeModal = document.querySelector(".close");

const today = new Date();
currDate.innerText = `Today's Date: ${today.toLocaleDateString('en-GB')}`;

CalcAge.addEventListener("click", () => {
    const dob = dateOfBirth.value.split("/");
    const birthDate = new Date(`${dob[1]}/${dob[0]}/${dob[2]}`);
    
    if (isNaN(birthDate)) {
        alert("Please enter a valid date in dd/mm/yyyy format.");
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    Age.innerText = `You are ${age} years old.`;
    popupModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    popupModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === popupModal) {
        popupModal.style.display = "none";
    }
});
