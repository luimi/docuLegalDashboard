import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FileText, FolderOpen, Scale, BotMessageSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { 
      path: '/dashboard/documents', 
      icon: FileText, 
      label: 'Documentos',
      isActive: location.pathname.includes('/documents')
    },
    { 
      path: '/dashboard/categories', 
      icon: FolderOpen, 
      label: 'Categorías',
      isActive: location.pathname.includes('/categories')
    },
    { 
      path: '/dashboard/chatbot', 
      icon: BotMessageSquare, 
      label: 'Chatbot',
      isActive: location.pathname.includes('/chatbot')
    }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">DocuLegal</h1>
            <p className="text-sm text-slate-400">Sistema Legal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive || item.isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          © 2025 DocuLegal
        </p>
      </div>
    </div>
  );
};

export default Sidebar;