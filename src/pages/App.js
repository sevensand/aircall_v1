// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import Header from './Header.jsx';
//
// const App = () => {
//   return (
//     <div className='container'>
//       <Header/>
//       <div className="container-view">Some activities should be here</div>
//     </div>
//   );
// };
//
// ReactDOM.render(<App/>, document.getElementById('app'));
//
// export default App;

import React from "react";
import AppRouter from "../routes";

import "antd/dist/antd.min.css";
import '../css/body.css';
import '../css/app.css';
import '../css/header.css';

const App = () => {
    return (
      <div className='container'>
        <AppRouter />
      </div>
    )

}

export default App;
