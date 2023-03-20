export default class SortableTable {
  element
  subElements = {};
    
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render()

  }

  get template() {
    return /*html*/`
    <div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.getHeaderConfig()}
    </div>
      <div data-element="body" class="sortable-table__body">
      ${this.getProducts(this.data)}
      </div>
    </div>`
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);

  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  getHeaderConfig(){
    return this.headerConfig.map(item =>{
      return /*html*/`
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>`
    }).join('');
  }

  getProducts(data = []){
  return data.map(item => {
     return /*html*/`
      <a href="{/products/${item.id}}" class="sortable-table__row">
      <div class="sortable-table__cell">
        <img class="sortable-table-image" alt="Image" src="${item.images[0].url}">
      </div>
      <div class="sortable-table__cell">${item.title}</div>
  
      <div class="sortable-table__cell">${item.quantity}</div>
      <div class="sortable-table__cell">${item.price}</div>
      <div class="sortable-table__cell">${item.sales}</div>
    </a>`
  }).join('');
  };

  getField(){
    const field = document.getElementById('field');
    const value = field.value;
    console.log(value)

    return value
  }

  getOrder(){
    const order = document.getElementById('order');
    const value = order.value;
    console.log(value)

    return value
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        throw new Error(`Unknown type ${sortType}`);
      }
    });
  }


  sort(field, order){
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getProducts(sortedData);
  }

  remove () {
    if (this.element) {
      this.element.remove();
    };
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}