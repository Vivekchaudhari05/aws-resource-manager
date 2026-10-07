from services.ec2_service import list_instances
from services.s3_service import list_buckets


def get_resource_summary():
    instances = list_instances()
    buckets = list_buckets()

    return {
        "ec2": {
            "count": len(instances),
            "instances": instances,
        },
        "s3": {
            "count": len(buckets),
            "buckets": buckets,
        },
    }