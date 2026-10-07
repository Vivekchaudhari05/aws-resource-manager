from flask import Blueprint, jsonify

from services.dashboard_service import get_dashboard_data


dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api",
)


@dashboard_bp.get("/dashboard")
def get_dashboard():
    dashboard = get_dashboard_data()

    return jsonify(
        {
            "status": "success",
            "data": dashboard,
        }
    )