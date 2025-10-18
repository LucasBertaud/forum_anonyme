terraform {
  cloud {
    organization = "forum-anonyme"

    workspaces {
      name = "aws-infra"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}