from flask import Blueprint, jsonify

from services.activity_service import get_activities


activity_bp = Blueprint(
    "activity",
    __name__,
    url_prefix="/api",
)


@activity_bp.get("/activity")
def get_activity():
    activities = get_activities()

    return jsonify(
        {
            "status": "success",
            "data": activities,
        }
    )