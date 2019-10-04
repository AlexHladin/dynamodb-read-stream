import { SourceQuery } from '../interfaces'
import { AbstractDocumentSource } from './AbstractDocumentSource'
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'

export class DynamoDbSourceScan extends AbstractDocumentSource implements SourceQuery {
  read (): Promise<DocumentClient.QueryOutput> {
    return this.client.scan(this.request).promise()
  }
}
