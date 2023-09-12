// Modules
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// Reducers & Stores
import store from './redux/store';
// Composants
import App from './components/App/App';
import Layout from './components/Layout/Layout';
// Styles
import './styles/index.css';
import CreateSequence from './components/CreateSequence/CreateSequence';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={'Rien à afficher 404'}>
      <Route errorElement={'Rien à afficher 404'}>
        <Route path="/" element={<App />} />
        <Route path="/sequence/:id" element={<CreateSequence />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
