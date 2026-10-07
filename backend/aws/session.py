import boto3

from config.settings import Config


def get_aws_session():
    return boto3.Session(
        region_name=Config.AWS_REGION
    )