import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
//import { mockDocuments, mockCategories } from '../utils/mockData';
//import { Document } from '../types';
import Parse from 'parse';

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  //const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();

  // Filter documents
  React.useEffect(() => {
    
  }, [documents, searchTerm, categoryFilter, typeFilter]);
  React.useEffect(() => {
    getDocuments();
    getCategories();
  }, []);
  const getDocuments = async () => {
    if(documents.length === 0) {
      let result = await new Parse.Query('Document').find()
      setDocuments(result? result : []);
    }
  }
  const getCategories = async () => {
    if(categories.length === 0) {
      let result = await new Parse.Query('Category').find();
      setCategories(result);
    }
  }
  const getFilteredDocuments = () => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter((doc: any) =>
        doc.get('title').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((doc: any) => doc.get('category').id === categoryFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((doc: any) => doc.get('Type') === typeFilter);
    }

    return filtered;
  }
  const handleEdit = (id: string) => {
    navigate(`/dashboard/documents/edit/${id}`);
  };

  const handleDelete = async (document: any) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      // Here would be the delete logic
      await document.destroy();
      getDocuments();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-600 mt-2">Gestiona tus plantillas de documentos legales</p>
        </div>
        
        <button
          onClick={() => navigate('/dashboard/documents/new')}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Documento</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>{category.get('name')}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="Gratis">Gratis</option>
            <option value="Pago">Pago</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Título</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Categoría</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Tipo</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getFilteredDocuments().length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron documentos</p>
                  </td>
                </tr>
              ) : (
                getFilteredDocuments().map((document: any) => (
                  <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{document.get('title')}</p>
                          <p className="text-sm text-gray-600">ID: {document.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {document.get('category')?.get('name') || 'Sin categoría'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        document.get('Type') === 'Pago' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {document.get('Type')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(document.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(document)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documentos</p>
              <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documentos Gratuitos</p>
              <p className="text-3xl font-bold text-gray-900">
                {documents.filter((d: any) => d.get('Type') === 'Gratis').length}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documentos de Pago</p>
              <p className="text-3xl font-bold text-gray-900">
                {documents.filter((d: any) => d.get('Type') === 'Pago').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;