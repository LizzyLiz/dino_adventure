require 'sinatra'
require 'sinatra/reloader'

set :method_override, true
set :root, 'lib/app'

#Paths
get '/herbivore' do
  erb :herb_choice_A
end

get '/herb_choice_B' do
  erb :herb_choice_B
end

get '/herb_choice_C' do
  erb :herb_choice_C
end

get '/herb_choice_D' do
  erb :herb_choice_D
end

get '/herb_choice_E' do
  erb :herb_choice_E
end

get '/herb_choice_F' do
  erb :herb_choice_F
end

get '/herb_choice_G' do
  erb :herb_choice_G
end

get '/herb_choice_H' do
  erb :herb_choice_H
end

get '/herb_choice_I' do
  erb :herb_choice_I
end

get '/herb_choice_J' do
  erb :herb_choice_J
end

get '/herb_choice_J2' do
  erb :herb_choice_J2
end