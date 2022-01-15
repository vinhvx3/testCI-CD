pipeline {

  agent none

  environment {
    DOCKER_IMAGE = "vinhvo2103/test-jenkin001"
  }

  stages {
    stage("Test") {
      agent {
          docker {
            image 'node:12-alpine'
            args '-u 0:0 -v /tmp:/root/.cache'
          }
      }
      steps {
        sh "pip install poetry"
        sh "poetry install"
        sh "poetry run pytest"
      }
    }

    stage("build") {
      agent { node {label 'master'}}
      environment {
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
      }
      steps {
        sh "sudo docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . "
        sh "sudo docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
        sh "sudo docker image ls | grep ${DOCKER_IMAGE}"
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            sh "sudo docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "sudo docker push ${DOCKER_IMAGE}:latest"
        }

        //clean to save disk
        sh "sudo docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
        sh "sudo docker image rm ${DOCKER_IMAGE}:latest"
      }
    }
  }

  post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
}