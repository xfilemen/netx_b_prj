import './styles/reset.css';
import Index from './index';

function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps}/>
        </>
        
    );
}

export default App;