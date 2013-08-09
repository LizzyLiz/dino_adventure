require 'sinatra'
require 'sinatra/reloader'
require_relative 'app\carnivore_story\carnivore.rb'
require_relative 'app\herbivore_story\herbivore.rb'

set :method_override, true
set :root, 'lib/app'

#Paths
not_found do
  erb :error
end

get '/' do
  erb :index
end

get '/carn_death' do
  erb :carn_death
end

get '/herb_death' do
  erb :herb_death 
end

get '/triceratops_death' do
  erb :triceratops_death
end

get '/rex_fight' do
  erb :rex_fight
end