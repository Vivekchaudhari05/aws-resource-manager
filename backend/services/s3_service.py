from aws.s3_client import get_s3_client


def list_buckets():
    client = get_s3_client()

    response = client.list_buckets()

    buckets = []

    for bucket in response.get("Buckets", []):
        buckets.append(
            {
                "name": bucket.get("Name"),
                "created_at": bucket.get("CreationDate").isoformat()
                if bucket.get("CreationDate")
                else None,
            }
        )

    return buckets
def list_objects(bucket_name):
    client = get_s3_client()

    response = client.list_objects_v2(
        Bucket=bucket_name
    )

    objects = []

    for obj in response.get("Contents", []):
        objects.append(
            {
                "key": obj.get("Key"),
                "size": obj.get("Size"),
                "last_modified": obj.get("LastModified").isoformat()
                if obj.get("LastModified")
                else None,
            }
        )

    return objects
def create_bucket(bucket_name):
    client = get_s3_client()

    response = client.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={
            "LocationConstraint": "ap-south-1"
        },
    )

    return response
def upload_object(bucket_name, file_name, file_data):
    client = get_s3_client()

    response = client.put_object(
        Bucket=bucket_name,
        Key=file_name,
        Body=file_data,
    )

    return response
def delete_object(bucket_name, object_key):
    client = get_s3_client()

    response = client.delete_object(
        Bucket=bucket_name,
        Key=object_key,
    )

    return response
def download_object(bucket_name, object_key):
    client = get_s3_client()

    response = client.get_object(
        Bucket=bucket_name,
        Key=object_key,
    )

    return response