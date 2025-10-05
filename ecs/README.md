To build the docker image and then run the container (on an apple silicon mac), use the following command:

docker build --platform linux/amd64 -t my-selenium-app .; docker run --platform linux/amd64 --name my-selenium-container -p 4444:4444 my-selenium-app