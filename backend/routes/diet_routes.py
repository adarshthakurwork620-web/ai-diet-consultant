from flask import Blueprint, request, jsonify
from services.ai_service import generate_diet_plan

diet_bp = Blueprint('diet', __name__)

@diet_bp.route('/diet', methods=['GET', 'POST'])
def generate_diet():
    if request.method == 'GET':
        return "Use POST request with JSON data"

    data = request.get_json()
    
    weight = data.get('weight')
    goal = data.get('goal')

    plan = generate_diet_plan(weight, goal)

    return jsonify({"diet_plan": plan})