import { TestBed } from '@angular/core/testing';
import { AwsConfigService, AwsConfig, AWS_CONFIG } from './aws-config';

const testAwsConfig: AwsConfig = {
  region: 'us-east-1',
  accessKeyId: 'TEST_ACCESS_KEY_ID',
  secretAccessKey: 'TEST_SECRET_ACCESS_KEY'
};

describe('AwsConfigService', () => {
  let service: AwsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AWS_CONFIG, useValue: testAwsConfig }]
    });
    service = TestBed.inject(AwsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize S3 and DynamoDB clients', () => {
    expect(service.S3).toBeTruthy();
    expect(service.Dynamo).toBeTruthy();
  });
});