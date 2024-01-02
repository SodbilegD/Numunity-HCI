class Pagination extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .pagination-button {
            background-color: inherit;
            color: var(--color-main);
            border: none;
            padding: 10px 15px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
        }
        .pagination-button:hover{
            cursor: pointer;
            background-color: var(--color-white);
        }
        
        .pagination {
            display: flex;
            list-style: none;
            padding: 0;
        }
        
        .pagination li {
            margin: 0 0.5rem;
            cursor: pointer;
        }
        
        .active {
            font-weight: bold;
            color: var(--color-main);
        }
        </style>
        <nav class="pagination-container">
            <button class="pagination-button" id="prev" aria-label="Previous page" title="Previous page">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
                <div id="pagination" class="pagination"></div>
            <button class="pagination-button" id="next" aria-label="Next page" title="Next page">
                <i class="fa-solid fa-arrow-right"></i> 
            </button>
        </nav>
        `;

        var itemList = document.getElementById('posts-container'); // Update with the actual ID of your posts container
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
    }

    disconnectedCallback() {
        // Implementation for disconnectedCallback
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // Implementation for attributeChangedCallback
    }

    adoptedCallback() {
        // Implementation for adoptedCallback
    }
}

window.customElements.define('wc-pagination', Pagination);
