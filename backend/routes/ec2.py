from flask import Blueprint, jsonify, request

from services.ec2_service import list_instances
from utils.validators import (
    validate_ec2_launch,
    validate_ec2_action,
    validate_ec2_count,
)


ec2_bp = Blueprint(
    "ec2",
    __name__,
    url_prefix="/api/ec2",
)


@ec2_bp.get("/instances")
def get_instances():
    instances = list_instances()

    return jsonify(
        {
            "status": "success",
            "data": instances,
        }
    )


@ec2_bp.post("/start")
def start_instance():
    data = request.get_json(silent=True)

    instance_id = data.get("instance_id") if data else None

    is_valid, error_message = validate_ec2_action(instance_id)
    
    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    from services.ec2_service import start_instance as start_ec2_instance

    response = start_ec2_instance(instance_id)

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@ec2_bp.post("/stop")
def stop_instance():
    data = request.get_json(silent=True)

    instance_id = data.get("instance_id") if data else None
    
    is_valid, error_message = validate_ec2_action(instance_id)


    if not is_valid:
        return jsonify(
        {
            "status": "error",
            "message": error_message,
        }
    ), 400

    from services.ec2_service import stop_instance as stop_ec2_instance

    response = stop_ec2_instance(instance_id)

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@ec2_bp.post("/reboot")
def reboot_instance():
    data = request.get_json(silent=True)

    instance_id = data.get("instance_id") if data else None

    is_valid, error_message = validate_ec2_action(instance_id)
    
    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    from services.ec2_service import reboot_instance as reboot_ec2_instance

    response = reboot_ec2_instance(instance_id)

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@ec2_bp.delete("/terminate")
def terminate_instance():
    data = request.get_json(silent=True)

    instance_id = data.get("instance_id") if data else None
    is_valid, error_message = validate_ec2_action(instance_id)

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    from services.ec2_service import terminate_instance as terminate_ec2_instance

    response = terminate_ec2_instance(instance_id)

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@ec2_bp.post("/launch")
def launch_instance():
    data = request.get_json(silent=True)

    image_id = data.get("image_id") if data else None
    instance_type = data.get("instance_type") if data else None
    min_count = data.get("min_count", 1) if data else 1
    max_count = data.get("max_count", 1) if data else 1

    is_valid, error_message = validate_ec2_launch(
        image_id,
        instance_type
    )

    if not is_valid:
        return jsonify({
            "status": "error",
            "message": error_message
        }), 400

    is_valid, error_message = validate_ec2_count(
        min_count,
        max_count
    )

    if not is_valid:
        return jsonify({
            "status": "error",
            "message": error_message
        }), 400

    from services.ec2_service import launch_instance as launch_ec2_instance

    response = launch_ec2_instance(
        image_id=image_id,
        instance_type=instance_type,
        min_count=min_count,
        max_count=max_count
    )

    return jsonify({
        "status": "success",
        "data": response
    })