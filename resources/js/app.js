import React from 'react';
import { createRoot } from 'react-dom/client';
import TopNav from './screens/TopNav';

function App() {
  const posts = [
    {
      id: 1,
      title: 'Mi primera publicación',
      author: 'Juan Pérez',
      date: '1 de enero de 2023',
      image:
        'https://images.unsplash.com/photo-1680122754388-16e4e226daa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in placerat libero. Sed sed varius ex. Duis gravida quis lorem id rhoncus. Sed bibendum turpis eget massa efficitur, quis rhoncus nibh tempor. Curabitur aliquam libero nec elementum consectetur. Integer ultrices posuere diam, vitae malesuada velit convallis eget.'
    }]
  return (
    <div className="bg-gray-100">
      <TopNav></TopNav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Últimas publicaciones
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Aquí encontrarás las últimas publicaciones de nuestro blog.
          </p>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-500">
                    <a href={`/posts/${post.id}`} className="font-medium text-gray-900">
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{post.date}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{post.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('app');
createRoot(rootElement).render(<App />);
