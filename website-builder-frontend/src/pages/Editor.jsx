import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sitesAPI } from '../lib/api';
import WebsiteEditor from '../components/WebsiteEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';

const Editor = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSite();
  }, [siteId]);

  const loadSite = async () => {
    try {
      setLoading(true);
      const response = await sitesAPI.getById(siteId);
      setSite(response.data.site);
    } catch (err) {
      setError('Error al cargar el sitio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (projectData) => {
    try {
      await sitesAPI.update(siteId, {
        content_data: projectData,
      });
      
      // Actualizar el estado local
      setSite(prev => ({
        ...prev,
        content_data: projectData,
      }));
    } catch (err) {
      throw new Error('Error al guardar el sitio');
    }
  };

  const handlePreview = () => {
    // Esta función será manejada por el componente WebsiteEditor
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
        <Alert>
          <AlertDescription>Sitio no encontrado</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <WebsiteEditor
        siteData={site}
        onSave={handleSave}
        onPreview={handlePreview}
      />
    </div>
  );
};

export default Editor;

