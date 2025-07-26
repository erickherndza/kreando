import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Globe, Zap, Shield, Smartphone, Palette } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Fácil de usar',
      description: 'Constructor visual intuitivo, tan fácil como usar Word'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Dominio incluido',
      description: 'Tu dominio personalizado incluido en todos los planes'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Hosting seguro',
      description: 'Alojamiento confiable y seguro para tu sitio web'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Responsive',
      description: 'Tu sitio se ve perfecto en móviles, tablets y desktop'
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Plantillas profesionales',
      description: 'Diseños modernos y profesionales listos para usar'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Sin complicaciones',
      description: 'Todo incluido: dominio, hosting y soporte técnico'
    }
  ];

  const plans = [
    {
      name: 'Plan A - Landing Page',
      price: '$175',
      description: 'Perfecto para profesionales y pequeños negocios',
      features: [
        '1 página profesional',
        'Dominio personalizado incluido',
        'Hosting por 1 año',
        'Plantillas básicas',
        'Soporte por email'
      ]
    },
    {
      name: 'Plan B - Web Completa',
      price: '$250',
      description: 'Ideal para empresas que necesitan más presencia',
      features: [
        '4 páginas (Inicio, Nosotros, Servicios, Contacto)',
        'Dominio personalizado incluido',
        'Hosting por 1 año',
        'Plantillas premium',
        'Formularios de contacto',
        'Soporte prioritario'
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crea tu sitio web profesional
              <span className="block text-yellow-300">en minutos</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Sin conocimientos técnicos. Sin complicaciones. Solo arrastra, edita y publica.
              Tu negocio online te está esperando.
            </p>
            <div className="space-x-4">
              <Link to="/register">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir WebBuilder Pro?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hemos diseñado la plataforma más simple y completa para que tengas tu sitio web profesional sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planes simples y transparentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo incluido. Sin sorpresas. Sin costos ocultos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-blue-500 border-2' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Más Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600 my-4">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block">
                    <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                      Elegir Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para crear tu sitio web?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a cientos de pequeñas empresas que ya tienen su presencia online profesional.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Comenzar Ahora - Es Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

