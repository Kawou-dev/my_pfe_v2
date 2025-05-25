import React from 'react'
import NavBar from '../portfolio/NavBar'
import Footer from './Footer'

const Confidentialite = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Politique de confidentialité</h1>

        <section>
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Nous attachons une grande importance à la confidentialité de vos données. Cette politique explique
            comment les informations que vous fournissez dans le cadre de l’utilisation de notre application sont
            collectées, utilisées et protégées.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Données collectées</h2>
          <p>
            Nous collectons les données suivantes : nom, email, mot de passe (crypté), tâches planifiées (to-do, vacances, études).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Utilisation des données</h2>
          <p>
            Vos données sont utilisées pour gérer votre compte, stocker vos plannings, améliorer l’application
            et, si vous le souhaitez, recevoir des rappels ou notifications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Sécurité</h2>
          <p>
            Nous mettons en place des mesures de sécurité comme le hachage des mots de passe, le chiffrement des données
            et des systèmes de protection contre les accès non autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Vos droits</h2>
          <p>
            Conformément à la loi, vous avez le droit d’accéder à vos données, de les modifier, de les supprimer
            ou de demander leur portabilité. Contactez-nous à : <strong>levieux426@gmail.com</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Cookies</h2>
          <p>
            Nous utilisons des cookies pour vous offrir une meilleure expérience. Vous pouvez configurer votre navigateur
            pour les refuser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Modification</h2>
          <p>
            Cette politique peut être mise à jour à tout moment. Toute modification importante sera communiquée via
            l’application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Contact</h2>
          <p>
            Pour toute question, contactez-nous à : <strong>levieux426@gmail.com</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Confidentialite
