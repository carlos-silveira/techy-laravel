import React from 'react';
import Layout from './Layout';

export default function Post() {
  return (
    <Layout>
      <main>
        <section id="about">
          <div class="container mx-auto py-8">
            <h2 class="text-3xl font-bold mb-4">About Me</h2>
            <p class="text-gray-800">
              I'm Carlos Silveira, a Laravel developer with 5 years of experience. I'm passionate about building high-quality, scalable web applications. I'm also a big fan of playing videogames, watching tv shows with my wife, and spending time with my family.
            </p>
          </div>
        </section>

        <section id="skills">
          <div class="container mx-auto py-8">
            <h2 class="text-3xl font-bold mb-4">My Skills</h2>
            <ul class="list-disc mb-4">
              <li>Laravel</li>
              <li>PHP</li>
              <li>MySQL</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Unit testing</li>
              <li>Continuous integration</li>
              <li>Deployment</li>
              <li>Google Cloud</li>
              <li>AWS</li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>

  );
}