export default class ColumnChart {
    subElements = {};
    chartHeight = 50;

    constructor ({
        data = [], 
        label = '', 
        link = '', 
        value = 0, 
        formatHeading = val => val} = {}){

        this.data = data;
        this.label = label;
        this.link = link;
        this.value = formatHeading (value);

        this.render();
        }
    
    get template (){
        return /*html*/`
        <div class="column-chart column-chart_loading" style="--chart-height: ${ this.chartHeight }">
            <div class="column-chart__title">
                Total ${this.label}
                <a href="${this.link}" class="column-chart__link">View all</a>
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                    ${this.value}
                </div>
                <div data-element="body" class="column-chart__chart">
                ${this.getColumnHeight()}
                </div>
            </div>
        </div>
        `
    }

    getColumnHeight() {
        const maxValue = Math.max(...this.data);
        const scale = this.chartHeight / maxValue;
      
        return this.data.map(item => {
            const percent = ((item / maxValue) * 100).toFixed(0);
            return  `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}"></div>`
        }).join('');
      }

    render(){
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.template;

        this.element = wrapper.firstElementChild;
        
        if (this.data.length){
            this.element.classList.remove("column-chart_loading");
        }

        this.subElements = this.getSubElements();
    }

    getSubElements(){
        const result = {};
        const elements = this.element.querySelectorAll("[data-element]");

        for (const item of elements){
            const name = item.dataset.element;
            result[name] = item;
        }
    }

    update (data = []){
        if (!data.length){
            this.element.classList.add("column-chart_loading");
        }

        this.data = data;
        this.subElements.body.innerHTML = this.getColumnHeight();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.element = {};
        this.subElements = {}
    }
}
