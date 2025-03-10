let form = document.forms[0];
let hoofdDropDown = form.hoofd;
let subDropDown = form.sub;
let jsonData;

fetch('hobbys.json')
    .then(response => response.json())
    .then(function (data) {
        jsonData = data;
        getHoofd(jsonData);
    })
    .catch(error => console.error('Fout bij het laden van JSON:', error));

function getHoofd(jsonData) {
    let out = `<option value="">Kies de hoofdcategorie van je hobby</option>`;
    for (let hoofd in jsonData) {
        out += `<option value="${hoofd}">${hoofd}</option>`;
    }
    hoofdDropDown.innerHTML = out;
}

hoofdDropDown.addEventListener("change", getSub);

function getSub() {
    let hoofd = hoofdDropDown.value;

    if (hoofd.trim() === "") {
        subDropDown.disabled = true;
        subDropDown.innerHTML = `<option value="">Kies eerst een hoofdcategorie</option>`;
        return;
    }

    let subs = jsonData[hoofd];  // Correcte variabele gebruikt
    let out = `<option value="">Kies de subcategorie van je hobby</option>`;
    for (let sub of subs) {
        out += `<option value="${sub}">${sub}</option>`;
    }

    subDropDown.innerHTML = out;
    subDropDown.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const hobbySelect = document.getElementById('hobbySelect');


    fetch('hobbys.json')
        .then(response => response.json())
        .then(data => {

            for (let category in data) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                hobbySelect.appendChild(option);
            }
        })
        .catch(error => console.error('Fout bij ophalen van hobbydata:', error));


    document.getElementById('submitNewHobby').addEventListener('click', () => {
        const selectedHobby = hobbySelect.value;
        if (selectedHobby) {
            alert(`Je hebt gekozen voor: ${selectedHobby}`);
        } else {
            alert('Kies een hobbycategorie!');
        }
    });
});






