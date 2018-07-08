class Menu {
  constructor(menu, button) {
    if (!menu || !button) return;
    this.getElements(menu, button);
    this.events();
  }

  getElements(menu, button) {
    this.menu = menu;
    this.button = button;
    this.buttonImg = this.button.querySelector('img');
  }

  events() {
    this.button.addEventListener('click', this.openMenu.bind(this));
  }

  openMenu() {
    this.menu.classList.add('open');
    this.buttonImg.src = 'https://cdn.sstatic.net/Img/unified/sprites.svg?v=438582dc9e27';
  }
}

export default Menu;
