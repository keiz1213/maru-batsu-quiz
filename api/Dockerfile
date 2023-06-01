FROM ruby:3.2.2
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client cron
WORKDIR /app
ENV HOME=/app \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo
COPY Gemfile* ./
RUN bundle install -j4
COPY . .
CMD ["rails", "server", "-b", "0.0.0.0"]
