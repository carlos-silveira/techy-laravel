require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-3xl md:text-5xl text-center font-bold mb-6 text-gray-900">
            Welcome to Techy!
          </h1>
          <p className="text-lg text-center mb-12 text-gray-700">
            A modern web application built with React and Laravel
          </p>
          <div className="flex items-center justify-center">
          </div>
        </div>
      );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);