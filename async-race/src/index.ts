import App from './components/app/App';
import BaseComponent from './components/common/BaseComponent/BaseComponent';
import './main.css';

const root = new BaseComponent('div').setAttribute('id', 'root').attachTo(document.body);

const app = new App(root);
app.start();
