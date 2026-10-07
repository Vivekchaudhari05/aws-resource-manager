from flask import Blueprint, jsonify

from services.resource_service import get_resource_summary


resources_bp = Blueprint(
    "resources",
    __name__,
    url_prefix="/api",
)


@resources_bp.get("/resources")
def get_resources():
    resources = get_resource_summary()

    return jsonify(
        {
            "status": "success",
            "data": resources,
        }
    )