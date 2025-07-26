from flask import Blueprint, jsonify
from src.models.plan import Plan

plans_bp = Blueprint('plans', __name__)

@plans_bp.route('/plans', methods=['GET'])
def get_plans():
    try:
        plans = Plan.query.all()
        return jsonify([plan.to_dict() for plan in plans]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@plans_bp.route('/plans/<int:plan_id>', methods=['GET'])
def get_plan(plan_id):
    try:
        plan = Plan.query.get(plan_id)
        
        if not plan:
            return jsonify({'error': 'Plan no encontrado'}), 404
        
        return jsonify({'plan': plan.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

