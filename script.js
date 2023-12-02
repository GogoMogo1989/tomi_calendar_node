document.addEventListener('DOMContentLoaded', () => {

    const addContactButton = document.getElementById('addContactButton');
    addContactButton.addEventListener('click', () => {
        const nameInput = document.getElementById('nameInput');
        const numberInput = document.getElementById('numberInput');
        const favoriteInput = document.getElementById('favoriteInput');

        const newContact = {
            name: nameInput.value,
            number: numberInput.value,
            isFavorite: favoriteInput.checked
        };

        fetch('/api/addContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchContactData();
        })
        .catch(error => console.error('Error adding contact:', error));
    });

   
    function fetchContactData() {
        fetch('/api/contacts')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';
            data.contacts.forEach(contact => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${contact.name}, Number: ${contact.number}, Favorite: ${contact.isFavorite}`;
                contactList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    fetchContactData();
});
