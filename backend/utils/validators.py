import re


def validate_bucket_name(bucket_name):
    if not bucket_name:
        return False, "bucket_name is required"

    if len(bucket_name) < 3 or len(bucket_name) > 63:
        return False, "bucket_name must be between 3 and 63 characters"

    pattern = r"^[a-z0-9][a-z0-9.-]*[a-z0-9]$"

    if not re.match(pattern, bucket_name):
        return False, "bucket_name contains invalid characters"

    if ".." in bucket_name:
        return False, "bucket_name cannot contain consecutive periods"

    return True, None

def validate_ec2_launch(image_id, instance_type):
    if not image_id:
        return False, "image_id is required"

    if not re.match(r"^ami-[a-f0-9]{8,17}$", image_id):
        return False, "invalid AMI ID"

    if not instance_type:
        return False, "instance_type is required"

    if not instance_type.strip():
        return False, "instance_type cannot be empty"

    if instance_type != instance_type.strip():
        return False, "instance_type cannot contain leading or trailing spaces"

    allowed_instance_types = {
        "t2.micro",
        "t2.small",
        "t3.micro",
        "t3.small",
        "t3.medium",
        "t4g.micro",
        "t4g.small",
    }

    if instance_type not in allowed_instance_types:
        return False, "unsupported EC2 instance type"

    return True, None

def validate_instance_id(instance_id):
    if not instance_id:
        return False, "instance_id is required"

    if not isinstance(instance_id, str):
        return False, "instance_id must be a string"

    if not instance_id.strip():
        return False, "instance_id cannot be empty"

    if instance_id != instance_id.strip():
        return False, "instance_id cannot contain leading or trailing spaces"

    pattern = r"^i-[a-f0-9]{8,17}$"

    if not re.match(pattern, instance_id):
        return False, "invalid EC2 instance ID"

    return True, None

def validate_s3_object(bucket_name, object_key):
    if not bucket_name:
        return False, "bucket is required"

    is_valid, error_message = validate_bucket_name(bucket_name)

    if not is_valid:
        return False, error_message

    if not object_key:
        return False, "key is required"

    if not object_key.strip():
        return False, "key cannot be empty"

    if len(object_key) > 1024:
        return False, "key must not exceed 1024 characters"

    if object_key.startswith("/"):
        return False, "key cannot start with /"

    if "\\" in object_key:
        return False, "key cannot contain backslashes"

    return True, None

def validate_s3_bucket(bucket_name):
    if not bucket_name:
        return False, "bucket is required"

    return validate_bucket_name(bucket_name)

def validate_s3_upload(bucket_name, file):
    if not bucket_name:
        return False, "bucket is required"

    is_valid, error_message = validate_bucket_name(
        bucket_name
    )

    if not is_valid:
        return False, error_message

    if not file:
        return False, "file is required"

    if not file.filename:
        return False, "file name is required"

    if not file.filename.strip():
        return False, "file name cannot be empty"

    if len(file.filename) > 1024:
        return False, "file name must not exceed 1024 characters"

    file.stream.seek(0, 2)
    file_size = file.stream.tell()
    file.stream.seek(0)

    if file_size > 10 * 1024 * 1024:
        return False, "file size must not exceed 10 MB"

    return True, None 

def validate_ec2_action(instance_id):
    if not instance_id:
        return False, "instance_id is required"

    return validate_instance_id(instance_id)

def validate_s3_object_bucket(bucket_name):
    return validate_bucket_name(bucket_name)

def validate_ec2_count(min_count, max_count):
    if min_count is None:
        min_count = 1

    if max_count is None:
        max_count = 1

    if (
        isinstance(min_count, bool)
        or isinstance(max_count, bool)
        or not isinstance(min_count, int)
        or not isinstance(max_count, int)
    ):
        return False, "min_count and max_count must be integers"

    if min_count < 1:
        return False, "min_count must be at least 1"

    if max_count < 1:
        return False, "max_count must be at least 1"

    if min_count > max_count:
        return False, "min_count cannot be greater than max_count"

    if max_count > 5:
        return False, "max_count cannot exceed 5"

    return True, None