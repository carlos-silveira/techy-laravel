import React, { useState } from 'react';
import Layout from './Layout';
import { FaLinkedin } from 'react-icons/fa';

export default function AboutUs() {
  const [language, setLanguage] = useState('es');

  const handleLanguageChange = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  // Define content in English and Spanish
  const content = {
    es: {
      intro: 'Acerca de mi: Mi nombre es Carlos Silveira y soy un apasionado desarrollador de software con enfoque en Laravel y React. Con más de cinco años de experiencia profesional, he tenido la oportunidad de trabajar en diversos proyectos y perfeccionar mis habilidades en desarrollo web.',
      experience: [
        {
          company: 'Buscabot',
          role: 'Gerente de Producto, Líder Técnico, Ingeniero de Software Senior',
          description: 'En Buscabot, lideré un equipo responsable de construir características e flujos de trabajo innovadores utilizando Laravel, React, Tailwind CSS y MySQL dentro del entorno de Google Cloud Platform. Traduje los requisitos del cliente en especificaciones técnicas, resolví problemas de la plataforma e implementé mejoras continuas utilizando metodologías de Desarrollo Guiado por Pruebas (TDD) y SCRUM.',
          logo: 'https://buscabot.com/img/pwa-assets/icons/rounded-logo/icon_512x512.png',
        },
        {
          company: 'Justia',
          role: 'Ingeniero de Software',
          description: 'En Justia, desarrollé analizadores de Laravel para sitios web legales del gobierno de los Estados Unidos y gestioné campañas de marketing por correo electrónico utilizando plataformas como Mailchimp y Active Campaign. Realicé revisiones de código y depuración, asegurando el buen funcionamiento de los sitios de directorio de experiencia legal.',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJrXMqC03DZxETeCErx5q4dWad1xI5nZ2WLQ&s',
        }
      ],
      education: {
        degree: 'Licenciatura en Ingeniería de Sistemas Computacionales',
        institution: 'Instituto Tecnológico Superior de Nuevo Casas Grandes (ITSNCG)',
        average: 'Con un promedio de calificaciones de 93.04.',
        logo: 'http://www.itsncg.edu.mx/images/logo.png',
      },
      certifications: [
        'Certificado de Inglés EF SET C1 Avanzado',
        'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS',
        'Certificación Laravel OpenBootcamp',
      ],
      linkedin: 'Conéctate conmigo en LinkedIn',
    },
    en: {
      intro: "About me: My name is Carlos Silveira, and I'm a passionate software developer with a focus on Laravel and React. With over five years of professional experience, I've had the opportunity to work on various projects and hone my skills in web development.",
      experience: [
        {
          company: 'Buscabot',
          role: 'Product Manager, Tech Lead, Senior Software Engineer',
          description: "At Buscabot, I led a team responsible for building innovative features and workflows using Laravel, React, Tailwind CSS, and MySQL within the Google Cloud Platform environment. I translated customer requirements into technical specifications, resolved platform issues, and implemented continuous improvements using Test-Driven Development (TDD) and SCRUM methodologies.",
          logo: 'https://buscabot.com/img/pwa-assets/icons/rounded-logo/icon_512x512.png',
        },
        {
          company: 'Justia',
          role: 'Software Engineer',
          description: "At Justia, I developed Laravel parsers for US government legal websites and managed email marketing campaigns using platforms like Mailchimp and Active Campaign. I conducted code reviews and debugging, ensuring the smooth functioning of legal expertise directory sites.",
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJrXMqC03DZxETeCErx5q4dWad1xI5nZ2WLQ&s',
        }
      ],
      education: {
        degree: 'Bachelor\'s Degree in Computer Systems Engineering',
        institution: 'Instituto Tecnológico Superior de Nuevo Casas Grandes (ITSNCG)',
        average: 'With an average GPA of 93.04.',
        logo: 'http://www.itsncg.edu.mx/images/logo.png',
      },
      certifications: [
        'EF SET English Certificate C1 Advanced',
        'Master en JavaScript',
        'Laravel OpenBootcamp Certification',
      ],
      linkedin: 'Connect with me on LinkedIn',
    },
  };

  return (
    <Layout>
      <main>
        <section id="intro" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handleLanguageChange}
              >
                {language === 'es' ? 'English' : 'Español'}
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-4">{content[language].intro}</h2>
            <div className="flex items-center mt-8">
              <a href="https://www.linkedin.com/in/carlos-silveira-hinojos/" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md flex items-center hover:bg-blue-600 transition duration-300">
                <FaLinkedin className="mr-2" />
                {content[language].linkedin}
              </a>
            </div>
          </div>
        </section>
        <section id="experience" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{language === 'es' ? 'Experiencia' : 'Experience'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content[language].experience.map((exp, index) => (
                <div key={index} className="border p-6 rounded-md shadow-md">
                  <img src={exp.logo} alt={`Logo de ${exp.company}`} className="mb-4 w-8 h-8" />
                  <h3 className="text-xl font-semibold mb-2">{exp.company}</h3>
                  <p className="text-gray-800 mb-4">{exp.role}</p>
                  <p className="text-gray-800">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id
="education-certifications" className="bg-gray-100 py-16">
<div className="container mx-auto px-4">
  <h2 className="text-3xl font-bold mb-4">{language === 'es' ? 'Educación y Certificaciones' : 'Education & Certifications'}</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="border p-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">{language === 'es' ? 'Educación' : 'Education'}</h3>
      <p className="text-gray-800 mb-4">{content[language].education.degree}</p>
      <img src={content[language].education.logo} alt="Logo de ITSNCG"/>
      <p className="mt-4 text-gray-800">{content[language].education.institution}</p>
      <p className="mt-2 text-gray-800">{content[language].education.average}</p>
    </div>
    <div className="border p-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">{language === 'es' ? 'Certificaciones' : 'Certifications'}</h3>
      <ul className="list-disc text-gray-800 pl-6">
        {content[language].certifications.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </div>
  </div>
</div>
</section>
</main>
</Layout>
);
}
