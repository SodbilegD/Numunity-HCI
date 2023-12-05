import '../styles/styles.css';
import 'lazysizes';
import './modules/chat.js';
import './modules/sidebar.js';
import './modules/dataFetcher.js';

//import './modules/post-item.js';
import './modules/render.js';
if(module.hot) {
    module.hot.accept();
}
