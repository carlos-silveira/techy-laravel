import React from 'react';
import { usePage } from "@inertiajs/react";
import Layout from './Layout';

export default function Post() {
  const { post } = usePage().props;
  console.log(post)
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Blog post title */}
        <h1 className="text-3xl font-extrabold text-gray-900">{post.title}</h1>

        <div className="aspect-w-3 mt-5 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
          />
        </div>
        {/* Blog post content */}
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {/* Blog post metadata */}
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            {/* Blog post author avatar */}
            <img className="h-10 w-10 rounded-full" src="/img/avatars/1.jpg" alt="Author name" />
          </div>
          <div className="ml-3">
            {/* Blog post author name */}
            <div className="text-sm font-medium text-gray-900">{post.author}</div>
            {/* Blog post publish date */}
            <div className="text-sm text-gray-500">{post.date}</div>
          </div>
        </div>
      </div>
    </Layout>

  );
}