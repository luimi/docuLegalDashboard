import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen, Search } from 'lucide-react';
import Parse from 'parse';
//import { mockCategories } from '../utils/mockData';
//import { Category } from '../types';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any>([]);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter categories
  React.useEffect(() => {
    if (searchTerm) {
      setFilteredCategories(
        categories.filter((category: any) =>
          category.get('name').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchTerm]);
  React.useEffect(() => {
    getCategories();
  },[])
  const getCategories = async () => {
    const result = await new Parse.Query('Category').find()
    setCategories(result);
  }
  const handleOpenModal = (category?: any) => {
    setEditingCategory(category || null);
    setCategoryName(category?.get('name') || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const category = editingCategory || new Parse.Object('Category');
    if(!editingCategory) {
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      acl.setRoleWriteAccess('admin', true);
      acl.setRoleReadAccess('admin', true);
      category.setACL(acl);
    }
    category.set('name', categoryName);
    setLoading(false);
    handleCloseModal();
    try {
      await category.save();
      getCategories();
    }catch (error: any) {
      alert('Error al guardar la categoría: ' + error.message);
    }
    
  };

  const handleDelete = async (category: any) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      await category.destroy();
      getCategories()
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-600 mt-2">Organiza tus documentos por categorías</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron categorías</p>
          </div>
        ) : (
          filteredCategories.map((category: any) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-purple-600" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.get('name')}</h3>
              <p className="text-sm text-gray-500">
                Creada el {new Date(category.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Contratos"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total de Categorías</p>
            <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <FolderOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;