document.addEventListener('DOMContentLoaded', () => {
    const personalDetailsBtn = document.getElementById('personalDetailsBtn');
    const medicalDataBtn = document.getElementById('medicalDataBtn');
    const personalDetailsSection = document.getElementById('personalDetails');
    const medicalDataSection = document.getElementById('medicalData');

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const medicalHistory = document.getElementById('medicalHistory');

    personalDetailsBtn.addEventListener('click', () => {
        personalDetailsBtn.classList.add('active');
        medicalDataBtn.classList.remove('active');
        personalDetailsSection.style.display = 'block';
        medicalDataSection.style.display = 'none';
    });

    medicalDataBtn.addEventListener('click', () => {
        medicalDataBtn.classList.add('active');
        personalDetailsBtn.classList.remove('active');
        medicalDataSection.style.display = 'block';
        personalDetailsSection.style.display = 'none';
    });

    // Enable search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const historyItems = medicalHistory.getElementsByClassName('history-item');

        Array.from(historyItems).forEach(item => {
            const diagnosisText = item.querySelector('p strong').nextSibling.textContent.toLowerCase();
            const dateText = item.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
            const physicianText = item.querySelector('p:nth-of-type(3)').textContent.toLowerCase();

            if (diagnosisText.includes(searchTerm) || dateText.includes(searchTerm) || physicianText.includes(searchTerm)) {
                item.style.display = 'block'; // Show matching items
            } else {
                item.style.display = 'none'; // Hide non-matching items
            }
        });
    });

    const allergiesList = document.getElementById('allergiesList');
    allergiesList.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-details')) {
            const details = event.target.closest('.allergy-item').querySelector('.allergy-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        }
    });

    const confirmDataBtn = document.querySelector('.confirm-data');
    const closeDataBtn = document.querySelector('.close-data');
    const medicalDetailsForm = document.querySelector('.medical-details');

    confirmDataBtn.addEventListener('click', () => {
        // Add logic to confirm the data (e.g., save it somewhere or update UI)
        console.log("Data confirmed:", {
            diagnosis: document.getElementById('diagnosis').value,
            date: document.getElementById('date').value,
            physician: document.getElementById('physician').value,
            surgery: document.getElementById('surgery').value,
            surgeryDate: document.getElementById('surgeryDate').value,
            recovery: document.getElementById('recovery').value
        });

        medicalDetailsForm.reset(); // Reset the form fields
    });

    closeDataBtn.addEventListener('click', () => {
        medicalDetailsForm.style.display = 'none'; // Close the form
    });
});
