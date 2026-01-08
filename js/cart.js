document.addEventListener('DOMContentLoaded', () => {
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const selectedProductsList = document.getElementById('selectedProductsList');
    console.log(selectedProducts);
    
    function favoriteCards() {
        selectedProductsList.innerHTML = '';

        if (selectedProducts.length > 0) {
            selectedProducts.forEach(product => {
                const selectProduct = product;
                const div = document.createElement('div');
                div.classList.add('shopping-cart__product');
                div.dataset.id = selectProduct.id;
                console.log(selectProduct.id);
                div.innerHTML = `
                    <div class="shopping-cart__product-photo">
                        <img src="${selectProduct.photo}" alt="Product photo" class="shopping-cart__product-img">
                    </div>

                    <div class="shopping-cart__product-content">
                        <div class="shopping-cart__product-info">
                            <h3 class="shopping-cart__product-name">
                                ${selectProduct.name} ${selectProduct.memory} ${selectProduct.color}
                            </h3>
                            <p class="shopping-cart__product-id">
                                #${selectProduct.id}
                            </p>
                        </div>
                        <div class="shopping-cart__product-right">
                            <div class="shopping-cart__product-counter">
                                <button class="shopping-cart__product-counter-back">
                                    <img src="./img/shopping-cart/back-counter-icon.svg" alt="back counter">
                                </button>
                                <input type="text" class="shopping-cart__product-counter-value" value="1" disabled>
                                <button class="shopping-cart__product-counter-forward">
                                    <img src="./img/shopping-cart/forward-counter-icon.svg" alt="forward counter">
                                </button>
                            </div>

                            <span class="shopping-cart__product-price">$${selectProduct.price}</span>

                            <button class="shopping-cart__product-delete">
                                <img src="./img/shopping-cart/delete-product-icon.svg" alt="delete product">
                            </button>
                        </div>
                    </div>
                `;

                const inputCounter = div.querySelector('.shopping-cart__product-counter-value'); // Счетчик товара

                function changeTotalPrice() {
                    let subtotal = 0;

                    selectedProducts.forEach(product => {
                        if (product.id == div.dataset.id) {
                            product.subtotal = product.price * inputCounter.value;
                        };

                        subtotal += product.subtotal;
                    });

                    const subtotalHTML = document.getElementById('subtotal');
                    const totalHTML = document.getElementById('total');

                    subtotalHTML.textContent = `$${subtotal}`;
                    totalHTML.textContent = `$${subtotal + 50 + 29}`;
                }

                selectedProductsList.appendChild(div);

                // Удаление продукта из корзины
                const deleteProductBtn = div.querySelector('.shopping-cart__product-delete');
                deleteProductBtn.addEventListener('click', () => {
                    selectedProducts = selectedProducts.filter(product => JSON.stringify(product) !== JSON.stringify(selectProduct));
                    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
                    inputCounter.value = 0;
                    changeTotalPrice();
                    favoriteCards();
                });

                // Прибавить/Убавить количество товара
                const btnAdd = div.querySelector('.shopping-cart__product-counter-forward');
                const btnReduce = div.querySelector('.shopping-cart__product-counter-back');

                btnAdd.addEventListener('click', () => {
                    if (parseInt(inputCounter.value) < 50) {
                        inputCounter.value = parseInt(inputCounter.value) + 1;
                        if (inputCounter.value >= 10) {
                            inputCounter.style.maxWidth = '53px';
                        }
                        changeTotalPrice()
                    }
                });
                btnReduce.addEventListener('click', () => {
                    if (parseInt(inputCounter.value) > 1) {
                        inputCounter.value = parseInt(inputCounter.value) - 1;
                        if (inputCounter.value < 10) {
                            inputCounter.style.maxWidth = '42px';
                        }
                    } else if (parseInt(inputCounter.value) === 1) {
                        deleteProductBtn.click();
                    }
                    changeTotalPrice()
                });

                changeTotalPrice()
            });
        } else {
            selectedProductsList.style.gap = '4px';
            selectedProductsList.innerHTML = `
                <p class="shopping-cart__info-text">You haven't added any items to your cart yet.</p>
                <a href="index.html">Continue Shopping</a>
            `;
        };
    };

    favoriteCards();

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

    // Убираем красный кружок у иконки корзины если он имеется
    const allCartIcon = [...document.querySelectorAll('.header-actions__cart')];
    localStorage.setItem('badge', JSON.stringify(false));

    allCartIcon.forEach(icon => {
        icon.classList.remove('new');
    });
    // 
});