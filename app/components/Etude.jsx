"use client";
import React, { useEffect, useState } from "react";
import { CiMenuKebab, CiCircleRemove } from "react-icons/ci";
import toast from "react-hot-toast";
import useCourse from "../hooks/useCourse";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

const Etude = () => {
  const [formData, setFormData] = useState({
    title: "",
    // notes: "",
  });

  const { fetchCourse, addCourse, courses, loading, deleteCourse } = useCourse();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleSubmit = async (formData) => {
    await addCourse(formData);
    setFormData({ title: "" });
    setIsOpenPopup(false); 
  };

  const handlePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse(courseId);
    console.log("CourseId----->", courseId);
  };

  return (
    <div className="text-xl relative">
      {/* Popup avec fond semi-transparent et fermeture */}
      {isOpenPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 relative">
            {/* Bouton de fermeture */}
            <button
              onClick={handlePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <CiCircleRemove size={24} />
            </button>

            <div className="p-6">
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Ajouter un cours</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Prenez des notes de vos cours !
                </p>
              </div>

              <div className="mb-4">
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Entrer le nom du module"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                />
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handlePopup}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleSubmit(formData)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute md:right-3 right-1 md:top-0 flex justify-end items-end w-20">
        <button
          onClick={handlePopup}
          className="border-blue-300 border-2 w-24 rounded cursor-pointer p-1 px-2  bg-blue-600 hover:bg-blue-800 text-white"
        >
          Ajouter
        </button>
      </div>

      <div className="mt-8 ml-10 pl-16 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div>
          <h1 className="text-2xl font-bold mb-1  ">Mes cours</h1>
          <p>Vu d'ensembles de mes cours</p>
        </div>
      </div>

      <section className="mt-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[80%] xl:w-[80%] mx-auto  pb-10 ">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des cours...</p>
        ) : (
          <div className="grid md:flex-wrap grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((course, index) => (
              <div
                key={index}
                className="border flex flex-col p-[2px] gap-2 pb-2 rounded-lg shadow-sm bg-gray-100"
              >
                <Link href={`/etudes/${course._id}`}>
                  <div className="bg-[#9a59c5] w-full h-24 rounded-t-lg"></div>
                </Link>
                <div className="pl-4">
                  <Link href={`/etudes/${course._id}`}>
                    <h2 className="font-semibold text-lg text-blue-700 hover:underline">
                      {course?.title}
                    </h2>
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <p className="pl-4 uppercase"> {course?.title}</p>
                  <div className="cursor-pointer" onClick={() => handleDeleteCourse(course._id)}>
                    <MdDelete className="opacity-100 text-red-400 " />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Etude;