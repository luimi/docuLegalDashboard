import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import Parse from 'parse';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  //const { user, logout } = useAuth();
  const user: any = Parse.User.current();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Parse.User.logOut();
    //logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/dashboard/profile');
    setShowDropdown(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Control</h2>
          <p className="text-gray-600">Gestiona tus documentos legales</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">{user?.get('username')}</p>
              <p className="text-sm text-gray-500">{user?.get('email')}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={handleProfile}
                className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <Settings className="h-4 w-4" />
                <span>Perfil</span>
              </button>
              <hr className="my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;