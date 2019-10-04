import { Readable } from 'stream'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AbstractDocumentSource } from './sources'

export class AbstractReader extends Readable {
  constructor (private source: AbstractDocumentSource) {
    super({ objectMode: true })

    this.source.on('data', this.onData.bind(this))
    this.source.on('end', this.onEnd.bind(this))
  }

  _read (size: number): void {
    this.source.readStart()
  }

  onData (chunk: DocumentClient.QueryOutput) {
    this.push(chunk)
  }

  onEnd () {
    this.push(null)

    this.source.removeListener('data', this.onData)
    this.source.removeListener('end', this.onEnd)
  }
}
