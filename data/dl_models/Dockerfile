# aws 제공 lambda base python image
FROM public.ecr.aws/lambda/python:3.10

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN yum update -y && \
    yum install -y tzdata g++ curl

# install java
RUN curl -L -O https://corretto.aws/downloads/latest/amazon-corretto-8-x64-linux-jdk.rpm && \
    yum install -y ./amazon-corretto-8-x64-linux-jdk.rpm && \
    rm -f ./amazon-corretto-8-x64-linux-jdk.rpm
ENV JAVA_HOME="/usr/lib/jvm/java-1.8.0-amazon-corretto"

# copy resources
COPY . .

# pip update 
RUN /var/lang/bin/python3.10 -m pip install --upgrade pip

# install git
RUN yum install git -y

# 미리 구성된 github clone
RUN git clone https://<깃허브개인액세스토큰>@github.com/sangwookWoo/nlp_lambda

# install packages
RUN pip install -r nlp_lambda/requirements.txt

# /var/task/ 경로로 실행파일 복사
RUN cp nlp_lambda/rating_update.py /var/task/
RUN cp -r nlp_lambda/models /var/task/
RUN cp -r nlp_lambda/plugins /var/task/

# 실행 시 lambda_function.py의 lambda_handler 함수를 실행시킴을 정의
CMD ["rating_update.lambda_handler"]