require 'sinatra'
require 'sinatra/reloader'
require_relative 'app\carnivore_story\carnivore.rb'
require_relative 'app\herbivore_story\herbivore.rb'

set :method_override, true
set :root, 'lib/app'
ashd;kjashd;fkjahs;djfha;skdjf
#Paths
not_found do
  erb :error
end

get '/' do
  erb :index
end

get '/death' do
  erb :death
end