import { Document, Category } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Contratos', createdAt: '2024-01-15' },
  { id: '2', name: 'Acuerdos', createdAt: '2024-01-16' },
  { id: '3', name: 'Declaraciones', createdAt: '2024-01-17' },
  { id: '4', name: 'Certificados', createdAt: '2024-01-18' },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Contrato de Arrendamiento',
    categoryId: '1',
    categoryName: 'Contratos',
    type: 'pago',
    prompt: 'Genera un contrato de arrendamiento con las siguientes características...',
    form: [
      {
        type: 'text',
        label: 'Nombre del Arrendador',
        name: 'landlord_name',
        required: true,
        placeholder: 'Ingrese el nombre completo'
      },
      {
        type: 'text',
        label: 'Nombre del Arrendatario',
        name: 'tenant_name',
        required: true,
        placeholder: 'Ingrese el nombre completo'
      },
      {
        type: 'area',
        label: 'Dirección del Inmueble',
        name: 'property_address',
        required: true,
        placeholder: 'Dirección completa del inmueble'
      },
      {
        type: 'number',
        label: 'Valor del Arriendo',
        name: 'rent_amount',
        required: true,
        placeholder: '0'
      },
      {
        type: 'date',
        label: 'Fecha de Inicio',
        name: 'start_date',
        required: true
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Acuerdo de Confidencialidad',
    categoryId: '2',
    categoryName: 'Acuerdos',
    type: 'gratis',
    prompt: 'Crea un acuerdo de confidencialidad básico...',
    form: [
      {
        type: 'text',
        label: 'Nombre de la Empresa',
        name: 'company_name',
        required: true,
        placeholder: 'Nombre de la empresa'
      },
      {
        type: 'text',
        label: 'Nombre del Empleado',
        name: 'employee_name',
        required: true,
        placeholder: 'Nombre completo del empleado'
      },
      {
        type: 'select',
        label: 'Tipo de Información',
        name: 'information_type',
        required: true,
        options: [
          { label: 'Información Técnica', value: 'technical' },
          { label: 'Información Comercial', value: 'commercial' },
          { label: 'Información Financiera', value: 'financial' }
        ]
      }
    ],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  }
];