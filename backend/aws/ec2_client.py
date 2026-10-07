import boto3

from config.settings import Config


def get_ec2_client():
    return boto3.client(
        "ec2",
        region_name=Config.AWS_REGION,
    )