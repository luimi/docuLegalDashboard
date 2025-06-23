import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { FormField } from '../types';

interface DynamicFormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({ fields, onChange }) => {
  const [currentField, setCurrentField] = useState<Partial<FormField>>({
    type: 'text',
    label: '',
    name: '',
    required: false,
    placeholder: '',
    options: []
  });

  const fieldTypes = [
    { value: 'text', label: 'Texto' },
    { value: 'textarea', label: 'Área de Texto' },
    { value: 'select', label: 'Lista Desplegable' },
    { value: 'radio', label: 'Opción Múltiple (Radio)' },
    { value: 'checkbox', label: 'Casillas de Verificación' },
    { value: 'date', label: 'Fecha' },
    { value: 'number', label: 'Número' },
    { value: 'email', label: 'Correo Electrónico' }
  ];

  const addField = () => {
    if (currentField.label && currentField.name) {
      const newField: FormField = {
        type: currentField.type as FormField['type'],
        label: currentField.label,
        name: currentField.name,
        required: currentField.required || false,
        placeholder: currentField.placeholder || '',
        options: currentField.options || []
      };
      
      onChange([...fields, newField]);
      setCurrentField({
        type: 'text',
        label: '',
        name: '',
        required: false,
        placeholder: '',
        options: []
      });
    }
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    onChange(newFields);
  };

  const addOption = () => {
    const newOptions = [...(currentField.options || []), { label: '', value: '' }];
    setCurrentField({ ...currentField, options: newOptions });
  };

  const updateOption = (index: number, field: 'label' | 'value', value: string) => {
    const newOptions = [...(currentField.options || [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setCurrentField({ ...currentField, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = (currentField.options || []).filter((_, i) => i !== index);
    setCurrentField({ ...currentField, options: newOptions });
  };

  const needsOptions = ['select', 'radio', 'check'].includes(currentField.type || '');

  const moveItem = (index: number, direction: string) => {
    const newItems = [...fields];
    if (direction === 'up' && index > 0) {
      // Intercambia el elemento actual con el anterior
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      // Intercambia el elemento actual con el siguiente
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    onChange(newItems);
  };

  return (
    <div className="space-y-6">
      {/* Current Fields */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Campos del Formulario</h4>
        
        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No hay campos agregados. Crea el primer campo abajo.
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <ChevronUp onClick={() => {
                    if(index > 0) moveItem(index, 'up');
                  }}/>
                  <ChevronDown onClick={() => {
                    if(index < fields.length - 1) moveItem(index, 'down');
                  }}/>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{field.label}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {fieldTypes.find(t => t.value === field.type)?.label}
                    </span>
                    {field.required && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Requerido
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Nombre del campo: <code className="bg-gray-200 px-1 rounded">{field.name}</code>
                  </p>
                </div>

                <button
                  onClick={() => removeField(index)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Field */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Campo</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Campo
            </label>
            <select
              value={currentField.type}
              onChange={(e) => setCurrentField({ ...currentField, type: e.target.value as FormField['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fieldTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiqueta del Campo *
            </label>
            <input
              type="text"
              value={currentField.label}
              onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Campo *
            </label>
            <input
              type="text"
              value={currentField.name}
              onChange={(e) => setCurrentField({ ...currentField, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: full_name (sin espacios)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Placeholder
            </label>
            <input
              type="text"
              value={currentField.placeholder}
              onChange={(e) => setCurrentField({ ...currentField, placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Texto de ayuda"
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="required"
            checked={currentField.required}
            onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 text-sm text-gray-700">
            Campo requerido
          </label>
        </div>

        {needsOptions && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opciones
            </label>
            <div className="space-y-2">
              {(currentField.options || []).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(index, 'label', e.target.value)}
                    placeholder="Etiqueta"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) => updateOption(index, 'value', e.target.value)}
                    placeholder="Valor"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addOption}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Opción</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={addField}
            disabled={!currentField.label || !currentField.name}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Agregar Campo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;