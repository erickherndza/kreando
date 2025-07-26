import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.models.user import db
from src.models.plan import Plan
from src.models.site import Site
from src.models.template import Template
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.sites import sites_bp
from src.routes.templates import templates_bp
from src.routes.plans import plans_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string-change-this-in-production'

# Configurar CORS para permitir solicitudes desde cualquier origen
CORS(app)

# Configurar JWT
jwt = JWTManager(app)

# Registrar blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(sites_bp, url_prefix='/api')
app.register_blueprint(templates_bp, url_prefix='/api')
app.register_blueprint(plans_bp, url_prefix='/api')

# Configurar base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Crear tablas y datos iniciales
with app.app_context():
    db.create_all()
    
    # Crear planes iniciales si no existen
    if not Plan.query.first():
        plan_a = Plan(
            name='Plan A - Landing Page',
            price=175.00,
            description='Plan básico para crear una landing page profesional',
            features={
                'pages': 1,
                'templates': 'basic',
                'custom_domain': True,
                'hosting_included': True
            }
        )
        
        plan_b = Plan(
            name='Plan B - Web Sencilla',
            price=250.00,
            description='Plan completo para crear una web de 4 páginas',
            features={
                'pages': 4,
                'templates': 'premium',
                'custom_domain': True,
                'hosting_included': True,
                'contact_forms': True
            }
        )
        
        db.session.add(plan_a)
        db.session.add(plan_b)
        db.session.commit()
    
    # Crear plantillas iniciales si no existen
    if not Template.query.first():
        template_basic = Template(
            name='Plantilla Básica - Negocio',
            preview_image_url='/static/templates/basic-business-preview.jpg',
            grapesjs_json={
                "html": "<div class=\"container\"><h1>Mi Negocio</h1><p>Descripción de mi negocio</p></div>",
                "css": ".container { max-width: 1200px; margin: 0 auto; padding: 20px; }",
                "components": [],
                "styles": []
            }
        )
        
        template_modern = Template(
            name='Plantilla Moderna - Servicios',
            preview_image_url='/static/templates/modern-services-preview.jpg',
            grapesjs_json={
                "html": "<div class=\"hero\"><h1>Nuestros Servicios</h1><p>Ofrecemos soluciones profesionales</p></div>",
                "css": ".hero { background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 20px; text-align: center; }",
                "components": [],
                "styles": []
            }
        )
        
        db.session.add(template_basic)
        db.session.add(template_modern)
        db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
