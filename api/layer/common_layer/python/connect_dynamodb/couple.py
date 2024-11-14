from .core import Core

class Couple:
    @staticmethod
    def get(couple_id:str) -> dict:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK = :sk',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COUPLE',
                ':sk': f'COUPLE#{couple_id}'
            }
        )
        return response['Items'][0] if 'Items' in response and len(response['Items']) > 0 else {}

    @staticmethod
    def list(couple_id, filters, limit=100) -> list:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COUPLE',
                ':sk': f'COUPLE#{couple_id}',
            },
            FilterExpression=filters,
            limit=limit,
        )
        return response['Items'] if 'Items' in response and len(response['Items']) > 0 else []