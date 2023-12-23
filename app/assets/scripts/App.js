import '../styles/styles.css';
import 'lazysizes';
import './modules/chat.js';
import './modules/sidebar.js';
import './modules/dataFetcher.js';
// import './modules/filter.js';
import './session_ram/app.mjs';
if(module.hot) {
    module.hot.accept();
}
