pagination.js

document.addEventListener('DOMContentLoaded', function () {
    var itemList = document.getElementById('posts-container');
    var items = itemList.getElementsByTagName('article');
    var itemsPerPage = 3;
    var currentPage = 1;

    function showPage(page) {
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = i >= (page - 1) * itemsPerPage && i < page * itemsPerPage ? 'block' : 'none';
        }
    }

    function updatePaginationButtons() {
        var paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        var totalPages = Math.ceil(items.length / itemsPerPage);

        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement('li');
            li.textContent = i;
            li.addEventListener('click', function () {
                currentPage = parseInt(this.textContent);
                showPage(currentPage);
                updatePaginationButtons();
            });

            if (i === currentPage) {
                li.classList.add('active');
            }

            paginationContainer.appendChild(li);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePaginationButtons();
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(items.length / itemsPerPage)) {
            currentPage++;
            showPage(currentPage);
            updatePaginationButtons();
        }
    }

    document.getElementById('prev').addEventListener('click', prevPage);
    document.getElementById('next').addEventListener('click', nextPage);

    // Initial page display
    showPage(currentPage);
    updatePaginationButtons();
});
