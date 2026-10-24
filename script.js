function login() {
    const username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter your name.");
        return;
    }

    sessionStorage.setItem("emiUsername", username);
    showApp();
}

function showApp() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";
}

function logout() {
    sessionStorage.removeItem("emiUsername");
    document.getElementById("result").innerHTML = "";
    document.getElementById("username").value = "";
    document.getElementById("appPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

function calculateEMI() {
    const amount = Number(document.getElementById("amount").value);
    const rate = Number(document.getElementById("rate").value);
    const years = Number(document.getElementById("years").value);

    if (
        document.getElementById("amount").value === "" ||
        document.getElementById("rate").value === "" ||
        document.getElementById("years").value === "" ||
        amount <= 0 || rate < 0 || years <= 0
    ) {
        alert("Please enter a valid loan amount, interest rate, and tenure.");
        return;
    }

    const months = years * 12;
    const monthlyRate = rate / 1200;

    let emi;

    if (monthlyRate === 0) {
        emi = amount / months;
    } else {
        const factor = Math.pow(1 + monthlyRate, months);
        emi = amount * monthlyRate * factor / (factor - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;

    document.getElementById("result").innerHTML = `
        <h3>EMI Calculation Result</h3>
        <p>Monthly EMI: ₹${emi.toFixed(2)}</p>
        <p>Total Interest: ₹${totalInterest.toFixed(2)}</p>
        <p>Total Repayment: ₹${totalPayment.toFixed(2)}</p>
    `;
}