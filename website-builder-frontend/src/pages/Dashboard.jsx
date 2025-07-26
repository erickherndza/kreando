import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { sitesAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Globe, Edit, Trash2, Eye, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setLoading(true);
      const response = await sitesAPI.getAll();
      setSites(response.data);
    } catch (err) {
      setError('Error al cargar los sitios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSite = async (siteId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este sitio?')) {
      return;
    }

    try {
      await sitesAPI.delete(siteId);
      setSites(sites.filter(site => site.id !== siteId));
    } catch (err) {
      setError('Error al eliminar el sitio');
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: 'Borrador', variant: 'secondary' },
      published: { label: 'Publicado', variant: 'default' },
      error: { label: 'Error', variant: 'destructive' },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Cargando sitios...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bienvenido, {user?.email}. Gestiona tus sitios web desde aquí.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Create New Site Button */}
      <div className="mb-8">
        <Link to="/create-site">
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Crear Nuevo Sitio
          </Button>
        </Link>
      </div>

      {/* Sites Grid */}
      {sites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes sitios web aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primer sitio web profesional en minutos
            </p>
            <Link to="/create-site">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Mi Primer Sitio
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card key={site.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg truncate">{site.domain}</CardTitle>
                  {getStatusBadge(site.status)}
                </div>
                <CardDescription>
                  Creado el {new Date(site.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Link to={`/editor/${site.id}`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    {site.status === 'published' && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteSite(site.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

