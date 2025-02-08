let itemSelect = document.getElementById('itemSelect');
let countSelect = document.getElementById('countSelect');
let addBtn = document.getElementById('addBtn');
let itemList = document.getElementById('itemList');
let totalCountElement = document.getElementById('totalCount');
let percentageElement = document.getElementById('percentage');

let totalItems = 0;
let checkedItems = 0;

addBtn.addEventListener('click', function() {
    let itemName = itemSelect.value;
    let itemCount = parseInt(countSelect.value);

    if (itemName && itemCount) {
        addItemToList(itemName, itemCount);
        totalItems += itemCount;
        updateTotalCount();
        updatePercentage();
    } 
    else 
    {
        alert('Please select both an item and a count.');
    }
});

function addItemToList(itemName, itemCount) {
    let colDiv = document.createElement('div');
    colDiv.className = 'col-6 mb-2';

    let listItem = document.createElement('li');
    listItem.className = 'd-flex align-items-center';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'me-2';
    checkbox.addEventListener('change', handleCheckboxChange);

    let label = document.createElement('label');
    label.textContent = `${itemName} (x${itemCount})`;
    label.classList.add('ms-2');

    let removeIcon = document.createElement('i');
    removeIcon.className = 'bi bi-x-square ms-3';
    removeIcon.style.cursor = 'pointer';
    removeIcon.addEventListener('click', function() {
        removeItem(colDiv, checkbox.checked, itemCount);
    }); 

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(removeIcon);
    colDiv.appendChild(listItem);

    itemList.appendChild(colDiv);
}

function handleCheckboxChange(event) {
    if (event.target.checked) {
        checkedItems++;
        event.target.nextSibling.classList.add('strike-through');
    } else {
        checkedItems--;
        event.target.nextSibling.classList.remove('strike-through');
    }
    updatePercentage();
}

function removeItem(itemElement, isChecked, itemCount) {
    if (isChecked) checkedItems -= itemCount;
    totalItems -= itemCount;
    itemElement.remove();
    updateTotalCount();
    updatePercentage();
}

function updateTotalCount() {
    totalCountElement.textContent = totalItems;
}

function updatePercentage() {
    let percentage = totalItems > 0 ? Math.round(((totalItems - checkedItems) / totalItems) * 100) : 0;
    percentageElement.textContent = `${percentage}%`;
}