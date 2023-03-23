class Tooltip {
  initialize () {
    this.initEventListeners()
  }

   static state;

   element;

   onPointerOver = event => {
    const element = event.target.closest ('[data-tooltip]');

      if (element){
        this.render(element.dataset.tooltip);
        document.addEventListener('pointermove', this.onPointerMove);
      }
    }

    onPointerMove = event => {
      this.moveTooltip (event);
    }

    onPointerOut = () => {
      this.remove();
      document.removeEventListener ('pointermove', this.onPointerMove)
    }
  
  constructor () {
    if (Tooltip.state){
      return Tooltip.state
    }

    Tooltip.state = this;
  }

  initEventListeners(){
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut)
  }

  moveTooltip (event){
    const magicNum = 5;
    const left = event.clientX + magicNum;
    const top = event.clientY + magicNum;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  render(html){
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;

    document.body.append (this.element);
  }
  
  remove (){
    if (this.element){
      this.element.remove();
    }
  }

  destroy(){
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointerover', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
