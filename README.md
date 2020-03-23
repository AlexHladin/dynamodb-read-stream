# dynamodb-read-stream
An open-source tool for reading data chunk by chunk. 
This tool is created for handling DynamoDB limitation for one response (1 MB). 
This library provides read stream implementation for DynamoDB.

[![npm](https://img.shields.io/npm/v/dynamodb-read-stream.svg?style=flat-square)](https://www.npmjs.com/package/dynamodb-read-stream)

## Example usage

### Query reader
```typescript 
const reader = new DocumentClientQueryReadable(
  new DocumentClient(), {
  TableName: 'someTable',
  KeyConditionExpression: 'key = :primaryKey',
  ExpressionAttributeValues: {
    ':primaryKey': 'someValue'
  }
})
const transformOutput = new Transform({
  objectMode: true,
  transform (chunk: DocumentClient.QueryOutput, encoding: string, callback: (error?: Error, data?: any) => void): void {
    callback(undefined, JSON.stringify(chunk) + '\n')
  }
})

reader
  .pipe(transformOutput)
  .pipe(process.stdout)
```

### Scan reader
```typescript 
const client = new DocumentClient()
const reader = new DocumentClientScanReadable(client, {
  TableName: 'someTable'
});
const transformOutput = new Transform({
  objectMode: true,
  transform (chunk: DocumentClient.ScanOutput, encoding: string, callback: (error?: Error, data?: any) => void): void {
    callback(undefined, JSON.stringify(chunk) + '\n')
  }
})

reader
  .pipe(transformOutput)
  .pipe(process.stdout)
```
