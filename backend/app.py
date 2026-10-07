from flask import Flask, jsonify
from flask_cors import CORS

from config.settings import Config
from routes.ec2 import ec2_bp
from routes.s3 import s3_bp
from routes.resources import resources_bp
from routes.dashboard import dashboard_bp
from routes.activity import activity_bp
from botocore.exceptions import ClientError

from utils.error_handler import (
    handle_aws_error,
    handle_general_error,
)

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "http://localhost:5173"
            }
        },
    )

    app.register_blueprint(ec2_bp)
    app.register_blueprint(s3_bp)
    app.register_blueprint(resources_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(activity_bp)
    

    @app.get("/api/health")
    def health_check():
        return jsonify(
            {
                "status": "success",
                "message": "AWS Resource Manager backend is running",
            }
        )

    return app


app = create_app()
app.register_error_handler(
    ClientError,
    handle_aws_error,
)

app.register_error_handler(
    Exception,
    handle_general_error,
)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
    )