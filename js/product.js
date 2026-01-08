document.addEventListener('DOMContentLoaded', () => {
    // Скрытие и раскрытие описания товара
    const toggleBtn = document.getElementById('toggleBtn');
    const productInfo = document.getElementById('infoProduct');

    toggleBtn.addEventListener('click', () => {
        if (productInfo.classList.contains('active')) {
            productInfo.classList.remove('active');
            toggleBtn.textContent = 'more...';
        } else {
            productInfo.classList.add('active');
            toggleBtn.textContent = 'hide...';
        };
    });
    // 

    // Генерация страницы описания товара
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('ID товара не найден в URL');
        return;
    }

    // Загружаем JSON
        fetch('js/product-details.json')
            .then(response => {
                if (!response.ok) throw new Error('Файл не найден');
                return response.json();
            })
        .then(data => {
            const product = data[productId];

            if (!product) {
                console.error('Товар не найден');
                return;
            }

            // Выводим данные
            document.getElementById('breadcrumbsName').textContent = product.name;
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = '$' + product.price;
            document.getElementById('pastPrice').textContent = '$' + product.lastPrice;

            // Описание
            document.getElementById('infoProduct').textContent = product.description;
            document.getElementById('detailsInfo').textContent = product.detailsDescription;

            // Характеристики (блочные)
            document.getElementById('blockScreenSize').textContent = product.specs.screenSize;
            document.getElementById('blockCPU').textContent = product.specs.cpu;
            document.getElementById('blockCPUCores').textContent = product.specs.cpuCores;
            document.getElementById('blockMainCamera').textContent = product.specs.mainCamera;
            document.getElementById('blockFrontCamera').textContent = product.specs.frontCamera;
            document.getElementById('blockBatteryCapacity').textContent = product.specs.batteryCapacity;

            // Характеристики (в 'Details')
            document.getElementById('screenSize').textContent = product.specs.screenSize;
            document.getElementById('screenResolution').textContent = product.specs.screenResolution;
            document.getElementById('screenRefreshRate').textContent = product.specs.screenRefreshRate;
            document.getElementById('screenPixelDensity').textContent = product.specs.pixelDensity;
            document.getElementById('screenType').textContent = product.specs.screenType;
            document.getElementById('CPU').textContent = product.specs.cpu;
            document.getElementById('CPUCores').textContent = product.specs.cpuCores;

            document.getElementById('screenAdditionally').innerHTML = '';
            const screenAdditionally = product.specs.screenAdditionally;
            screenAdditionally.forEach(text => {
                document.getElementById('screenAdditionally').innerHTML += `${text},<br>`;
            });

            // Генерация кнопок оперативной памяти
            const productMemoryBtns = [...document.getElementById('productMemory').childNodes].filter(btn => btn.tagName === "BUTTON");
            const availableMemory = [...product.specs.memory];
            productMemoryBtns.forEach((btn) => {
                if (availableMemory.includes(btn.value)) {
                    btn.classList.remove('active');
                    btn.classList.remove('noactive');
                } else {
                    btn.classList.add('noactive');
                }
            });
            const activeMemoryButtons = productMemoryBtns.filter(btn => !btn.classList.contains('noactive'))
            activeMemoryButtons[0].classList.add('active');

            let currentMemory = activeMemoryButtons[0].value;
            product.currentMemory = currentMemory;
            
            activeMemoryButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!btn.classList.contains('active')) {
                        activeMemoryButtons.forEach(btn => btn.classList.remove('active'));
                        btn.classList.add('active');
                        currentMemory = btn.value;
                        product.currentMemory = currentMemory;
                    }
                });
            });

            // Генерация кнопок смены цвета
            const productColorBtns = [...document.getElementById('colorBtns').childNodes].filter(btn => btn.tagName === "BUTTON");
            const availableColors = [...Object.keys(product.colors)];
            console.log(availableColors);
            productColorBtns.forEach((btn) => {
                if (availableColors.includes(btn.value)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            const activeColorBtns = productColorBtns.filter(btn => btn.classList.contains('active'));
            let currentColor = activeColorBtns[0].value;
            product.currentColor = currentColor;

            activeColorBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (currentColor !== btn.value) {
                        currentColor = btn.value;
                        product.currentColor = currentColor;
                        changePhotos(currentColor);
                    };
                });
            });

            // Генерация фотографий
            function changePhotos(color) {
                const gallery = document.getElementById('productSwitchPhotos');
                gallery.innerHTML = '';
                product.colors[color].forEach(photoSrc => {
                    const img = document.createElement('img');
                    img.src = photoSrc;
                    img.alt = product.fullName;
                    gallery.appendChild(img);
                    img.addEventListener('click', () => {
                        if (img.classList.contains('active') == false) {
                            gallery.childNodes.forEach(img => img.classList.remove('active'));
                            img.classList.add('active');
                            changeCurrentPhoto(img);
                        }
                    });
                });

                const childsGallery = [...gallery.childNodes];
                if (!childsGallery[0].classList.contains('actiive')) {
                    childsGallery[0].classList.add('active');
                    changeCurrentPhoto(childsGallery[0]);
                }
            };

            function changeCurrentPhoto(activeImg) {
                const newSrc = activeImg.src.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                const productCurrentPhoto = document.getElementById('productCurrentPhoto');
                productCurrentPhoto.innerHTML = '';
                const imgNew = document.createElement('img');
                imgNew.alt = 'Show the phone in a large picture';
                imgNew.src = `${newSrc}-big.png`;
                productCurrentPhoto.appendChild(imgNew);
            }

            // Добавление товара в корзину
            const btnAddCard = document.getElementById('addCard');
            btnAddCard.addEventListener('click', () => {
                let favorites = JSON.parse(localStorage.getItem('selectedProducts')) || [];
                const selectProduct = { name: product.name, photo: product.colors[product.currentColor][0], color: product.currentColor, memory: product.currentMemory, price: product.price, id: product.id };

                function addToCart() {
                    favorites.push(selectProduct);
                    console.log(favorites);
                    localStorage.setItem('selectedProducts', JSON.stringify(favorites));
                    btnAddCard.textContent = 'Added to cart';
                    btnAddCard.classList.add('active');
                    console.log('Добавлен в корзину');

                    // Добавляем красный кружок у иконки корзины
                    localStorage.setItem('badge', JSON.stringify(true));
                    const allCartIcon = [...document.querySelectorAll('.header-actions__cart')];
                    allCartIcon.forEach(icon => {
                        icon.classList.add('new');
                    });
                    // 
                    setTimeout(() => {
                        btnAddCard.classList.remove('active');
                        btnAddCard.textContent = 'Add to Cart';
                    }, 1000);
                }

                if (favorites.length == 0) 
                    addToCart()
                else {
                    if (!favorites.some(product => JSON.stringify(product) === JSON.stringify(selectProduct))) {
                        addToCart();
                    } else {
                        console.log(selectProduct);
                        btnAddCard.textContent = 'Already in cart';
                        setTimeout(() => {
                            btnAddCard.textContent = 'Add to Cart';
                        }, 800);
                    }
                };

                console.log(favorites);
            });

            changePhotos(currentColor);
    }).catch(error => console.error('Ошибка загрузки JSON:', error));
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
    console.log(badge);

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