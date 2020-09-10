#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCodebuildStack } from '../lib/cdk-codebuild-stack';

const app = new cdk.App();
new CdkCodebuildStack(app, 'CdkCodebuildStack');
