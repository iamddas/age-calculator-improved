document.getElementById("ageForm").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateAge();
});

function calculateAge() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  const dayErr = document.getElementById("dayerr");
  const monthErr = document.getElementById("montherr");
  const yearErr = document.getElementById("yearerr");
  const result = document.getElementById("result");
  const errorMsg = document.getElementById("error");

  // Clear previous errors
  dayErr.textContent = "";
  monthErr.textContent = "";
  yearErr.textContent = "";
  errorMsg.textContent = "";
  result.textContent = "";

  const currentYear = new Date().getFullYear();

  // Validation
  if (!day || day < 1 || day > 31) {
    dayErr.textContent = "Please enter a valid day (1–31).";
    return;
  }
  if (!month || month < 1 || month > 12) {
    monthErr.textContent = "Please enter a valid month (1–12).";
    return;
  }
  if (!year || year < 1000 || year > currentYear) {
    yearErr.textContent = `Please enter a valid year (1000–${currentYear}).`;
    return;
  }

  // Handle invalid date (like 31 Feb)
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    errorMsg.textContent = "Please enter a valid date!";
    return;
  }

  const today = new Date();
  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() - (month - 1);
  let ageDays = today.getDate() - day;

  // Adjust if current day/month is smaller than birth day/month
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageYears < 0) {
    errorMsg.textContent = "Birth year cannot be in the future!";
    return;
  }

  result.textContent = `🎉 You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
}
