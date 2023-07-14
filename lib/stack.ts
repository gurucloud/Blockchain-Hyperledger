import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CfnOutput } from 'aws-cdk-lib';

export interface ManagedBlockchainConstructProps {
  networkId: string;
  memberName: string;
  peerName: string;
}

export class ManagedBlockchainConstruct extends Construct {
  constructor(scope: Construct, id: string, props: ManagedBlockchainConstructProps) {
    super(scope, id);

    const createMemberLambda = new LambdaFunction(this, 'CreateMemberLambda', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: Code.fromAsset('path/to/your/code'),
      environment: {
        NETWORK_ID: props.networkId,
        MEMBER_NAME: props.memberName,
      },
    });

    const createPeerNodeLambda = new LambdaFunction(this, 'CreatePeerNodeLambda', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: Code.fromAsset('path/to/your/code'),
        environment: {
          NETWORK_ID: props.networkId,
          PEER_NAME: props.peerName,
        },
      });

    createMemberLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['managedblockchain:CreateMember'],
        resources: ['*'],
      })
    );

    createPeerNodeLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['managedblockchain:CreateNode'],
        resources: ['*'],
      })
    );

    new CfnOutput(this, 'MemberIdOutput', {
      value: createMemberLambda.functionName,
      description: 'Member created with ID',
    });

    new CfnOutput(this, 'PeerNodeIdOutput', {
      value: createPeerNodeLambda.functionName,
      description: 'Peer node created with ID',
    });
  }
}
