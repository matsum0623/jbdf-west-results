from .core import Core

class Results:
    @staticmethod
    def get(date:str, class_id:str) -> dict:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK = :sk',
            ExpressionAttributeValues={
                ':pk': f'RESULTS#{date}',
                ':sk': f'CLASS#{class_id}'
            },
            FilterExpression=None
        )
        return response['Items'][0] if 'Items' in response and len(response['Items']) > 0 else {}
