import { Construct, Stack, StackProps } from '@aws-cdk/core';
import {
  Project, BuildSpec,
  // EventAction, FilterGroup,
  Source,
} from '@aws-cdk/aws-codebuild';

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

    new Project(this, 'MyProject', {
      source: gitHubSource,
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'echo "Hello, CodeBuild!"',
            ],
          },
        },
      }),
    });
  }
}
