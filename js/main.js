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
        { id: 0, type: "smartphone", brand: "Apple", name: "iPhone 11 White", color: "White", code: "MQ233", memory: ["128GB"], photo: "img/catalog/products/iphone/iphone-11/iphone-11-white.png", price: 510 },
        { id: 3, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro Max Deep-purple", color: "Deep-purple", code: "MQ0G3", memory: ["128GB", "256GB", "1TB"], photo: "img/catalog/products/iphone/iphone-14-pro-max/iphone-14-pro-max-deep-purple/iphone-14-pro-max-deep-purple.png", price: 1600 },
        { id: 1, type: "smartphone", brand: "Apple", name: "iPhone 13 mini Pink", color: "Pink", code: "MLK23", memory: ["128GB", "256GB"], photo: "img/catalog/products/iphone/iphone-13-mini/iphone-13-mini-pink.png", price: 850 },
        { id: 2, type: "smartphone", brand: "Apple", name: "iPhone 14 Pro Space-black", color: "Space-black", code: "MQ0T3", memory: ["128GB", "256GB", "512GB"], photo: "img/catalog/products/iphone/iphone-14-pro/iphone-14-pro-space-black/iphone-14-pro-space-black.png", price: 1399 }
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
            brandCurrentFilters.forEach(filterValue => {
                currentCards = currentCards.filter(card => {
                    if (card.brand == filterValue) return true;
                    else return false;
                });
            });
        };

        if (memoryCurrentFilters!= 'all') {
            memoryCurrentFilters.forEach(filterValue => {
                currentCards = currentCards.filter(card => {
                    if (card.memory.includes(filterValue)) return true;
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

    let productPerPage = window.innerWidth <= 800 ? 8 : 9; // Кол-во продуктов на странице 
    // Если экран поменялся без перезагрузки страницы
    window.addEventListener('resize', () => {
        const newProductPerPage = window.innerWidth <= 800 ? 8 : 9;
        if (newProductPerPage !== productPerPage) {
            productPerPage = newProductPerPage;
            currentPage = 1;
            renderCards();
            updatePagination(currentCards.length);
        }
    });

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
                return toGB(b.memory[b.memory.length - 1]) - toGB(a.memory[a.memory.length - 1]);
            });
        }

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
                        <img src="./img/catalog/favorite-icon.svg" alt="Add to favorite" class="border-icon">
                        <img src="./img/catalog/favorite-full-icon.svg" alt="Delete from favorite" class="fill-icon">
                    </button>
                </div>

                <div class="catalog-products-card__photo">
                    <img src="${product.photo}" alt="${product.brand} ${product.name}">
                </div>

                <p class="catalog-products-card__info">
                    ${product.brand} ${product.name} (${product.code})
                </p>

                <span class="catalog-products-card__price">$${product.price}</span>

                <div class="catalog-products-card__btn">
                    <button class="black-btn" type="button">
                        Buy Now
                    </button>
                </div>
            `;
            // Переход на страницу товара
            div.querySelector('.catalog-products-card__btn').addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });

            productsContainer.appendChild(div);
        });

        // Добавление в избранное (анимация)
        const favoriteBtn = document.querySelectorAll('.catalog-products-card__favorite-btn');
        favoriteBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.querySelector('.fill-icon').classList.toggle('active');
            });
        });
    };

    function updatePagination(totalItems) {
        const container = document.querySelector('.catalog-products-cards-pagination__buttons');
        container.innerHTML = '';

        const totalPages = Math.ceil(currentCards.length / productPerPage);
        const visibleButtons = 4;

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

        const prevBtn = document.querySelector('.catalog-products-cards-pagination__prev');
        prevBtn.onclick = () => {
            if (currentPage > 1) {
            currentPage--;
            renderCards();
            updatePagination(totalItems);
            }
        };

        const nextBtn = document.querySelector('.catalog-products-cards-pagination__next');
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
            currentPage++;
            renderCards();
            updatePagination(totalItems);
            }
        };

        let startPage, endPage;

        if (totalPages <= visibleButtons) {
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

        if (startPage > 1) {
            container.appendChild(createBtn('1', 1, currentPage === 1));
        }

        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.classList.add('dots');
            dots.textContent = '...';
            container.appendChild(dots);
        }

        for (let i = startPage; i <= endPage; i++) {
            container.appendChild(createBtn(i, i, i === currentPage));
        }

        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.classList.add('dots');
            dots.textContent = '...';
            container.appendChild(dots);
        }

        if (totalPages > visibleButtons) {
            container.appendChild(createBtn(totalPages, totalPages, currentPage === totalPages));
        }
    }

    filterChange();
    // 

    // Счётчик всех товаров
    // По названию бренда
    const catalogFiltersOptions = document.querySelector('.catalog-filters__options-list');
    [...catalogFiltersOptions.children].forEach(label => {
        const checkbox = label.querySelector('input');
        const counter = allProducts.filter(product => product.brand == checkbox.value).length;
        label.querySelector('.count-products').textContent = counter;
    });

    // По нколичеству памяти
    const catalogFiltersMemory = document.querySelector('.catalog-filters__memory-list');
    [...catalogFiltersMemory.children].forEach(label => {
        const checkbox = label.querySelector('input');
        const counter = allProducts.filter((product) => {
            if (product.memory.includes(checkbox.value))
                return true;
        }).length;
        label.querySelector('.count-products').textContent = counter;
    });
    // 

    // Переход на страницу описания товара
    document.querySelectorAll('.catalog-products-card__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('product.html');
        });
    });
    // 

    // Шапка, бургер меню
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    const burgerMenuContent = document.getElementById('burgerMenuContent');
    let interval = true;

    burgerMenuButton.addEventListener('click', () => {
        if (interval === true) {
            burgerMenuButton.classList.toggle('active');
            const burgerMenuLines = [...burgerMenuButton.children]
            interval = false;
            
            if (burgerMenuButton.classList.contains('active')) {
                burgerMenuLines.forEach((btn, index) => {
                    btn.style.animation = `burgerAnimationLine${index + 1} .5s ease forwards`;
                });
                burgerMenuContent.classList.add('active'); // Открываем контент бургер меню
                document.querySelector('body').style.overflowY = 'hidden';
            } else {
                burgerMenuLines.forEach((btn, index) => {
                    btn.style.animation = `burgerAnimationLine${index + 1}Reverse .5s ease forwards`;
                });
                burgerMenuContent.classList.remove('active'); // Закрываем контент бургер меню
                document.querySelector('body').style.overflowY = 'visible';
            }

            setTimeout(() => {
                interval = true;
            }, 500);
        }
    });
    // 

    // Скрываем или показываем красный кружок у иконки корзины
    const allCartIcon = [...document.querySelectorAll('.header-actions__cart')];
    const badge = JSON.parse(localStorage.getItem('badge'));

    if (badge === true) {
        allCartIcon.forEach(icon => {
            icon.classList.add('new');
        });
    } else {
        allCartIcon.forEach(icon => {
            icon.classList.remove('new');
        });
    }
    // 
});