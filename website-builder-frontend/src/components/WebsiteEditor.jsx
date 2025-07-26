import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsPluginForms from 'grapesjs-plugin-forms';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Eye, Loader2 } from 'lucide-react';

const WebsiteEditor = ({ siteData, onSave, onPreview }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editorRef.current) return;

    // Configuración de GrapesJS
    const grapesEditor = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      width: 'auto',
      storageManager: false, // Deshabilitamos el storage automático
      plugins: [gjsPresetWebpage, gjsBlocksBasic, gjsPluginForms],
      pluginsOpts: {
        [gjsPresetWebpage]: {
          modalImportTitle: 'Importar',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Pega aquí tu código HTML/CSS y haz clic en Importar</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
        },
        [gjsBlocksBasic]: {},
        [gjsPluginForms]: {},
      },
      canvas: {
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.3.1.slim.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
        ],
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '',
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '768px',
          },
        ],
      },
      panels: {
        defaults: [
          {
            id: 'layers',
            el: '.panel__right',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: 0,
              cl: 1,
              cr: 0,
              bc: 0,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [
              {
                id: 'show-layers',
                active: true,
                label: 'Capas',
                command: 'show-layers',
                togglable: false,
              },
              {
                id: 'show-style',
                active: true,
                label: 'Estilos',
                command: 'show-styles',
                togglable: false,
              },
              {
                id: 'show-traits',
                active: true,
                label: 'Configuración',
                command: 'show-traits',
                togglable: false,
              },
            ],
          },
        ],
      },
      layerManager: {
        appendTo: '.layers-container',
      },
      styleManager: {
        appendTo: '.styles-container',
        sectors: [
          {
            name: 'Dimensiones',
            open: false,
            buildProps: ['width', 'min-height', 'padding'],
            properties: [
              {
                type: 'integer',
                name: 'El ancho',
                property: 'width',
                units: ['px', '%'],
                defaults: 'auto',
                min: 0,
              },
            ],
          },
          {
            name: 'Tipografía',
            open: false,
            buildProps: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
            ],
            properties: [
              {
                name: 'Fuente',
                property: 'font-family',
              },
              {
                name: 'Peso',
                property: 'font-weight',
              },
              {
                name: 'Tamaño de fuente',
                property: 'font-size',
                units: ['px', 'em', 'rem'],
              },
            ],
          },
          {
            name: 'Decoraciones',
            open: false,
            buildProps: [
              'opacity',
              'background-color',
              'border-radius',
              'border',
              'box-shadow',
              'background',
            ],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
          },
        ],
      },
      traitManager: {
        appendTo: '.traits-container',
      },
      blockManager: {
        appendTo: '.blocks-container',
        blocks: [
          {
            id: 'section',
            label: '<b>Sección</b>',
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>Inserta tu título aquí</h1>
              <p>Inserta tu contenido aquí</p>
            </section>`,
          },
          {
            id: 'text',
            label: 'Texto',
            content: '<div data-gjs-type="text">Inserta tu texto aquí</div>',
          },
          {
            id: 'image',
            label: 'Imagen',
            select: true,
            content: { type: 'image' },
            activate: true,
          },
        ],
      },
    });

    // Cargar contenido si existe
    if (siteData?.content_data) {
      grapesEditor.loadProjectData(siteData.content_data);
    }

    setEditor(grapesEditor);

    // Cleanup
    return () => {
      if (grapesEditor) {
        grapesEditor.destroy();
      }
    };
  }, [siteData]);

  const handleSave = async () => {
    if (!editor) return;

    setSaving(true);
    setError('');

    try {
      const projectData = editor.getProjectData();
      await onSave(projectData);
    } catch (err) {
      setError('Error al guardar el sitio');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!editor) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Editor de Sitio Web</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Editor Layout */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r flex flex-col">
          <div className="panel__switcher border-b p-2"></div>
          <div className="flex-1 overflow-auto">
            <div className="blocks-container p-2"></div>
            <div className="layers-container p-2"></div>
            <div className="styles-container p-2"></div>
            <div className="traits-container p-2"></div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1">
          <div ref={editorRef} className="h-full"></div>
        </div>

        {/* Right Panel */}
        <div className="panel__right w-64 bg-gray-50 border-l"></div>
      </div>
    </div>
  );
};

export default WebsiteEditor;

