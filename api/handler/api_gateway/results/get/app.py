import json
from connect_dynamodb import Competition
from datetime import datetime, timedelta

from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    print(event)

    if event['queryStringParameters'] is not None:
        qsp = event['queryStringParameters']
        start_date = qsp.get('start_date', '').replace('-', '')
        if start_date == '':
            start_date = (datetime.now() - timedelta(days=365)).strftime('%Y%m%d')
        end_date = qsp.get('end_date', '').replace('-', '')
        if end_date == '':
            end_date = datetime.now().strftime('%Y%m%d')
        name = qsp.get('name', '')
        place = qsp.get('place', '')
        class_id = qsp.get('class_id', '')
    else:
        # 指定がなければ過去1年分
        start_date = (datetime.now() - timedelta(days=365)).strftime('%Y%m%d')
        end_date = datetime.now().strftime('%Y%m%d')
        name = ''
        place = ''
        class_id = ''

    results = [{
        'date': item['SK'].split('#')[1],
        'name': item['Name'],
        'place': item['Place'],
        'classes': item['Classes'],
    } for item in sorted(Competition.list(start_date, end_date, Attr('Name').contains(name) & Attr('Place').contains(place)), key=lambda x:x['SK'], reverse=True) if class_id == '' or class_id in item['Classes']]

    response = {
        "statusCode": 200,
        "body": json.dumps(results),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept",
        },
    }
    return response
