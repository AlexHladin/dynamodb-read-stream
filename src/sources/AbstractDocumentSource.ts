import { EventEmitter } from 'events'
import { DocumentClient, Key } from 'aws-sdk/clients/dynamodb'

export interface DynamoDbResponse {
  LastEvaluatedKey?: Key;
}

export abstract class AbstractDocumentSource extends EventEmitter {
  constructor (protected client: DocumentClient, protected request: DocumentClient.QueryInput | DocumentClient.ScanInput) {
    super()
  }

  readStart () {
    this.read()
      .then((response: DynamoDbResponse) => {
        if (response.LastEvaluatedKey) {
          this.request = {
            ...this.request,
            ExclusiveStartKey: response.LastEvaluatedKey
          }

          this.emit('data', response)
        } else {
          this.emit('data', response)
          this.emit('end')
        }
      })
  }

  abstract read (): Promise<DynamoDbResponse>
}
