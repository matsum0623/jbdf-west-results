import json
from connect_dynamodb import Couple

from boto3.dynamodb.conditions import Attr

def lambda_handler(event, context):

    print(event)

    if event['pathParameters'] is not None and event['pathParameters'].get('couple_id', '') != '':
        pp = event['pathParameters']
        couple_id = pp.get('couple_id')
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

    # TODO: 最大件数を指定する？
    couple_results = Couple.get_results(couple_id)
    couple_info = Couple.get(couple_id)
    response_data = {
        'couple_id': couple_id,
        'leader_name': couple_info.get('Leader', ''),
        'partner_name': couple_info.get('Partner', ''),
        'results_list': [{
            'date': key.split('#')[0],
            'class_id': key.split('#')[1],
            'competition_name': result.get('CompetitionName', ''),
            'competition_place': result.get('CompetitionPlace', ''),
            'rank': result.get('Rank', ''),
            'back_number': result.get('BackNumber', ''),
            'result': result.get('Result', '')
        } for key, result in sorted(couple_results.get('Results', {}).items(), key=lambda x: x[0], reverse=True)]
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(response_data),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept",
        },
    }
    return response
