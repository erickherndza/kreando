import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { templatesAPI, sitesAPI } from '../lib/api';
import { Loader2, Globe, ArrowLeft } from 'lucide-react';

const createSiteSchema = z.object({
  domain: z.string().min(3, 'El dominio debe tener al menos 3 caracteres'),
  template_id: z.number().min(1, 'Debes seleccionar una plantilla'),
});

const CreateSite = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSiteSchema),
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await templatesAPI.getAll();
      setTemplates(response.data);
    } catch (err) {
      setError('Error al cargar las plantillas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setCreating(true);
    setError('');

    try {
      const response = await sitesAPI.create(data);
      const newSite = response.data.site;
      
      // Redirigir al editor
      navigate(`/editor/${newSite.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el sitio');
    } finally {
      setCreating(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setValue('template_id', template.id);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Cargando plantillas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Sitio</h1>
        <p className="text-gray-600 mt-2">
          Elige una plantilla y configura tu dominio para comenzar.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Selecciona una Plantilla</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id
                    ? 'ring-2 ring-blue-500 border-blue-500'
                    : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <div className="aspect-video bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                    <Globe className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>
                    Plantilla profesional para tu negocio
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Site Configuration */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sitio</CardTitle>
              <CardDescription>
                Configura los detalles básicos de tu sitio web
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Dominio</Label>
                  <Input
                    id="domain"
                    placeholder="mi-negocio.com"
                    {...register('domain')}
                    className={errors.domain ? 'border-red-500' : ''}
                  />
                  {errors.domain && (
                    <p className="text-sm text-red-500">{errors.domain.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Este será el dominio de tu sitio web
                  </p>
                </div>

                {selectedTemplate && (
                  <div className="space-y-2">
                    <Label>Plantilla Seleccionada</Label>
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                      <p className="font-medium text-blue-900">{selectedTemplate.name}</p>
                    </div>
                  </div>
                )}

                {errors.template_id && (
                  <p className="text-sm text-red-500">{errors.template_id.message}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={creating || !selectedTemplate}
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creando sitio...
                    </>
                  ) : (
                    'Crear Sitio y Comenzar a Editar'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateSite;

