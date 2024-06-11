import React from 'react';
import { usePage } from "@inertiajs/react";
import Layout from './Layout';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

function formatDate(date) {
  return dayjs(date).format('D MMMM YYYY');
}

export default function Welcome() {
  const { posts } = usePage().props;

  return (
    <Layout>
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
                    <a href={`/posts/${post.id}`} className="font-large text-gray-900">
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{formatDate(post.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}