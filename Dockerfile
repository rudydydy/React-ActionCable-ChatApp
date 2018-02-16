FROM ruby:2.3

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g yarn

WORKDIR /usr/src/app

COPY package.json yarn.lock Gemfile* ./
RUN yarn && bundle install

COPY . .

EXPOSE 3000
CMD ["foreman", "start", "-f", "Procfile"]
