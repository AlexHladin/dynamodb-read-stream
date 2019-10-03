# dynamodb-read-stream
This library provides read stream implementation for DynamoDB.

## Example usage

### Query reader
```typescript 
const reader = new DocumentClientQueryReadable(
    new DocumentClient(), {
    TableName: 'someTable',
    KeyConditionExpression: 'key = :primaryKey',
    ExpressionAttributeValues: {
      ':primaryKey': 'someValue'
    },
    Limit: 50
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
const reader = new DocumentClientScanReadable(client, {
   TableName: 'someTable',
   Limit: 50
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
