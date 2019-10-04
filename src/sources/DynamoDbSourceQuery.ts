import { AbstractDocumentSource } from './AbstractDocumentSource'
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'

export class DynamoDbSourceQuery extends AbstractDocumentSource {
  read (): Promise<DocumentClient.QueryOutput> {
    return this.client.query(this.request).promise()
  }
}
