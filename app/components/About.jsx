import React from 'react'
import NavBar from '../portfolio/NavBar'
import Footer from './Footer'

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow max-w-4xl mx-auto p-6 space-y-5">
        <h1 className="text-3xl font-bold text-center mb-8">À propos de nous</h1>

        <section>
          <h2 className="text-xl font-semibold">Notre mission</h2>
          <p>
            Notre application de planification a pour objectif d’aider chacun à mieux organiser son quotidien :
            que ce soit pour gérer ses tâches, planifier des vacances ou suivre ses objectifs d’études.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Pourquoi cette application ?</h2>
          <p>
            Nous avons créé cette plateforme pour proposer une solution simple, rapide et intuitive, afin de
            rester concentré sur ce qui compte vraiment. Nous croyons que chaque personne mérite des outils
            modernes pour gagner du temps et rester motivée.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Nos valeurs</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li> Simplicité d’utilisation</li>
            <li>Respect de la vie privée</li>
            <li>Amélioration continue</li>
            <li>Écoute de nos utilisateurs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Qui sommes-nous ?</h2>
          <p>
            Nous sommes deux etudiants passionnéss de technologie et de productivité. Notre but est de créer
            des outils accessibles à tous, utiles au quotidien et qui apportent une réelle valeur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>
            Une question, une idée ou un retour ? Écris-nous à : <strong>levieux426@gmail.com</strong>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
