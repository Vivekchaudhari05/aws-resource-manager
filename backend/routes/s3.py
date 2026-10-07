from flask import Blueprint, Response, jsonify, request

from services.activity_service import add_activity
from services.s3_service import list_buckets
from services.s3_service import list_objects

from utils.validators import (
    validate_bucket_name,
    validate_s3_object,
    validate_s3_object_bucket,
)


s3_bp = Blueprint(
    "s3",
    __name__,
    url_prefix="/api/s3",
)


@s3_bp.get("/buckets")
def get_buckets():
    buckets = list_buckets()

    return jsonify(
        {
            "status": "success",
            "data": buckets,
        }
    )


@s3_bp.get("/objects")
def get_objects():
    bucket_name = request.args.get("bucket")

    is_valid, error_message = validate_s3_object_bucket(
        bucket_name
    )

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    objects = list_objects(bucket_name)

    return jsonify(
        {
            "status": "success",
            "data": objects,
        }
    )


@s3_bp.post("/buckets")
def create_bucket():
    data = request.get_json(silent=True)

    bucket_name = data.get("bucket_name") if data else None

    is_valid, error_message = validate_bucket_name(
        bucket_name
    )

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    if not bucket_name:
        return jsonify(
            {
                "status": "error",
                "message": "bucket_name is required",
            }
        ), 400

    from services.s3_service import create_bucket as create_s3_bucket

    response = create_s3_bucket(bucket_name)

    add_activity(
        action="Create Bucket",
        resource_type="S3",
        resource_id=bucket_name,
        status="success",
    )

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@s3_bp.post("/upload")
def upload_object():
    bucket_name = request.form.get("bucket")
    object_key = request.form.get("object_key")
    file = request.files.get("file")

    is_valid, error_message = validate_s3_object(
        bucket_name,
        object_key,
    )

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    if not file:
        return jsonify(
            {
                "status": "error",
                "message": "file is required",
            }
        ), 400

    from services.s3_service import upload_object as upload_s3_object

    response = upload_s3_object(
        bucket_name=bucket_name,
        file_name=object_key,
        file_data=file.read(),
    )

    add_activity(
        action="Upload Object",
        resource_type="S3",
        resource_id=f"{bucket_name}/{object_key}",
        status="success",
    )

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@s3_bp.delete("/object")
def delete_object():
    data = request.get_json(silent=True)

    bucket_name = data.get("bucket") if data else None
    object_key = data.get("key") if data else None

    is_valid, error_message = validate_s3_object(
        bucket_name,
        object_key,
    )

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    from services.s3_service import delete_object as delete_s3_object

    response = delete_s3_object(
        bucket_name=bucket_name,
        object_key=object_key,
    )

    add_activity(
        action="Delete Object",
        resource_type="S3",
        resource_id=f"{bucket_name}/{object_key}",
        status="success",
    )

    return jsonify(
        {
            "status": "success",
            "data": response,
        }
    )


@s3_bp.get("/download")
def download_object():
    bucket_name = request.args.get("bucket")
    object_key = request.args.get("key")

    is_valid, error_message = validate_s3_object(
        bucket_name,
        object_key,
    )

    if not is_valid:
        return jsonify(
            {
                "status": "error",
                "message": error_message,
            }
        ), 400

    from services.s3_service import download_object as download_s3_object

    response = download_s3_object(
        bucket_name=bucket_name,
        object_key=object_key,
    )

    file_content = response["Body"].read()

    content_type = response.get(
        "ContentType",
        "application/octet-stream",
    )

    add_activity(
        action="Download Object",
        resource_type="S3",
        resource_id=f"{bucket_name}/{object_key}",
        status="success",
    )

    return Response(
        file_content,
        mimetype=content_type,
        headers={
            "Content-Disposition": (
                f'attachment; filename="{object_key.split("/")[-1]}"'
            )
        },
    )
