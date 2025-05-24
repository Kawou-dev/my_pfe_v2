"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import useSignup from '../hooks/useSignup';



const RegisterForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading , signup} = useSignup() ; 



 

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(data);
    await signup(data)

      
  };

  return (
    <div className=''>
      <section className="bg-gray-300 dark:bg-gray-900 py-4 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Créer un compte
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nom d'utilisateur
                  </label>
                  <input
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    type="text"
                    placeholder="Entrer votre nom"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Adresse e-mail
                  </label>
                  <input
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    type="email"
                    placeholder="Entrer votre email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mot de passe
                  </label>
                  <input
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Confirmer le mot de passe
                  </label>
                  <input
                    value={data.confirmPassword}
                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    
                  />
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={data.gender === "male"}
                      onChange={() => setData({...data , gender : "male"})}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                     Homme
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={data.gender === "female"}
                      onChange={() => setData({...data , gender : "female"})}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                     Femme
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    S'inscrire
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500">
                   Connectez-vous ici
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
