import { Construct, Stack, StackProps } from '@aws-cdk/core';
import {
  Project, BuildSpec,
  // EventAction, FilterGroup,
  Source,
  LinuxBuildImage,
  ComputeType,
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

    const project = new Project(this, 'CdkCodeBUildSample', {
      projectName: 'cdk-codebuild-sample',
      source: gitHubSource,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_4_0,
        computeType: ComputeType.SMALL,
        privileged: true,
      },
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        env: {
          shell: 'bash',
        },
        phases: {
          build: {
            commands: [
              'echo "Hello, CodeBuild!"',
              'codebuild-breakpoint',
            ],
          },
        },
      }),
    });
  }
}
