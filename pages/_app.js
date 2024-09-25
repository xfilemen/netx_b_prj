import './styles/reset.css';
import './styles/common.css';

function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps}/>
        </>
        
    );
}

export default App;