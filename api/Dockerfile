FROM node:16

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Add and configure Tini for process management
# https://github.com/krallin/tini
ENV TINI_VERSION v0.19.0
RUN wget https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini -O /tini
RUN chmod +x /tini

# Copy in the API files
WORKDIR /app
COPY . .

# Pass NPM token into the container
ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

# Install package dependencies and transpile the app.
SHELL ["/bin/bash", "-c"]
RUN npm install && \
    npm run build

# When running in docker, default the profile to production.
ENV NODE_ENV production

# Configure the entrypoint to run our shell script using Tini
# Tini manages forwarding any signals to all child processes so we always clean up
# the codemeter license before the docker container quits
ENTRYPOINT ["/tini", "-g", "--", "/app/scripts/docker_entrypoint.sh"]