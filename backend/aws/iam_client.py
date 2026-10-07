import boto3

from config.settings import Config


def get_iam_client():
    return boto3.client(
        "iam",
        region_name=Config.AWS_REGION,
    )