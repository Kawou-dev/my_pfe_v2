import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CourseSlider = ({ courses }) => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [progressData, setProgressData] = useState([]);

  const scrollToIndex = (i) => {
    const slider = sliderRef.current;
    const card = slider.children[0];
    const cardWidth = card.offsetWidth + 16;
    slider.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const newIndex = index === 0 ? courses.length - 1 : index - 1;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = index === courses.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const getPdfsProgress = async (courseId) => {
    try {
      const res = await fetch("/api/nbrePdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setProgressData((prev) => [
        ...prev,
        { courseId, done: data.done, total: data.total },
      ]);
    } catch (error) {
      console.log("Erreur de récupération du progrès PDF :", error.message);
    }
  };

  useEffect(() => {
    if (courses && courses.length > 0) {
      courses.forEach((course) => getPdfsProgress(course._id));
    }
  }, [courses]);

  const getProgressForCourse = (id) => {
    return progressData.find((item) => item.courseId === id) || { done: 0, total: 0 };
  };

  return (
    <div className="relative w-full">
 
      <button onClick={scrollLeft}
        className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-hidden space-x-4 px-8 transition-all duration-500 ease-in-out"
      >
        {courses?.map((course) => {
          const { done, total } = getProgressForCourse(course._id);
          const percent = total > 0 ? (done / total) * 100 : 0;

          return (
            <div
              key={course._id}
              className="w-72 flex-shrink-0 bg-white shadow rounded-lg p-4"
            >
              <p className="text-gray-700 mb-2 font-semibold">{course.title}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all   duration-500 ease-in-out  shadow-md  "  style={{ width: `${percent}%` }} ></div> </div>
                   <p className="text-sm text-gray-500 mt-1">
                {done}/{total} chapitres révisés
              </p>
            </div>
          );
        })}
      </div>

     
      <button onClick={scrollRight}
        className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CourseSlider;
