document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('opinionForm');
    const clearButton = document.getElementById('clearTable');
  
    const initialData = [

        {
            imie: 'Anna',
            nazwisko: 'Nowak',
            opinie: 'Sprzęt idealny do przygotowań przed zawodami – jakość na poziomie olimpijskim!',
            ocena_produktu: 'Doskonała',
            ocena_dostawy: 'Ekspresowa',
            Data_opinii: '2023-02-10'
        },
        {
            imie: 'Piotr',
            nazwisko: 'Wiśniewski',
            opinie: 'Hantle świetnie sprawdzają się w codziennym treningu przed maratonem. Polecam sportowcom!',
            ocena_produktu: 'Wysoka',
            ocena_dostawy: 'Zadowalająca',
            Data_opinii: '2023-03-05'
        },
        {
            imie: 'Katarzyna',
            nazwisko: 'Kowalczyk',
            opinie: 'Profesjonalna mata do ćwiczeń – jak na sali treningowej kadry narodowej!',
            ocena_produktu: 'Doskonała',
            ocena_dostawy: 'Wysoka',
            Data_opinii: '2023-01-20'
        },
        {
            imie: 'Marek',
            nazwisko: 'Lewandowski',
            opinie: 'Bieżnia spełnia oczekiwania nawet wymagającego sportowca. Przygotowania do triathlonu idą pełną parą!',
            ocena_produktu: 'Wysoka',
            ocena_dostawy: 'Bardzo dobra',
            Data_opinii: '2023-04-15'
        },
        {
            imie: 'Ewa',
            nazwisko: 'Zielińska',
            opinie: 'Świetna obsługa! Dzięki temu sklepowi czuję się jak olimpijka na treningu.',
            ocena_produktu: 'Bardzo wysoka',
            ocena_dostawy: 'Doskonała',
            Data_opinii: '2023-02-25'
        },
        {
            imie: 'Tomasz',
            nazwisko: 'Woźniak',
            opinie: 'Kupiony sprzęt pomaga mi w przygotowaniach do zawodów lekkoatletycznych. Świetna jakość!',
            ocena_produktu: 'Wysoka',
            ocena_dostawy: 'Bardzo dobra',
            Data_opinii: '2023-03-15'
        },
        {
            imie: 'Tomasz',
            nazwisko: 'Tomaszewki',
            opinie: 'Zestaw do treningu siłowego godny mistrzów olimpijskich! Polecam każdemu sportowcowi.',
            ocena_produktu: 'Wysoka',
            ocena_dostawy: 'Bardzo dobra',
            Data_opinii: '2023-03-15'
        }
    ];
  
    let tableData = loadTableData();
  
  form.addEventListener('submit', function(event) {
  
      event.preventDefault();
  
      const newOpinion = {
  
          imie: document.getElementById('imie').value,
          nazwisko: document.getElementById('nazwisko').value,
          opinie: document.getElementById('opinie').value,
          ocena_produktu: document.getElementById('ocena_produktu').value,
          ocena_dostawy: document.getElementById('ocena_dostawy').value,
          Data_opinii: document.getElementById('Data_opinii').value,
  
  };
  
      tableData.push(newOpinion);
      localStorage.setItem('opinions', JSON.stringify(tableData.slice(initialData.length)));
  
      refreshTable();
      form.reset();
  
  });
  
  clearButton.addEventListener('click', function() {
  
      localStorage.removeItem('opinions');
      tableData = loadTableData(); 
      refreshTable();
  
  });
  
  function loadTableData() {
  
      const storedData = JSON.parse(localStorage.getItem('opinions')) || [];
      return [...initialData, ...storedData];
  
  }
  
  function refreshTable() {
      const tableBody = document.getElementById('Tabela_opinii').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';
      insertDataIntoTable(tableData);
  }
  
  function insertDataIntoTable(data) {
  
      const tableBody = document.getElementById('Tabela_opinii').getElementsByTagName('tbody')[0];
  
      data.forEach(rowData => {
        const newRow = document.createElement('tr');
        Object.values(rowData).forEach(text => {
          const cell = document.createElement('td');
          cell.textContent = text;
          newRow.appendChild(cell);
        });
        tableBody.appendChild(newRow);
      });
  
    }
  
    refreshTable();
    
  });