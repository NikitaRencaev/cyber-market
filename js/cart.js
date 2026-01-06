document.addEventListener('DOMContentLoaded', () => {
    let selectedProductsId = JSON.parse(localStorage.getItem('selectedProductsId')) || [];
    const selectedProductsList = document.getElementById('selectedProductsList');
    
    function favoriteCards() {
        selectedProductsList.innerHTML = '';
        let subtotal = 0;

        if (selectedProductsId.length > 0) {
            selectedProductsId.forEach(id => {
                const optionsProduct = id.split(', ');

                fetch('js/product-details.json')
                    .then(response => {
                        if (!response.ok) throw new Error('Файл не найден');
                        return response.json();
                    })
                .then(data => {
                    const selectedProduct = data[optionsProduct[0]];

                    if(!selectedProduct) {
                        console.error('Товар не найден!');
                        return;
                    }

                    const div = document.createElement('div');
                    div.classList.add('shopping-cart__product');
                    div.dataset.id = id[0];
                    div.innerHTML = `
                        <img src="${selectedProduct.colors[optionsProduct[1]][0]}" alt="Product photo" class="shopping-cart__product-img">

                        <div class="shopping-cart__product-content">
                            <div class="shopping-cart__product-info">
                                <h3 class="shopping-cart__product-name">
                                    ${selectedProduct.name} ${optionsProduct[1]}
                                </h3>
                                <p class="shopping-cart__product-id">
                                    #${selectedProduct.id}
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

                                <span class="shopping-cart__product-price">$${selectedProduct.price}</span>

                                <button class="shopping-cart__product-delete">
                                    <img src="./img/shopping-cart/delete-product-icon.svg" alt="delete product">
                                </button>
                            </div>
                        </div>
                    `;

                    subtotal += selectedProduct.price;

                    const subtotalHTML = document.getElementById('subtotal');
                    const totalHTML = document.getElementById('total');

                    subtotalHTML.textContent = `$${subtotal}`;
                    totalHTML.textContent = `$${subtotal + 50 + 29}`;

                    selectedProductsList.appendChild(div);

                    // Удаление продукта из корзины
                    const deleteProductBtn = div.querySelector('.shopping-cart__product-delete');
                    deleteProductBtn.addEventListener('click', () => {
                        selectedProductsId.forEach(idBlock => {
                            const idBlockArray = idBlock.split(', ');
                            if (idBlockArray.includes(div.dataset.id)) {
                                selectedProductsId = selectedProductsId.filter(id => id[0] !== idBlockArray[0]);
                                console.log(selectedProductsId);
                                console.log(idBlockArray);
                                localStorage.setItem('selectedProductsId', JSON.stringify(selectedProductsId));
                                selectedProductsList.removeChild(div);
                                favoriteCards();
                            }
                        });
                    });
                });
            });
        } else {
            selectedProductsList.innerHTML = `
                <p class="shopping-cart__info-text">You haven't added any items to your cart yet.</p>
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