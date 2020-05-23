include .env.local
export $(shell sed 's/=.*//' .env.local)

build:
	docker image build -t ${CI_IMAGE_TAG} .

run:
	 docker run -rm -p 8081:8081 --name api ${CI_IMAGE_TAG}

push:
	docker logout ${CI_REGISTRY} \
	&& docker login -u ${CI_REGISTRY_USER} -p ${CI_REGISTRY_PASSWORD} ${CI_REGISTRY} \
	&& docker push ${CI_IMAGE_TAG}
