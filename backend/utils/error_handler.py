from botocore.exceptions import ClientError
from flask import jsonify


def handle_aws_error(error):
    error_code = error.response.get("Error", {}).get(
        "Code",
        "AWS_ERROR",
    )

    error_message = error.response.get("Error", {}).get(
        "Message",
        "AWS operation failed",
    )

    return jsonify(
        {
            "status": "error",
            "error_code": error_code,
            "message": error_message,
        }
    ), 400


def handle_general_error(error):
    return jsonify(
        {
            "status": "error",
            "message": str(error),
        }
    ), 500
