import '../css/style.css';

import app from './app';
import Menu from './Menu';

app();
const menu = () => new Menu(
  document.querySelector('.c-menu'),
  document.querySelector('.c-menuBtn'),
);
menu();
