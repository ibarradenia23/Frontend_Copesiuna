import { useEffect, useState } from "react";
import { ToogleThemeButton } from "./ToogleTheme";
import LogoV from '/logoV.jpg'
import { useLocation } from "react-router-dom";
import useAuth from "../../modules/auth/hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { userState } from "../../modules/auth/state/userAtom";
import { useRecoilValue } from "recoil";
import { UserInterface } from "../../modules/users/models";
import Modal from "./Modal";
import Help from "./Help";

const Navbar = () => {
  //Saber la ruta en la que me encuentro
  const location = useLocation();
  const {logout} = useAuth();
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserInterface;
  const [userData,setUserData] = useState<UserInterface>();

  // Estado para controlar la visibilidad del menú de usuario
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Estado para el menu de navegacion
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para manejar el click en el botón de la foto
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  //Fincion para manejar el click en el menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //Funcion para cerrar sesion.
  const handleLogout =()=>{
    if (window.confirm("¿Estás seguro de cerrar sesion?")){
      logout();
      navigate('/');
    }
  }

  //Obtener la informacion del ususario
  useEffect(() => {
    if (user ) {
      setUserData (user); // Asegúrate de que esto actualice el estado de Recoil
    }
  }, [user]);

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={LogoV}
            className="h-14 w-auto object-contain"
            alt="Flowbite Logo"
          />
         
        </a>
        <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
          <ToogleThemeButton />
          <button
            
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/profile.jpg"
              alt="user photo"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 z-50 mt-52 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                                {userData ? (
                  <>
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userData.nombre} 
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {userData.email}
                    </span>
                  </>
                ) : (
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    Usuario no disponible
                  </span>
                )}

              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
               
            
                <li>
                  <a
                  onClick={handleOpenModal}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Ayuda
                  </a>
                </li>
                <li>
                  <a
                    
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" onClick={handleLogout}
                  >
                    Cerrar sesion
                  </a>
                </li>
              </ul>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/home"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/home' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/cosechas"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/cosechas' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Cosechas
              </a>
            </li>
            <li>
              <a
                href="/suelos"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/suelos' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Suelos
              </a>
            </li>
            <li>
              <a
                href="/productores"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/productores' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Productor
              </a>
            </li>
            <li>
              <a
                href="/cultivos_parcelas"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/cultivos_parcelas' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Cultivos y parcelas
              </a>
            </li>
            <li>
              <a
                href="/users"
                className={`block py-2 px-3 md:p-0  ${location.pathname === '/users' ? 'text-primary dark:text-primary': 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary  dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Usuarios
              </a>
            </li>
          </ul>
        </div>
        {isMenuOpen && (
        <div style={{top:'4.5rem'}} className={`fixed  right-0 w-3/5 h-full  bg-gray-100  divide-y divide-gray-100 bg-opacity-90 z-50 md:hidden transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} dark:bg-gray-700 dark:divide-gray-600`}>
          <div
            className="flex flex-col items-center justify-center h-full"
            id="navbar-user"
          >
            <ul className="w-80 flex flex-col font-medium p-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3  text-white rounded bg-primary w-9/10"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-white dark:hover:bg-gray-800  w-9/10"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-white dark:hover:bg-gray-800  w-9/10"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-white dark:hover:bg-gray-800  w-9/10"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-white dark:hover:bg-gray-800  w-9/10"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Necesitas ayuda?"
        width="min-w-[800px]"
      >
        <Help
          
        />
      </Modal>
    </nav>
  );
};

export default Navbar;
