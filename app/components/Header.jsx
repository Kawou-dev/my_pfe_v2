"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md"; 
import { MdLogout } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Image from "next/image";
import useTicket from "../hooks/useTicket";

const Header = () => {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const accountRef = useRef(null);
  const searchRef = useRef(null);

  
  const toggleSearchInput = () => {
    
    setIsSearchOpen(!isSearchOpen); 
    console.log(isSearchOpen) ; 
  };

  const opVsAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const targetHref = session?.user?.isAdmin ? "/admin" : "/reponses";

  const {getNbreUnread , nbreUnread, markAsSeen} = useTicket() ; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false); 
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); 
  }, []);

  useEffect(()=> {
    getNbreUnread(); 
  }, [getNbreUnread])

  const handleReadNotif = async() => {
    await markAsSeen(); 
  }

  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState({
    todos: [],
    etudes: [],
    vacances: []
  });

  const fetchAllData = async() => {
    setLoadingData(true) ; 
    try {
      const resTodos = await fetch('/api/todo');
      const resEtudes = await fetch('/api/course');
      const resVacances = await fetch('/api/vacance');

      const todos = await resTodos.json();
      const etudes = await resEtudes.json();
      const vacances = await resVacances.json();

      setData({ todos, etudes, vacances });
    } catch (error) {
      console.error('Erreur de chargement :', error);
    }finally{
       setLoadingData(false) ; 
    }
  }

  useEffect(() => {
    fetchAllData(); 
  }, [])

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fonction de recherche en temps réel
 
  const handleSearch = (e) => {
  const value = e.target.value;
  setSearch(value);

  if (value.length > 0) {
    const results = [];

    // Recherche dans les todos
    data.todos.todos.forEach(todo => {
      if (todo.title.toLowerCase().includes(value.toLowerCase())) {
        results.push({
          type: 'Todo',
          item: todo
        });
      }
    });

    // Recherche dans les cours (études)
    data.etudes.courses.forEach(course => {
      if (course.title.toLowerCase().includes(value.toLowerCase())) {
        results.push({
          type: 'Etude',
          item: course
        });
      }
    });

    // Recherche dans les vacances
    data.vacances.vacances.forEach(vacance => {
      if (vacance.cityName.toLowerCase().includes(value.toLowerCase()) 
        // vacance.experience.toLowerCase().includes(value.toLowerCase())
      ) {
        results.push({
          type: 'Vacance',
          item: vacance
        });
      }
    });

    setSearchResults(results);
  } else {
    setSearchResults([]);
  }
  };

  const handeSubmit = (e) =>{
    e.preventDefault() ;
  }




