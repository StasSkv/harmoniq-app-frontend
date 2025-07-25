// import React from "react";
// import ReactDOM from "react-dom/client";

// import "modern-normalize";
// import "./styles/index.css";

// import App from "./components/App/App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/global/globalSelectors';
import Loader from '../Loader/Loader'; // шляхи можуть відрізнятися

const Main = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {isLoading && <Loader />}
      
      {/* Тут буде твій реальний вміст */}
      <h2>Це Main</h2>
    </main>
  );
};

export default Main;
