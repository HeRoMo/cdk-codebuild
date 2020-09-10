import { Construct, Stack, StackProps } from '@aws-cdk/core';
import {
  Project, BuildSpec,
  // EventAction, FilterGroup,
  Source,
  LinuxBuildImage,
  ComputeType,
} from '@aws-cdk/aws-codebuild';
import { Effect, PolicyStatement, PolicyStatementProps } from '@aws-cdk/aws-iam';

const sessionManagerPolicy: PolicyStatementProps = {
  effect: Effect.ALLOW,
  actions: [
    'ssmmessages:CreateControlChannel',
    'ssmmessages:CreateDataChannel',
    'ssmmessages:OpenControlChannel',
    'ssmmessages:OpenDataChannel',
  ],
  resources: ['*'],
};

export class CdkCodebuildStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitHubSource = Source.gitHub({
      owner: 'HeRoMo',
      repo: 'cdk-codebuild',
      webhook: false, // optional, default: true if `webhookFilters` were provided, false otherwise
      // webhookFilters: [
      //   FilterGroup.inEventOf(EventAction.PUSH).andBranchIs('master'),
      // ], // optional, by default all pushes and Pull Requests will trigger a build
    });

    const project = new Project(this, 'CdkCodeBUildSample', {
      projectName: 'cdk-codebuild-sample',
      source: gitHubSource,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_4_0,
        computeType: ComputeType.SMALL,
        privileged: true,
      },
      buildSpec: BuildSpec.fromSourceFilename('buildspec.yml'),
    });
    project.role?.addToPrincipalPolicy(new PolicyStatement(sessionManagerPolicy));
  }
}
