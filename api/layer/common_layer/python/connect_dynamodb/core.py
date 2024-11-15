import os
import boto3
from boto3.dynamodb.conditions import Key

dev = {
  'region_name': 'localhost',
  'endpoint_url': 'http://host.docker.internal:8000'
} if os.getenv('DEVELOPMENT') == 'local' else {}

dynamo = boto3.resource('dynamodb', **dev)
table_name = 'jbdf-results' if os.getenv('DEVELOPMENT') == 'local' else os.getenv('DYNAMODB_TABLE_NAME')
table = dynamo.Table(table_name)

class Core:
  @staticmethod
  def query(KeyConditionExpression, ExpressionAttributeValues, FilterExpression=None):
    options = {
      'KeyConditionExpression': KeyConditionExpression,
      'ExpressionAttributeValues': ExpressionAttributeValues,
    }
    if FilterExpression is not None:
      options['FilterExpression'] = FilterExpression

    return table.query(**options)

  @staticmethod
  def put(item):
    response = table.put_item(
      Item=item
    )
    return response

  @staticmethod
  def post(item):
    response = table.put_item(
      Item=item,
      ConditionExpression='attribute_not_exists(PK) and attribute_not_exists(SK)'
    )
    return response

  @staticmethod
  def delete(Keys):
    response = table.delete_item(
      Key=Keys
    )
    return response