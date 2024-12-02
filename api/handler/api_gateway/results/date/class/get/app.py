import json
from connect_dynamodb import Results, Competition
from util import convert_result_order

def lambda_handler(event, context):

    print(event)

    if event['pathParameters'] is not None and event['pathParameters'].get('date', '') != '' and event['pathParameters'].get('class_id', '') != '':
        pp = event['pathParameters']
        date = pp.get('date')
        class_id = pp.get('class_id')
    else:
        # 指定がないはずはないのでエラーで返す
        return {
            "statusCode": 400,
            "body": json.dumps('Bad Request'),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept",
            },
        }

    results = [{
        'couple_id': couple_id,
        'leader_name': values['Leader'],
        'partner_name': values['Partner'],
        'back_number': values['BackNumber'],
        'rank': values['Rank'],
        'result': values['Result'],
        'result_order': convert_result_order(values['Result']),
    } for couple_id, values in sorted(Results.get(date, class_id).get('Results', {}).items(), key=lambda x: x[0])]

    competition = Competition.get(date)

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "date": date,
            "name": competition.get('Name', ''),
            "place": competition.get('Place', ''),
            "class_id": class_id,
            "list": results
        }),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept",
        },
    }
    return response
