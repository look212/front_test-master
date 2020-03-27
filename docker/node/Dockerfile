FROM ubuntu:19.10
RUN mkdir /code
WORKDIR /code
ADD ./ /code/

RUN apt-get update
RUN apt-get install -y curl

ENV HOME /root
ENV NVM_DIR $HOME/.nvm
ENV NODE_VERSION 12.14.1

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g yarn \
    && yarn

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

EXPOSE 3000

CMD [ "yarn", "start"]

