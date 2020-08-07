# README

Includes usage of -
  * Layout, partial layout and views
  * Model level validations
  * Sessions
  * Sql 
  * Angular controllers
  * Angular grid
  * String constants in a file
  * Service class for CRUD
  * Transactions
  * Logger


Version of tools used -
  * Ruby 2.6.5
  * Rails 5.2.4.1
  * AngularJS v1.7.9
  * MYSQL 5.7.31 


Config files to refer to -
  * Gemfile
  * Bowerfile
  * db/migrate/{model files}.rb
  * db/migrate/schema.rb, gets created when migration is done for models, rake db:migrate
  * config/routes.rb, defines URLs redirection to controller's actions
  * config/database.yml, development section for sql
  * config/application.rb for assets path
  * config/environments.rb for logger configuration


Javascript
  * Angular moddule is initialized in app/assets/javascripts/angular/app.js
  * Angular controller for Employees view is defined in app/assets/javascripts/controllers/employees.js
  * Util js methods are defined in app/assets/javascripts/utils/grid_util.js
  * JS files to load are defined in app/assets/javascripts/application.js


CSS
  * Stylesheets are defined in app/assets/stylesheets


Views and layouts
  * Views are defined under app/views
  * Layouts are defined under app/views/layouts
  * layouts/application.html.erb is common layout
  * _header.html.erb is partial layout used in application.html.erb
  * layouts/employees.html.erb is layout for employees controller's actions
  * _employee.html.erb is partial layout used in employees/show.html.erb
  * views are loaded in <%= yield %> defined in application.html.erb or employees.html.erb
  

Controllers and actions
  * defined in app/controllers, app/models


Service class
  * services/employees_crud.rb to handle CRUD operations for the employee


Constant file
  * defined in app/helpers/message_constants.rb 


Some steps done while creating the project-
  * run bundle
    command - bundle    

  * activate the line gem 'bcrypt' and deactivate the line gem 'jbuilder' in the file
    Install password encryption gem
    commnad - gem install bcrypt
    commnad - bundle install

  * create a controller
    command -rails g controller Home index

  * create a model
    command - rails g model User first_name last_name age email password:digest  
    model file created under rails_usage/db/migrate

  * install sql
    commands - install mysql gem
               sudo apt-get install libmariadb-dev
               gem install mysql2
    configuration in database.yml under "development" section, add user name and password
    
  * create db
    command - rake db:migrate  

  * add path in routes.rb
    root home#index'  

  * Bowerfile is used to install angular under vendor directory
    add gem 'bower-rails' in Gem file
    commands - sudo npm install -g bower
              rails g bower_rails:initialize
    to the Bowerfile, add - asset 'angular'
                           asset 'bootstrap'
    commands - bundle install
              rake bower:install
    by running this command, Bower will download all needed assets and dependencies to the vendor/assets/bower_components directory.
    include them. To do so, edit the application.js file and override it with:
     //= require angular
     //= require_tree .
    remove turbolinks from the application.html.erb file

  * config assets path are defined in application.rb
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

  
start server
  command -  bin/rails server
  will fire up Puma, a web server distributed with Rails by default.  

           

 
 