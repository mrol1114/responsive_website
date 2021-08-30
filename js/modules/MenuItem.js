class MenuItem {

    constructor(parent, imageSrc, imageAlt, header, description, price) {
        this.parent = parent;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.header = header;
        this.description = description;
        this.price = price;
    }

    initializeStructure() {
        this.itemContainer = document.createElement('div');
        this.itemImage = document.createElement('img');
        this.itemDescription = document.createElement('div');
        this.itemDivider = document.createElement('div');
        this.itemPrice = document.createElement('div');
        this.itemCost = document.createElement('div');
        this.itemCostTotal = document.createElement('div');
        this.itemHeader = document.createElement('h3');
        this.itemCostTotalSpan = document.createElement('span');
        this.itemCostTotalParagraph = document.createElement('p');

        this.itemContainer.appendChild(this.itemImage);
        this.itemContainer.appendChild(this.itemHeader);
        this.itemContainer.appendChild(this.itemDescription);
        this.itemContainer.appendChild(this.itemDivider);
        this.itemContainer.appendChild(this.itemPrice);
        this.itemPrice.appendChild(this.itemCost);
        this.itemPrice.appendChild(this.itemCostTotal);
        this.itemCostTotal.append(this.itemCostTotalSpan);
        this.itemCostTotal.append(this.itemCostTotalParagraph);
    }

    applyClassesToStructure() {
        this.itemContainer.classList.add('menu__item');
        this.itemHeader.classList.add('menu__item-subtitle');
        this.itemDescription.classList.add('menu__item-descr');
        this.itemDivider.classList.add('menu__item-divider');
        this.itemPrice.classList.add('menu__item-price');
        this.itemCost.classList.add('menu__item-cost');
        this.itemCostTotal.classList.add('menu__item-total');
        this.itemCostTotalParagraph.style.cssText = `
            display: inline;
            margin-left: 5px;
        `;
        this.itemContainer.style.cssText = `
            height: 100%;
        `;
    }

    fillStructure() {
        this.itemImage.src = this.imageSrc;
        this.itemImage.alt = this.imageAlt;
        this.itemHeader.textContent = this.header;
        this.itemDescription.textContent = this.description;
        this.itemCost.textContent = 'Цена:';
        this.itemCostTotalSpan.textContent = this.price;
        this.itemCostTotalParagraph.textContent = 'грн/день';
    }

    displayStructure() {
        const itemParent = document.querySelector(this.parent);
        const container = itemParent.querySelector('.container');
        container.appendChild(this.itemContainer);
    }

}

export default MenuItem;