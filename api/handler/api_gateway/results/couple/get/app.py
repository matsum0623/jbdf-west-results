import json
from connect_dynamodb import Couple

from boto3.dynamodb.conditions import Attr

def lambda_handler(event, context):

    print(event)

    if event['queryStringParameters'] is not None:
        couple_id = event.get('queryStringParameters', {}).get('couple_id', '')
        leader_name = event.get('queryStringParameters', {}).get('leader_name', '')
        partner_name = event.get('queryStringParameters', {}).get('partner_name', '')
    else:
        couple_id = ''
        leader_name = ''
        partner_name = ''

    results = [{
        'couple_id': item['SK'].split('#')[1],
        'leader_name': item['Leader'],
        'partner_name': item['Partner'],
    } for item in Couple.list(couple_id, Attr('Leader').contains(leader_name) & Attr('Partner').contains(partner_name), limit=100)]

    response = {
        "statusCode": 200,
        "body": json.dumps(results),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept",
        },
    }
    return response
