from .core import Core

class Config:
    @staticmethod
    def get(key:str) -> dict:
        response = Core.query(
            KeyConditionExpression='PK = :pk AND SK = :sk',
            ExpressionAttributeValues={
                ':pk': 'METADATA#CONFIG',
                ':sk': f'CONFIG#{key}'
            }
        )
        return response['Items'][0] if 'Items' in response and len(response['Items']) > 0 else {}
