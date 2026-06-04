import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export interface AwsConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export const AWS_CONFIG = new InjectionToken<AwsConfig>('AWS_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class AwsConfigService {
  private s3Client: S3Client;
  private dynamoClient: DynamoDBDocumentClient;

  constructor(@Inject(AWS_CONFIG) @Optional() private config?: AwsConfig) {
    if (!this.config?.region || !this.config?.accessKeyId || !this.config?.secretAccessKey) {
      throw new Error('AWS_CONFIG provider is required with region, accessKeyId, and secretAccessKey');
    }

    this.s3Client = new S3Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      }
    });

    const dynamoDBClient = new DynamoDBClient({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      }
    });

    this.dynamoClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  get S3(): S3Client {
    return this.s3Client;
  }

  get Dynamo(): DynamoDBDocumentClient {
    return this.dynamoClient;
  }
}