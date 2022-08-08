import App from './components/app/App';
import BaseComponent from './components/common/BaseComponent/BaseComponent';
import './main.css';

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-alert
  alert(`Привет. Прошу, не забудь включить/перезагрузить сервер перед проверкой. Спасибо!`);
});

const root = new BaseComponent('div').setAttribute('id', 'root').attachTo(document.body);

const app = new App(root);
app.start();
