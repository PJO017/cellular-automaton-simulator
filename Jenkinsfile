pipeline {
    agent any 
    stages {
        stage("build") {
            steps {
                echo "building app..."
                nodejs('NodeJS-16.15.1') {
                    sh 'unset CI'
                    sh 'npm i'
                    sh 'npm run build'
                }  
            }
        }
        stage("test") {
            steps {
                echo 'testing the application...'
                echo 'testing completed'
            }
        }
        stage("deploy") {
            steps {
                echo 'deploying the application... '   
            }
        }
    }
}
