from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from src.models.template import Template

templates_bp = Blueprint('templates', __name__)

@templates_bp.route('/templates', methods=['GET'])
@jwt_required()
def get_templates():
    try:
        templates = Template.query.all()
        return jsonify([template.to_dict() for template in templates]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@templates_bp.route('/templates/<int:template_id>', methods=['GET'])
@jwt_required()
def get_template(template_id):
    try:
        template = Template.query.get(template_id)
        
        if not template:
            return jsonify({'error': 'Plantilla no encontrada'}), 404
        
        return jsonify({'template': template.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

