import boto3
from boto3.dynamodb.conditions import Key, Attr

session = boto3.Session(profile_name='default')

dynamodb_client = boto3.client('dynamodb',endpoint_url='http://localhost:8000')


response = dynamodb_client.create_table(
    TableName='jbdf-results',
    AttributeDefinitions=[
        {
            'AttributeName': 'PK',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'SK',
            'AttributeType': 'S'
        },
    ],
    KeySchema=[
        {
            'AttributeName': 'PK',
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'SK',
            'KeyType': 'RANGE'
        },
    ],
    BillingMode='PAY_PER_REQUEST',
    TableClass='STANDARD',
    DeletionProtectionEnabled=True,
)
