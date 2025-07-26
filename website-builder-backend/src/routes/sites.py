from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.user import db
from src.models.site import Site
from src.models.template import Template

sites_bp = Blueprint('sites', __name__)

@sites_bp.route('/sites', methods=['GET'])
@jwt_required()
def get_user_sites():
    try:
        user_id = get_jwt_identity()
        sites = Site.query.filter_by(user_id=user_id).all()
        return jsonify([site.to_dict() for site in sites]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@sites_bp.route('/sites', methods=['POST'])
@jwt_required()
def create_site():
    try:
        user_id = get_jwt_identity()
        data = request.json
        
        # Validar datos requeridos
        if not data.get('domain') or not data.get('template_id'):
            return jsonify({'error': 'Dominio y template_id son requeridos'}), 400
        
        # Verificar que la plantilla existe
        template = Template.query.get(data['template_id'])
        if not template:
            return jsonify({'error': 'Plantilla no encontrada'}), 404
        
        # Verificar que el dominio no esté en uso
        if Site.query.filter_by(domain=data['domain']).first():
            return jsonify({'error': 'El dominio ya está en uso'}), 400
        
        # Crear nuevo sitio
        site = Site(
            user_id=user_id,
            domain=data['domain'],
            template_id=data['template_id'],
            content_data=template.grapesjs_json  # Inicializar con la plantilla
        )
        
        db.session.add(site)
        db.session.commit()
        
        return jsonify({
            'message': 'Sitio creado exitosamente',
            'site': site.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@sites_bp.route('/sites/<int:site_id>', methods=['GET'])
@jwt_required()
def get_site(site_id):
    try:
        user_id = get_jwt_identity()
        site = Site.query.filter_by(id=site_id, user_id=user_id).first()
        
        if not site:
            return jsonify({'error': 'Sitio no encontrado'}), 404
        
        return jsonify({'site': site.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@sites_bp.route('/sites/<int:site_id>', methods=['PUT'])
@jwt_required()
def update_site(site_id):
    try:
        user_id = get_jwt_identity()
        site = Site.query.filter_by(id=site_id, user_id=user_id).first()
        
        if not site:
            return jsonify({'error': 'Sitio no encontrado'}), 404
        
        data = request.json
        
        # Actualizar campos permitidos
        if 'content_data' in data:
            site.content_data = data['content_data']
        if 'status' in data:
            site.status = data['status']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Sitio actualizado exitosamente',
            'site': site.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@sites_bp.route('/sites/<int:site_id>', methods=['DELETE'])
@jwt_required()
def delete_site(site_id):
    try:
        user_id = get_jwt_identity()
        site = Site.query.filter_by(id=site_id, user_id=user_id).first()
        
        if not site:
            return jsonify({'error': 'Sitio no encontrado'}), 404
        
        db.session.delete(site)
        db.session.commit()
        
        return jsonify({'message': 'Sitio eliminado exitosamente'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@sites_bp.route('/sites/<int:site_id>/publish', methods=['POST'])
@jwt_required()
def publish_site(site_id):
    try:
        user_id = get_jwt_identity()
        site = Site.query.filter_by(id=site_id, user_id=user_id).first()
        
        if not site:
            return jsonify({'error': 'Sitio no encontrado'}), 404
        
        # TODO: Implementar lógica de generación de sitio estático
        # Por ahora solo cambiamos el estado
        site.status = 'published'
        db.session.commit()
        
        return jsonify({
            'message': 'Sitio publicado exitosamente',
            'site': site.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

