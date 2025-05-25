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
          <div>
             <div role="status">
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span className="sr-only">Loading...</span>
              </div>
          </div>
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