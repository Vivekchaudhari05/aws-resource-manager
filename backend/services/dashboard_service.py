from services.resource_service import get_resource_summary


def get_dashboard_data():
    resources = get_resource_summary()

    return {
        "summary": {
            "ec2_instances": resources["ec2"]["count"],
            "s3_buckets": resources["s3"]["count"],
        },
        "resources": resources,
    }