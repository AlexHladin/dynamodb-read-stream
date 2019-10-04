import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AbstractReader } from './AbstractReader'
import { DynamoDbSourceQuery } from './sources'

export class DocumentClientQueryReadable extends AbstractReader {
  constructor (client: DocumentClient, request: DocumentClient.QueryInput) {
    super( new DynamoDbSourceQuery(client, request))
  }
}
