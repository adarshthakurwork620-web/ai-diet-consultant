from flask import Flask
from flask_cors import CORS
from routes.diet_routes import diet_bp

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})   # 🔥 FORCE ALLOW

app.register_blueprint(diet_bp)

@app.route('/')
def home():
    return "AI Diet Backend Running 🚀"

if __name__ == '__main__':
    app.run(debug=True)