
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
    const dataTable = document.getElementById('data-body');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    fetch(apiUrl)
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            renderTable(currentPage);
            setupPagination();
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderTable(page) {
        dataTable.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.email}</td>`;
            dataTable.appendChild(row);
        });
    }
    function setupPagination() {
        const pageCount = Math.ceil(data.length / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-button');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderTable(currentPage);
                updateActiveButton();
            });
            pagination.appendChild(pageButton);
        }
    }
    function updateActiveButton() {
        const buttons = pagination.querySelectorAll('.page-button');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        });
    }
});
