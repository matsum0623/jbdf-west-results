from .core import Core

class Competition:
    @staticmethod
    def get(date:str) -> dict:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK = :sk',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COMPETITION',
                ':sk': f'DATE#{date}'
            }
        )
        return response['Items'][0] if 'Items' in response and len(response['Items']) > 0 else {}

    @staticmethod
    def list(date_start:str, date_end:str, filters) -> list:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK BETWEEN :start AND :end',
            ExpressionAttributeValues={
                ':pk': 'METADATA#COMPETITION',
                ':start': f'DATE#{date_start}',
                ':end': f'DATE#{date_end}'
            },
            FilterExpression=filters
        )
        return response['Items'] if 'Items' in response and len(response['Items']) > 0 else []