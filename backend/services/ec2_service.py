from aws.ec2_client import get_ec2_client


def list_instances():
    client = get_ec2_client()

    response = client.describe_instances()

    instances = []

    for reservation in response.get("Reservations", []):
        for instance in reservation.get("Instances", []):
            instances.append(
                {
                    "instance_id": instance.get("InstanceId"),
                    "instance_type": instance.get("InstanceType"),
                    "state": instance.get("State", {}).get("Name"),
                    "private_ip": instance.get("PrivateIpAddress"),
                    "public_ip": instance.get("PublicIpAddress"),
                    "availability_zone": instance.get(
                        "Placement", {}
                    ).get("AvailabilityZone"),
                    "vpc_id": instance.get("VpcId"),
                    "subnet_id": instance.get("SubnetId"),
                }
            )

    return instances


def start_instance(instance_id):
    client = get_ec2_client()

    response = client.start_instances(
        InstanceIds=[instance_id]
    )

    return response


def stop_instance(instance_id):
    client = get_ec2_client()

    response = client.stop_instances(
        InstanceIds=[instance_id]
    )

    return response


def reboot_instance(instance_id):
    client = get_ec2_client()

    response = client.reboot_instances(
        InstanceIds=[instance_id]
    )

    return response


def terminate_instance(instance_id):
    client = get_ec2_client()

    response = client.terminate_instances(
        InstanceIds=[instance_id]
    )

    return response


def launch_instance(
    image_id,
    instance_type,
    min_count=1,
    max_count=1,
):
    client = get_ec2_client()

    response = client.run_instances(
        ImageId=image_id,
        InstanceType=instance_type,
        MinCount=min_count,
        MaxCount=max_count,
    )

    return response