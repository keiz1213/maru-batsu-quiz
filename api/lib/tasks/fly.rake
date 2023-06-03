namespace :fly do
  task :build

  task release: 'db:migrate'

  task server: :environment do
    sh 'bin/rails server'
  end
end
