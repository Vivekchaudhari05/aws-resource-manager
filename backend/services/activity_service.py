from datetime import datetime, timezone


activities = []


def add_activity(
    action,
    resource_type,
    resource_id,
    status="success",
):
    activity = {
        "id": len(activities) + 1,
        "action": action,
        "resource_type": resource_type,
        "resource_id": resource_id,
        "status": status,
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat(),
    }

    activities.insert(0, activity)

    return activity


def get_activities():
    return activities