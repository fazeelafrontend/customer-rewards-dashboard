import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { APP_TITLE } from './constants/appConstants';
import './styles/app.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app" id="app-root">
        {/* Global navigation header */}
        <header className="app-header" id="app-header">
          <div className="app-header-inner">
            <Link to="/" className="app-logo">
              <span className="app-logo-icon">🏆</span>
              <h1 className="app-header-title">{APP_TITLE}</h1>
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="app-main">
          <AppRoutes />
        </main>

        {/* Footer */}
        <footer className="app-footer" id="app-footer">
          <p className="app-footer-text">
            {APP_TITLE}
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
