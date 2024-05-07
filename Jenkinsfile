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
        sh'sudo docker build -t lastproject:latest .'
      }
    }
    stage('Deploy Docker image') {
      steps {
        script{
          def containcerExists = sh(script: 'sudo docker ps -a | grep lastproject-service', returnStatus: true) == 0
          if (containerExists) {
            sh 'sudo docker stop lastproject-service'
            sh 'sudo docker rm lastproject-service'
          }
        }
        sh 'sudo docker run -p 3000:3000 -d --name lastproject-service lastproject:latest'
      }
    }
  }
}
