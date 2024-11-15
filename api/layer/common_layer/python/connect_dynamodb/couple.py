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
    def list(couple_id, filters) -> list:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COUPLE',
                ':sk': f'COUPLE#{couple_id}',
            },
            FilterExpression=filters,
        )
        return response['Items'] if 'Items' in response and len(response['Items']) > 0 else []

    @staticmethod
    def get_results(couple_id) -> list:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK = :sk',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COUPLE',
                ':sk': f'RESULTS#{couple_id}',
            },
        )
        return response['Items'][0] if 'Items' in response and len(response['Items']) > 0 else {}
