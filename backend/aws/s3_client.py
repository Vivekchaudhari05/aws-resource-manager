import boto3

from config.settings import Config


def get_s3_client():
    return boto3.client(
        "s3",
        region_name=Config.AWS_REGION,
    )