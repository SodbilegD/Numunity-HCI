pipeline {
  agent any
  tools {
    git "GIT"
  }
  stages {
    stage('Clone repository') {
      steps {
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/SodbilegD/DKS.git']])
      }
    }
    stage('Build Docker image') {
      steps {
        sh'sudo docker build -t lastProject:latest .'
      }
    }
    stage('Deploy Docker image') {
      steps {
        script{
          def containcerExists = sh(script: 'sudo docker ps -a | grep lastProject-service', returnStatus: true) == 0
          if (containerExists) {
            sh 'sudo docker stop lastProject-service'
            sh 'sudo docker rm lastProject-service'
          }
        }
        sh 'sudo docker run -p 3000:3000 -d --name lastProject-service lastProject:latest'
      }
    }
  }
}
