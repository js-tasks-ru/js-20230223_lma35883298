import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {

  element;
  subElements = {};
  data = [];
  loading = false;
  step = 20;
  start = 1;
  end = this.start + this.step;

  onWindowScroll = async() =>{
    const {bottom} = this.element.getBoundingClientRect();
    const {id, order} = this.sorted;

    if (bottom < document.documentElement.clientHeight && !this.loading && !this.isSortLocally){
      this.start = this.end;
      this.end = this.start + this.step;
      
      this.element.classList.add('sortable-table_loading');

      this.loading = true;

      const data = await this.loadData(id, order, this.start, this.end);
      
      this.update(data);

      this.element.classList.remove('sortable-table_loading')
      this.loading = false;

    }
  }

  onSortClick = event =>{
    const column = event.target.closest('[data-sortable = "true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };
    return orders[order];
    };

    if (column){
      const {id, order} = column.dataset;
      const newOrder = toggleOrder (order);
      this.sorted = {
        id,
        order: newOrder
      };

      column.dataset.order = newOrder;
      column.append(this.subElements.arrow);

      if (this.isSortLocally) {
        this.sortOnClient(id, newOrder);
      } else {
        this.sortOnServer(id, newOrder);
      }
    };
  }

 constructor(headersConfig = [], {
    url = '',
    sorted = {
      id: headersConfig.find(item => item.sortable).id,
      order: 'asc'
    },
    isSortLocally = false,
    step = 20,
    start = 1,
    end = start + step, 
  } = {}) {
    this.headersConfig = headersConfig;
    this.url = new URL (url, BACKEND_URL);
    
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;
    this.step = step;
    this.start = start;
    this.end = end;
    
    this.render();
  }

  async loadData (id, order, start = this.start, end = this.end, ){
    this.url.searchParams.set('_sort', id);
    this.url.searchParams.set('_order', order);
    this.url.searchParams.set('_start', start);
    this.url.searchParams.set('_end', end);

    const data = await fetchJson (this.url);

    return data
  }

  getTableHeader(){
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headersConfig.map(item => this.getHeaderConfig(item)).join('')}
      </div>`;
  }

  getHeaderConfig ({title, sortable, id}){
    const order = this.sorted.id === id ? this.sorted.order:'asc';

    return /*html*/`
    <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}" >
      <span>${title}</span>
      ${this.getHeaderSortingArrow(id)}
    </div>`;    
  }

  getHeaderSortingArrow(id){
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? /*html*/`
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`
      : '';
  }

  getTableRows(data){
    return data.map((item) => {
      return /*html*/`
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}
        </a>`  
    }).join('');
    
  }

  getTableRow(item){
    const cells = this.headersConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  template(data){
    return /*html*/`
    <div class="sortable-table">
      ${this.getTableHeader()}
        <div data-element="body" class="sortable-table__body">
          ${this.getTableRows(data)}
        </div>
    </div>`
  }

  async render(){
    const {id, order} = this.sorted;
    const wrapper = document.createElement('div');
    const sortedData = this.sortData (id, order);

    wrapper.innerHTML = this.template(sortedData);

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    
    const data = await this.loadData(id, order, this.start, this.end);

    this.initEventListener()
    this.renderRows(data);
  }


  renderRows(data) {
    if (data.length) {
      this.element.classList.remove('sortable-table_empty');
      this.addRows(data);
    } else {
      this.element.classList.add('sortable-table_empty');
    }
  }

    addRows(data) {
    this.data = data;

    this.subElements.body.innerHTML = this.getTableRows(data);
  }

  initEventListener(){
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);

    window.addEventListener('scroll', this.onWindowScroll)
  }

  getSubElements(element){
    const result = {};
    const elements = element.querySelectorAll('[data-element]');
    for (const subElement of elements){
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result
  }
  
  sortData(field, order){
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id === field);
    
    const directions = {
      asc: 1,
      desc: -1,
    };

    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (column.sortType){
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      };
    });
  }

  sort(field, order){
    const sortedData = sortData (field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id = '${field}']`);

    allColumns.forEach (column => {
      column.dataset.order = '';
    })

    currentColumn.dataset.order = order;
    this.subElements.body.innerHTML = this.getTableRows(sortedData)
  }


  sortOnClient(id, order) {
    const sortedData = this.sortData(id, order);

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  async sortOnServer(id, order) {
    const start = 1;
    const end = start + this.step;
    const data = await this.loadData(id, order, start, end);

    this.renderRows(data);
  }

  update(data) {
    const rows = document.createElement('div');

    this.data = [...this.data, ...data];
    rows.innerHTML = this.getTableRows(data);

    this.subElements.body.append(...rows.childNodes);
  }

}
