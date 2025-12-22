document.addEventListener('DOMContentLoaded', () => {
    // Изменение значения в input[type="range"] price
    const inputsRange = document.querySelectorAll('input[type="range"]');

    inputsRange.forEach(input => {
        input.addEventListener('input', () => {
            valueChange(input);
        });

        function valueChange(input) {
            const min = input.min || 0;
            const max = input.max;
            const value = input.value;

            const percent = ((value - min) / (max - min)) * 100;

            input.style.setProperty('--value', percent + '%')
        };

        valueChange(input);
    });
    // 

    // Input range в фильтрах каталога
    const inputRangePrice = document.getElementById('price');
    const priceMax = document.getElementById('priceMax');
    
    priceMax.value = inputRangePrice.value;

    inputRangePrice.addEventListener('input', () => {
        priceMax.value = inputRangePrice.value;
    })
    // 

    // Дроп-кнопки
    const dropdownBtns = document.querySelectorAll('.catalog-filters__dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('active');
        });
    });
    // 

    // Select для стрелки
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('click', () => {
            select.parentElement.classList.toggle('active');
        });
        select.addEventListener('blur', () => {
            select.parentElement.classList.remove('active');
        });
    });
    // 

    // Показ и скрытие окна с фильтрами для мобильного адаптива
    const openFiltersBtn = document.getElementById('openFilters');
    const closeFiltersBtn = document.getElementById('closeFilters');
    const filters = document.getElementById('filtersWindow');
    const products = document.getElementById('productsWindow');

    openFiltersBtn.addEventListener('click', () => {
        products.classList.remove('active');
        filters.style.display = 'flex';

        openFiltersBtn.disabled = closeFiltersBtn.disabled = true;

        setTimeout(() => {
            filters.classList.add('active');
        }, 200);
        setTimeout(() => {
            products.style.display = 'none';
            openFiltersBtn.disabled = closeFiltersBtn.disabled = false;
        }, 700);
    });

    closeFiltersBtn.addEventListener('click', () => {
        filters.classList.remove('active');
        products.style.display = 'flex';

        openFiltersBtn.disabled = closeFiltersBtn.disabled = true;

        setTimeout(() => {
            filters.style.display = 'none';
            products.classList.add('active');
            openFiltersBtn.disabled = closeFiltersBtn.disabled = false;
        }, 500);
    });
    // 

    // Генерация карт, показ карт, фильтры
    const allProducts = [
        { id: 0, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "512GB", color: "Gold", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 512gb.png", price: 1437 },
        { id: 1, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 510 },
        { id: 2, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 550 },
        { id: 3, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "White", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb.png", price: 1499 },
        { id: 4, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "Gold", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb gold.png", price: 1399 },
        { id: 5, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "128GB", color: "Deep Purple", code: "MQ0G3", photo: "./img/catalog/products/iphone/Iphone 14 Pro Max/Iphone 14 pro 128gb deep-purple.png", price: 1600 },
        { id: 6, type: "smartphone", brand: "Apple", name: "iPhone 13 mini", memory: "128GB", color: "Pink", code: "MLK23", photo: "./img/catalog/products/iphone/Iphone 13 mini/Iphone 13 mini 128gb pink.png", price: 850 },
        { id: 7, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Space Black", code: "MQ0T3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb space-black.png", price: 1399 },
        { id: 8, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Silver", code: "MQ103", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb silver.png", price: 1399 },
        { id: 9, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "512GB", color: "Gold", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 512gb.png", price: 1437 },
        { id: 10, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 510 },
        { id: 11, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 550 },
        { id: 12, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "White", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb.png", price: 1499 },
        { id: 13, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "Gold", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb gold.png", price: 1399 },
        { id: 14, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "128GB", color: "Deep Purple", code: "MQ0G3", photo: "./img/catalog/products/iphone/Iphone 14 Pro Max/Iphone 14 pro 128gb deep-purple.png", price: 1600 },
        { id: 15, type: "smartphone", brand: "Apple", name: "iPhone 13 mini", memory: "128GB", color: "Pink", code: "MLK23", photo: "./img/catalog/products/iphone/Iphone 13 mini/Iphone 13 mini 128gb pink.png", price: 850 },
        { id: 16, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Space Black", code: "MQ0T3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb space-black.png", price: 1399 },
        { id: 17, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Silver", code: "MQ103", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb silver.png", price: 1399 },
        { id: 18, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "512GB", color: "Gold", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 512gb.png", price: 1437 },
        { id: 19, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 510 },
        { id: 20, type: "smartphone", brand: "Apple", name: "iPhone 11", memory: "128GB", color: "White", code: "MQ233", photo: "./img/catalog/products/iphone/Iphone 11/Iphone 11 128gb.png", price: 550 },
        { id: 21, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "White", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb.png", price: 1499 },
        { id: 22, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "1TB", color: "Gold", code: "MQ2V3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 1tb gold.png", price: 1399 },
        { id: 23, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "128GB", color: "Deep Purple", code: "MQ0G3", photo: "./img/catalog/products/iphone/Iphone 14 Pro Max/Iphone 14 pro 128gb deep-purple.png", price: 1600 },
        { id: 24, type: "smartphone", brand: "Apple", name: "iPhone 13 mini", memory: "128GB", color: "Pink", code: "MLK23", photo: "./img/catalog/products/iphone/Iphone 13 mini/Iphone 13 mini 128gb pink.png", price: 850 },
        { id: 25, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Space Black", code: "MQ0T3", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb space-black.png", price: 1399 },
        { id: 26, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro", memory: "256GB", color: "Silver", code: "MQ103", photo: "./img/catalog/products/iphone/Iphone 14 Pro/Iphone 14 pro 256gb silver.png", price: 1399 }
    ];

    const priceInputMin = document.getElementById('priceMin');
    const priceInputMax = document.getElementById('priceMax');
    const brandFilters = [...document.querySelectorAll('input[name="brand"]')];
    const memoryFilters = [...document.querySelectorAll('input[name="memory"]')];
    const selectedProducts = document.getElementById('selectedProducts');
    const filterOrder = document.getElementById('filterOrder');
    const inputRange = document.getElementById('price');

    let currentCards = [];

    brandFilters.forEach(filter => {
        filter.addEventListener('input', filterChange);
    });

    memoryFilters.forEach(filter => {
        filter.addEventListener('input', filterChange);
    })

    priceInputMax.addEventListener('input', filterChange);
    priceInputMin.addEventListener('input', filterChange);
    inputRange.addEventListener('input', filterChange);
    filterOrder.addEventListener('change', filterChange);

    function filterChange() {
        let brandCurrentFilters = brandFilters.filter(filter => filter.checked).map(filter => filter.value);
        if (brandCurrentFilters.length == 0) {
            brandCurrentFilters = ['all'];
        };

        let memoryCurrentFilters = memoryFilters.filter(filter => filter.checked).map(filter => filter.value);
        if (memoryCurrentFilters.length == 0) {
            memoryCurrentFilters = ['all'];
        };

        currentCards = allProducts.filter(product => {
            if (product.price >= priceInputMin.value && product.price <= priceInputMax.value) return true;
        });

        if (brandCurrentFilters != 'all') {
            currentCards.filter(card => {
                brandCurrentFilters.forEach(filterValue => {
                    if (card.brand == filterValue) return true;
                    else return false;
                });
            });
        };

        if (memoryCurrentFilters!= 'all') {
            currentCards.filter(card => {
                memoryCurrentFilters.forEach(filterValue => {
                    if (card.brand == filterValue) return true;
                    else return false;
                });
            });
        };

        selectedProducts.textContent = currentCards.length;
        totalPages = Math.ceil(currentCards.length / productPerPage);
        currentPage = 1;
        updatePagination();
        renderCards();
    };

    const productPerPage = 9; // Кол-во продуктов на странице
    let currentPage = 1; // Номер открытой страницы

    function renderCards() {
        const productsContainer = document.getElementById('productsContainer');
        productsContainer.innerHTML = '';

        const sortedBy = [...filterOrder.children].filter(option => option.selected).map(option => option.value);
        let sortedCards = [];
        if (sortedBy == 'rating') {
            sortedCards = currentCards;
        } else if (sortedBy == 'price') {
            sortedCards = [...currentCards].sort((a, b) => a.price - b.price);
        } else if (sortedBy == 'memory') {
            sortedCards = [...currentCards].sort((a, b) => {
                function toGB(mem) {
                    if (mem.includes('TB')) {
                        return parseInt(mem) * 1024;
                    } else {
                        return parseInt(mem);
                    }
                };
                return toGB(b.memory) - toGB(a.memory);
            });
        }
        console.log(sortedCards);

        const start = (currentPage - 1) * productPerPage;
        const end = start + productPerPage;
        const pageProducts = [...sortedCards].slice(start, end);

        pageProducts.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('catalog-products__card');
            div.dataset.id = product.id;
            div.innerHTML = `
                <div class="catalog-products-card__favorite">
                    <button class="catalog-products-card__favorite-btn" aria-label="Add to favorite" type="button">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="catalog-products-card__photo">
                    <img src="${product.photo}" alt="${product.brand} ${product.name} ${product.memory} ${product.color}">
                </div>

                <p class="catalog-products-card__info">
                    ${product.brand} ${product.name} ${product.memory} ${product.color} (${product.code})
                </p>

                <span class="catalog-products-card__price">$${product.price}</span>

                <div class="catalog-products-card__btn">
                    <button class="black-btn" type="button">
                        Buy Now
                    </button>
                </div>
            `

            productsContainer.appendChild(div);
        });
    };

    function updatePagination(totalItems) {
        const container = document.querySelector('.catalog-products-cards-pagination__buttons');
        container.innerHTML = '';

        const totalPages = Math.ceil(currentCards.length / productPerPage);
        const visibleButtons = 4;

        // Функция создания кнопки
        function createBtn(text, page, active = false) {
            const btn = document.createElement('button');
            btn.classList.add('catalog-products-cards-pagination__btn');
            if (active) btn.classList.add('active');
            btn.textContent = text;
            if (page !== null) {
            btn.addEventListener('click', () => {
                currentPage = page;
                renderCards(); 
                updatePagination(totalItems);
            });
            }
            return btn;
        }

        // Стрелка влево
        const prevBtn = document.querySelector('.catalog-products-cards-pagination__prev');
        prevBtn.onclick = () => {
            if (currentPage > 1) {
            currentPage--;
            renderCards();
            updatePagination(totalItems);
            }
        };

        // Стрелка вправо
        const nextBtn = document.querySelector('.catalog-products-cards-pagination__next');
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
            currentPage++;
            renderCards();
            updatePagination(totalItems);
            }
        };

        // Расчёт видимых страниц
        let startPage, endPage;

        if (totalPages <= visibleButtons) {
            // Если страниц мало — показываем все
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 2) {
            startPage = 1;
            endPage = visibleButtons;
            } else if (currentPage >= totalPages - 1) {
            startPage = totalPages - visibleButtons + 1;
            endPage = totalPages;
            } else {
            startPage = currentPage - 1;
            endPage = currentPage + 2;
            if (endPage > totalPages) endPage = totalPages;
            }
        }

        // Кнопка 1
        container.appendChild(createBtn('1', 1, currentPage === 1));

        // Точки слева
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.classList.add('dots');
            dots.textContent = '...';
            container.appendChild(dots);
        }

        // Основные кнопки
        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) { // 1 и последнюю не дублируем
            container.appendChild(createBtn(i, i, i === currentPage));
            }
        }

        // Точки справа
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.classList.add('dots');
            dots.textContent = '...';
            container.appendChild(dots);
        }

        // Последняя кнопка
        if (totalPages > visibleButtons) {
            container.appendChild(createBtn(totalPages, totalPages, currentPage === totalPages));
        }
    }

    filterChange();
    // 

    // Переход на страницу описания товара
    document.querySelectorAll('.catalog-products-card__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('product.html');
        });
    });
    // 
});