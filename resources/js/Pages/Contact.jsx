import React from 'react';
import { usePage } from "@inertiajs/react";
import TopNav from './TopNav';
import Footer from './Footer';
import Layout from './Layout';

export default function Post() {
  const { post } = usePage().props;
  return (
    <Layout>
      <main>
        <section id="contact">
          <div class="container mx-auto py-8">
            <h2 class="text-3xl font-bold mb-4">Contact Me</h2>
            <p class="text-gray-800">
              If you have any questions or would like to work with me, please feel free to contact me using the form below.
            </p>
            <div class="mt-6">
              <iframe src="https://forms.gle/d9gdnhhiaLCYsj4J8?embedded=true" width="100%" height="600px"></iframe>
            </div>
          </div>
        </section>
      </main>
    </Layout>

  );
}