import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    AWS_REGION = os.getenv(
        "AWS_REGION",
        "ap-south-1",
    )

    FLASK_ENV = os.getenv(
        "FLASK_ENV",
        "development",
    )

    DEBUG = FLASK_ENV == "development"