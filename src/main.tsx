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
import CreateSequence from './components/CreateSequence/CreateSequence';
// Styles
import './styles/index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={'Rien à afficher 404'}>
      <Route errorElement={'Rien à afficher 404'}>
        <Route index element={<App />} />
        <Route path="/create-sequence" element={<CreateSequence />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
