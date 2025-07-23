import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, FileText } from 'lucide-react';
//import { mockCategories, mockDocuments } from '../utils/mockData';
import { FormField, Document } from '../types';
import Parse from 'parse';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import "survey-core/survey.i18n";
//import 'survey-core/survey.i18n.min.js';
//import 'survey-creator-core/survey-creator-core.i18n.min.js';
import 'survey-core/survey-core.min.css';
import 'survey-creator-core/survey-creator-core.min.css';
import SurveyCreatorTheme from 'survey-creator-core/themes';
import { registerCreatorTheme } from 'survey-creator-core';
import type { ICreatorOptions } from 'survey-creator-core';
import "survey-creator-core/survey-creator-core.i18n";
import './styles/DocumentForm.css';
registerCreatorTheme(SurveyCreatorTheme);

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
};

const DocumentForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState<any>([]);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<'free' | 'paid'>('free');
  const [loading, setLoading] = useState(false);
  const [creator, setCreator] = useState<SurveyCreator>(new SurveyCreator(defaultCreatorOptions));

  useEffect(() => {
    if (isEditing && id) {
      // Load document data for editing
      getDocument();
    }
  }, [isEditing, id]);
  useEffect(() => {
    getCategories();
    creator.locale = "es"
  }, [])

  const getDocument = async () => {
    const document = await new Parse.Query('Document').get(id as string);
    if (document) {
      setTitle(document.get('title'));
      setCategoryId(document.get('category').id);
      setPrompt(document.get('prompt'));
      setType(document.get('Type'));
      //setFormFields(document.get('form') || []);
      creator.text = JSON.stringify(document.get('model') || {});
    }
  }
  const getCategories = async () => {
    const result = await new Parse.Query('Category').find();
    setCategories(result)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock save operation
    let document;
    if (isEditing && id) {
      document = await new Parse.Query('Document').get(id as string);
    } else {
      document = new Parse.Object('Document');
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      acl.setRoleWriteAccess('admin', true);
      acl.setRoleReadAccess('admin', true);
      document.setACL(acl);
    }
    document.set('title', title);
    document.set('category', new Parse.Object('Category', { id: categoryId }));
    document.set('prompt', prompt);
    document.set('type', type);
    document.set('model', JSON.parse(creator.text));
    try {
      await document.save();
      navigate('/dashboard/documents');
    } catch (error: any) {
      alert('Error al guardar el documento: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/dashboard/documents')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Documento' : 'Nuevo Documento'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Modifica la información del documento' : 'Crea una nueva plantilla de documento legal'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título del Documento *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Contrato de Arrendamiento"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>{category.get('name')}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento *
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as 'free' | 'paid')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="free">Gratis</option>
                <option value="paid">Pago</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Prompt del Documento *
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe cómo debe generarse el documento..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Este texto se utilizará como instrucciones para generar el documento.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Form Builder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Formulario Dinámico</h2>
          <SurveyCreatorComponent creator={creator} />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard/documents')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>{loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Documento')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;