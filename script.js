document.addEventListener('DOMContentLoaded', () => {
    const personalDetailsBtn = document.getElementById('personalDetailsBtn');
    const medicalDataBtn = document.getElementById('medicalDataBtn');
    const personalDetailsSection = document.getElementById('personalDetails');
    const medicalDataSection = document.getElementById('medicalData');
    const addAllergyBtn = document.querySelector('.add-allergy');
    const allergiesList = document.getElementById('allergiesList');
    const addNewDataBtn = document.querySelector('.add-data');
    const newDataForm = document.getElementById('newDataForm');
    const medicalHistory = document.getElementById('medicalHistory');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Toggle between personal details and medical data sections
    personalDetailsBtn.addEventListener('click', () => {
        personalDetailsSection.style.display = 'block';
        medicalDataSection.style.display = 'none';
        personalDetailsBtn.classList.add('active');
        medicalDataBtn.classList.remove('active');
    });

    medicalDataBtn.addEventListener('click', () => {
        personalDetailsSection.style.display = 'none';
        medicalDataSection.style.display = 'block';
        personalDetailsBtn.classList.remove('active');
        medicalDataBtn.classList.add('active');
    });

    // View details functionality
    allergiesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const detailsDiv = e.target.closest('.allergy-item').querySelector('.allergy-details');
            if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
                detailsDiv.style.display = 'block';
                e.target.textContent = 'Close';
            } else {
                detailsDiv.style.display = 'none';
                e.target.textContent = 'View Details';
            }
        }
    });

    // Add new allergy
    addAllergyBtn.addEventListener('click', () => {
        const newAllergyDiv = document.createElement('div');
        newAllergyDiv.classList.add('allergy-item');
        newAllergyDiv.innerHTML = `
            <div class="form-group">
                <label>Allergy Name</label>
                <input type="text" class="new-allergy-name" placeholder="Enter allergy name">
            </div>
            <div class="form-group">
                <label>Allergy Details</label>
                <textarea class="new-allergy-details" placeholder="Enter details"></textarea>
            </div>
            <button class="confirm-new-allergy">Add Allergy</button>
        `;

        allergiesList.appendChild(newAllergyDiv);
        addAllergyBtn.style.display = 'none'; // Hide the add allergy button when adding a new one

        // Confirm new allergy
        newAllergyDiv.querySelector('.confirm-new-allergy').addEventListener('click', () => {
            const allergyName = newAllergyDiv.querySelector('.new-allergy-name').value;
            const allergyDetails = newAllergyDiv.querySelector('.new-allergy-details').value;

            if (allergyName && allergyDetails) {
                const allergyItem = document.createElement('div');
                allergyItem.classList.add('allergy-item');
                allergyItem.innerHTML = `
                    <div class="form-group">
                        <label>${allergyName}</label>
                        <button class="view-details">View Details</button>
                    </div>
                    <div class="allergy-details" style="display: none;">
                        <textarea readonly>${allergyDetails}</textarea>
                        <button class="edit-allergy">Edit</button>
                        <button class="delete-allergy">Delete</button>
                        <button class="cancel-allergy">Cancel</button>
                    </div>
                `;

                allergiesList.appendChild(allergyItem);
                newAllergyDiv.remove();
                addAllergyBtn.style.display = 'block'; // Show the add allergy button again
            } else {
                alert('Please enter both allergy name and details.');
            }
        });
    });

    // Adding new medical data
    addNewDataBtn.addEventListener('click', () => {
        newDataForm.style.display = 'block';
        addNewDataBtn.style.display = 'none'; // Hide the add data button while adding new data
    });

    // Confirm new medical data
    newDataForm.querySelector('.confirm-data').addEventListener('click', () => {
        const diagnosis = document.getElementById('diagnosis').value;
        const date = document.getElementById('date').value;
        const physician = document.getElementById('physician').value;
        const surgery = document.getElementById('surgery').value;
        const surgeryDate = document.getElementById('surgeryDate').value;
        const recovery = document.getElementById('recovery').value;

        if (diagnosis && date && physician) {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.innerHTML = `
                <p><strong>Diagnosis:</strong> ${diagnosis}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Physician:</strong> ${physician}</p>
                ${surgery ? `<p><strong>Surgery:</strong> ${surgery}</p>` : ''}
                ${surgeryDate ? `<p><strong>Surgery Date:</strong> ${surgeryDate}</p>` : ''}
                ${recovery ? `<p><strong>Recovery:</strong> ${recovery}</p>` : ''}
            `;
            medicalHistory.appendChild(historyItem);

            // Reset the form and hide it
            newDataForm.reset();
            newDataForm.style.display = 'none';
            addNewDataBtn.style.display = 'block'; // Show the add data button again
        } else {
            alert('Please enter diagnosis, date, and physician details.');
        }
    });

    // Edit or delete an allergy
    allergiesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-allergy')) {
            const detailsDiv = e.target.closest('.allergy-details');
            const textArea = detailsDiv.querySelector('textarea');
            textArea.readOnly = false;
            e.target.textContent = 'Save';
            e.target.classList.remove('edit-allergy');
            e.target.classList.add('save-allergy');

        } else if (e.target.classList.contains('save-allergy')) {
            const detailsDiv = e.target.closest('.allergy-details');
            const textArea = detailsDiv.querySelector('textarea');
            textArea.readOnly = true;
            e.target.textContent = 'Edit';
            e.target.classList.remove('save-allergy');
            e.target.classList.add('edit-allergy');

        } else if (e.target.classList.contains('delete-allergy')) {
            const allergyItem = e.target.closest('.allergy-item');
            allergyItem.remove();
        } else if (e.target.classList.contains('cancel-allergy')) {
            const allergyItem = e.target.closest('.allergy-item');
            allergyItem.remove();
        }
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const historyItems = medicalHistory.getElementsByClassName('history-item');
        
        Array.from(historyItems).forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
});
