const productsBtn = document.querySelectorAll('.product-box__btn');
const cartProductList = document.querySelector('.products-box grid-box');
const cart = document.querySelector('.top-cart');
// console.log(cart);
const orderModalOpenProd = document.querySelector('.order-modal__open');
const orderModalList = document.querySelector('.order-modal__list');

let productArray = [];

// Задать классы для red-info
const redInfo = document.querySelectorAll('.red-info');
const redInfoLength = redInfo.length;

const cartQuantity = redInfo[0].classList.add('full-order');
const quantityCart = document.querySelector('.full-order');
let order = 0;

const fullPrice = redInfo[1].classList.add('full-price');
const priceFull = document.querySelector('.full-price')
let price = 0;

// задать класс для price
const productPrice = () => {
    let p = document.querySelectorAll('p');
    p.forEach(element => {
        element.classList.add('product-price');
    });
};
productPrice();

// Задать рандомно id для товара
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// удалить пробелы в цене
const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

// вернуть пробелы 
const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

// сложить всю сумму
const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

// показать сумму
const printFullPrice = () => {
    priceFull.textContent = `${normalPrice(price)} грн`;
};

// Сделать счетчик блюд в корзине
const printQuantity = () => {

    let length = document.querySelector('.list').children.length;
    quantityCart.textContent = `${length} шт`;

};

const generateCartProduct = (img, title, price, id, number) => {
    return `
		<div class="product-box__item" data-id="${id}">
                    <h3 class="product-box__title">${title}</h3>
                    <div class="product-box__img">
                        <img class="img-fluid" src="${img}">
                    </div>
                    <div class="product-box__meta">
                        <p>${normalPrice(price)}</p>
                        <div class="qty">
                            <input class="qty__item" type="number"> Кол
                        </div>
                        <button class="product-box__btn">Добавить</button>

                    </div>
        </div>
	`;
};

productsBtn.forEach(element => {
    element.closest('.product-box__item').setAttribute('data-id', randomId());

    element.addEventListener('click', (element) => {
        let self = element.currentTarget;
        let parent = self.closest('.product-box__item');
        let id = parent.dataset.id;
        console.log(id);
        let img = parent.querySelector('.img-fluid').getAttribute('src');
        let title = parent.querySelector('.product-box__title');
        let qty = parent.querySelector('.qty__item').getAttribute('type');

        let priceString = parent.querySelector('.product-price').textContent;
        console.log(priceString);

        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price').textContent));
        // console.log(priceNumber);

        plusFullPrice(priceNumber);
        console.log(price);

        printFullPrice();

        document.querySelector('.full-order').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));

        printQuantity()

        self.disabled = true;

    });
});

const generateModalProduct = (img, title, price, id, number) => {
    return `
                <li class="order-modal__item" data-id="${id}">
                  <article class="order-product">
                    <img src="${img}" class="order-product__img" />
                    <div class="order-product__text">
                      <h3 class="order-product__title">${title}</h3>
                      <span class="order-product__price">${normalPrice(price)}</span>
                    </div>
                    <button class="order-product__delete">Удалить</button>
                  </article>
                </li>
	`;
};

let flag = 0;

orderModalOpenProd.addEventListener('click', (e) => {
	if (flag == 0) {
		orderModalOpenProd.classList.add('open');
		orderModalList.style.display = 'block';
		flag = 1;
	} else {
		orderModalOpenProd.classList.remove('open');
		orderModalList.style.display = 'none';
		flag = 0;
	}
});

const modal = new GraphModal({
    isOpen: (modal) => {
        // console.log('opened');
        let array = document.querySelector('.list').children;
        let fullprice = priceFull.textContent;
        let length = array.length;

        document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
        // console.log(document.querySelector('.list').children);
        for (item of array) {
            console.log(item);
             
            let title = document.querySelector('.product-box__title').textContent;
            console.log(title);
            let img = item.querySelector('.img-fluid').getAttribute('src');
            console.log(img);
            let priceNumber = parseInt(priceWithoutSpaces(item.querySelector('.product-price').textContent));
            console.log(price);
            let id = document.querySelector('.list').dataset.id;
            console.log(id);

            orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceNumber, id));
        
            let obj = {};
            obj.title = title;
            obj.price = priceNumber;
            productArray.push(obj);
        }
        console.log(productArray);
        	},
	isClose: () => {
		// console.log('closed');
	}
});

document.querySelector('.order').addEventListener('submit', (e) => {
    let self = e.currentTarget;
    let formData = new FormData();
    let name = self.querySelector('[name="Имя"]').value;
    let  tel = self.querySelector('[name="Телефон"]').value;
    let  mail = self.querySelector('[name="Email"]').value;
    formData.append('Товары', JSON.stringify(productArray));
    formData.append('Имя', name);
    formData.append('Телефон', tel);
    formData.append('Email', mail);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.stats === 200) {
            }
        }
    }

if( name == '') {
    alert('Поле имя не заполнено');
    }
    if (mail == '') {
    alert('Поле email не заполнено');
    
    }
    if ( tel == '') {
    alert('Поле телефон не заполнено');
        return;
  }

    xhr.open(alert(`${[name]} Благодарим за покупку!!!Вам перезвонят`));
    xhr.send(formData);

    self.reset();
});

let filterSelect = document.querySelector('#filter');
let filterSelectPrice = document.querySelector('#filter-price');
let items = document.querySelector('#items');

filterSelect.onchange = function () {
    console.log(this.value);
    let itemsList = items.querySelectorAll('.list');

    for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].classList.contains(this.value)) {
    	itemsList[i].style.display = 'block';
    } else {
    	itemsList[i].style.display = 'none';
    }
  }
};

filterSelectPrice.onchange = function () {
    console.log(this.value);
    let itemsList = items.querySelectorAll('.price');

    for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].classList.contains(this.value)) {
    	itemsList[i].style.display = 'block';
    } else {
    	itemsList[i].style.display = 'none';
    }
  }
};