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
          <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4 px-2">Contáctame</h2>
            <p className="text-gray-800 px-2">
              Si tienes alguna pregunta o te gustaría trabajar conmigo, no dudes en contactarme utilizando el formulario a continuación.
            </p>
            <div className="mt-6">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfbcFyLtqiu13ohGUd-2OF2SG4vG3C5S8FtrPr4wfpsy1VWZA/viewform?embedded=true" width="100%" height="600px" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}