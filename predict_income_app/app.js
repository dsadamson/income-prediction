document.addEventListener("DOMContentLoaded", function () {
  const inputContainer = document.getElementById("inputContainer");
  const dropdownContainer = document.getElementById("dropdownContainer");
  const inputForm = document.getElementById("inputForm");

  // CSV URL
  const csvUrl = 'https://raw.githubusercontent.com/dsadamson/income-prediction/main/income.csv';

  // Desired column headers for dropdowns (excluding "age")
  const desiredColumns = [
    'workclass', 'education', 'education_num', // Add 'education_num' here
    'marital_status', 'occupation', 'relationship', 'race', 'sex',
    'hours_per_week', 'native_country' // Add 'hours_per_week' here
  ];

  // Parse CSV and populate dropdowns
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function (results) {
      const data = results.data;

      desiredColumns.forEach(columnName => {
        const dropdownLabel = document.createElement("label");
        dropdownLabel.textContent = `${columnName}: `;

        const dropdownSelect = document.createElement("select");
        dropdownSelect.name = columnName;
        dropdownSelect.id = columnName;

        const uniqueValues = [...new Set(data.map(row => row[columnName]))];
        const sortedValues = (columnName === 'education_num' || columnName === 'hours_per_week')
          ? uniqueValues.map(value => Number(value)).sort((a, b) => a - b)
          : uniqueValues;

        sortedValues.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.text = value;
          dropdownSelect.appendChild(option);
        });

        dropdownContainer.appendChild(dropdownLabel);
        dropdownContainer.appendChild(dropdownSelect);
        dropdownContainer.appendChild(document.createElement("br"));
      });
    }
  });
});

function exportFormDataToCSV(formData) {
  // Prepare CSV data
  const headers = Object.keys(formData);
  const values = headers.map(key => formData[key]);
  const csvData = [headers.join(','), values.join(',')].join('\n');

  // Export the data to the CSV file
  const csvFilename = 'predict_income_app/website_data.csv';
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', csvFilename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function submitForm() {
  const ageInput = document.getElementById("age");
  const ageValue = ageInput.value;

  const formData = {};

  formData['age'] = ageValue;

  const dropdowns = document.querySelectorAll("select");

  dropdowns.forEach(dropdown => {
    const dropdownName = dropdown.name;
    const dropdownValue = dropdown.value;
    formData[dropdownName] = dropdownValue;
  });

  // Log the data to the console
  console.log(formData);

  // Call the function to export the form data to the CSV file
  exportFormDataToCSV(formData);
}


  
