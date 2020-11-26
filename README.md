# circleci-find-tag

[![NPM](https://nodei.co/npm/circleci-find-tag.png)](https://nodei.co/npm/circleci-find-tag/)

## The Problem

CircleCI UI doesn't have an option to find a build by the git tag. 

## Installation

Install the package by using either

```
npm i --g circleci-find-tag
```

or

```
yarn global add circleci-find-tag
```

## Usage

```
circleci-find-tag <Repository Prefix> <CircleCi Token> <tag>
```

**Repository prefix** - part of the url uniquely identifying a project. 

app.circleci.com/pipelines/**github/org/project**

**CircleCI token** - CircleCI API access token. [Read here how to get one](https://circleci.com/docs/2.0/api-developers-guide/#add-an-api-token).

**tag** - git tag to find a build associated to

Example command:

```
circleci-find-tag github/org/project token release-1.0
```

Example output:

```
release-1.12 -> https://circleci.com/gh/org/project/3116
```