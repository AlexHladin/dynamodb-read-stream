import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AbstractReader } from './AbstractReader'
import { DynamoDbSourceScan } from './sources'

export class DocumentClientScanReadable extends AbstractReader {
  constructor (client: DocumentClient, request: DocumentClient.ScanInput) {
    super(new DynamoDbSourceScan(client, request))
  }
}