// console.log('Data ----->' , data) ; 

  return (
    <div className="flex justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
      <div className="ml-10 text-xl md:hidden flex items-center">
        <h1>TabzimLy</h1>
      </div>



                {/* input big device */}
      <div className="flex items-center" ref={searchRef}>
        {!isSearchOpen && (
          <form onSubmit={handeSubmit}
           className="hidden md:flex relative flex-col">
            <div className="relative">
              <input 
                value={search} 
                onChange={handleSearch}
                className="border-2 rounded-full pl-3 p-[2px] w-[450px]"
                type="text"
                placeholder={` ${loadingData ? 'Dans un instant...' : 'Rechercher...'}   `}
              />
              <button
                className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
                type="submit"
              >
                <CiSearch />
              </button>
            </div>
            
            {/* Résultats de recherche */}
         
            {search.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Link 
                      key={index} 
                      href={
                        result.type === 'Todo' 
                          ? `/todo` 
                          : result.type === 'Etude' 
                          ? `/etudes/${result.item._id}` 
                          : `/vacances`
                        //    href={
                        // result.type === 'Todo' 
                        //   ? `/todos/${result.item._id}` 
                        //   : result.type === 'Etude' 
                        //   ? `/courses/${result.item._id}` 
                        //   : `/vacances/${result.item._id}`
                      }
                    >
                      <div className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                        <div className="font-medium">{result.item.title}</div>
                        <div className="font-medium">{result.item.cityName}</div>
                        <div className="text-xs text-gray-500 capitalize"> {result.type}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
                )}
              </div>
            )}

          </form>
        )}

        {isMobileSearchOpen && (
  <form  onSubmit={handeSubmit}
  className="flex relative flex-col md:hidden">
    <div className="flex items-center">
      <button
        type="button"
        className="mr-0.5 text-xl cursor-pointer"
        onClick={() => setIsMobileSearchOpen(false)} 
      >
        <MdArrowBack />
      </button>
      <input
        value={search}
        onChange={handleSearch}
        className="border rounded-full pl-3 p-[2px] w-full"
        type="text"
        placeholder={` ${loadingData ? 'Dans un instant...' : 'Rechercher...'}   `}
      />
      <button
        className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
        type="submit"
      >
        <CiSearch />
      </button>
    </div>

    {/* Résultats de recherche pour mobile */}
    {search.length > 0 && (
      <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Link
              key={index}
              href={
                result.type === 'Todo'
                  ? `/todo`
                  : result.type === 'Etude'
                  ? `/etudes/${result.item.id}`
                  : `/vacances`
              }
            >
              <div className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                <div className="font-medium">{result.item.title}</div>
                <div className="font-medium">{result.item.cityName}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {result.type}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
        )}
      </div>
    )}
  </form>
)}



      </div>



   
      <div className="flex items-center gap-5">
        {/* {!isSearchOpen && (
          <div className="md:hidden">
            <CiSearch
              className="text-xl cursor-pointer" 
              onClick={toggleSearchInput}
            />
          </div>
        )}  */}
        {!isMobileSearchOpen && (
  <div className="md:hidden">
    <CiSearch
      className="text-xl cursor-pointer"
      onClick={() => setIsMobileSearchOpen(true)} // Ouvre la recherche mobile
    />
  </div>
)}

      
                    {/*  */}



        <Link href={targetHref}>
          <div className="relative" onClick={handleReadNotif}>
            <span className={`absolute text-sm rounded-full w-4 text-center bg-red-600 text-white top-[-6px] left-5 ${nbreUnread == 0 ? 'hidden' : 'absolute'}`}>
              {nbreUnread}
            </span>
            <IoIosNotificationsOutline className="text-2xl cursor-pointer" />
          </div>
        </Link>
        <div className="relative" ref={accountRef}>
          <VscAccount
            className="text-xl cursor-pointer"
            onClick={opVsAccount}
          />
     
          {isAccountOpen && (
            <div className="absolute z-50 border-2 w-[220px] h-[300px] top-11 md:right-[-60px] right-[-15px] rounded-2xl bg-slate-800 shadow-lg">
             
             
              {/* Contenu du menu compte */}
              <div className="text-white py-4  flex flex-col items-center justify-center space-y-4">
      
      {/* Profile Section */}
      <div className="text-center flex justify-center flex-col items-center   ">
         
        <a href={session?.user?.profilePic}>
          {/* https://res.cloudinary.com/dvnsrfsic/image/upload/v1746581898/cxoxegoedy3afxfw6hz0.jpg */}
          {/* admin_photo.png */}
          <Image 
            // src={session?.user?.profilePic || "aaaaa"}
            src={ session?.user?.isAdmin  ?  "/images/admin_photo.png"  :  session?.user?.profilePic }
            // src={ session?.user?.isAdmin  ?  "aaaa"  :  session?.user?.profilePic }

            alt="Profile"  width={64} height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-white mb-2"

          />
        </a>
        <h4 className="text-lg font-semibold">{session?.user?.username}</h4>
        <p className="text-sm">{session?.user?.email}</p>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 w-[90%] mb-4" />

      {/* Calendar Link */}
      <div className="flex w-full items-center gap-2 px-6 pt-2  cursor-pointer hover:bg-slate-600 transition duration-200">
        <div className="text-2xl text-white">
          <IoCalendarNumberOutline />
        </div>  
        <div>
          <Link href={"/calendar"}>
            <h1 className="pl-2 font-medium">Calendrier</h1>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div
        onClick={() => signOut()}
        className="flex w-full items-center gap-2 px-6 py-1  cursor-pointer hover:bg-slate-600 transition duration-200"
      >
        <div className="text-xl text-white">
          <MdLogout />
        </div>
        <div>
          <h1 className="font-medium">Se déconnecter</h1>
        </div>
      </div>
    </div>






            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Header;