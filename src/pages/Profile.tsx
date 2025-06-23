import React, { useState } from 'react';
import { User, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Parse from 'parse';
//import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  //const { user, updatePassword } = useAuth();
  const user: any = Parse.User.current();
  //const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      user.set('password', newPassword);
      const result = await user.save()
      //const result = await updatePassword(currentPassword, newPassword);
      if (result) {
        setSuccess('Contraseña actualizada correctamente');
        //setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('La contraseña actual es incorrecta');
      }
    } catch (err) {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
        <p className="text-gray-600 mt-2">Gestiona tu información personal y configuración de seguridad</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{user?.get('username')}</h3>
              <p className="text-gray-600">{user?.get('email')}</p>
              <div className="mt-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-block">
                Usuario Activo
              </div>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cambiar Contraseña</h3>
                <p className="text-sm text-gray-600">Actualiza tu contraseña para mantener tu cuenta segura</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              {success && (
                <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Repite la nueva contraseña"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Requisitos de la contraseña:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mínimo 6 caracteres</li>
                  <li>• Debe ser diferente a la contraseña actual</li>
                  <li>• Se recomienda usar una combinación de letras, números y símbolos</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;