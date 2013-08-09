require 'sinatra'
require 'sinatra/reloader'

set :method_override, true
set :root, 'lib/app'

#Paths
get '/carnivore' do
  erb :carn_choice_A
end

get '/carn_choice_B' do
  erb :carn_choice_B
end

get '/carn_choice_C' do
  erb :carn_choice_C
end

get '/carn_choice_D' do
  erb :carn_choice_D
end

get '/carn_choice_E' do
  erb :carn_choice_E
end

get '/carn_choice_F' do
  erb :carn_choice_F
end

get '/carn_choice_G' do
  erb :carn_choice_G
end

get '/carn_choice_H' do
  erb :carn_choice_H
end

get '/carn_choice_I' do
  erb :carn_choice_I
end

get '/carn_choice_J' do
  erb :carn_choice_J
end

get '/carn_choice_J2' do
  erb :carn_choice_J2
end

get '/carn_eats' do
  erb :carn_eats
end

get '/carn_run' do
  erb :carn_run
end