import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';


// import * as sqs from 'aws-cdk-lib/aws-sqs';
export class NetworkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

 const vpc = new ec2.Vpc(this, 'demo-vpc', {

    cidr: '10.0.0.0/16',
    natGateways: 0,
    maxAzs: 3,
    subnetConfiguration: [
      {
        name: 'public-subnet-1',
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24,
      },

      {
        name: 'private-subnet',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 28,
      },

    ],

  });

  // 👇 create a security group for the EC2 instance



  // 👇 create the EC2 instance



    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
