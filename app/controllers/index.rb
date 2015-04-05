require 'gon-sinatra'

Sinatra::register Gon::Sinatra

get '/' do
  @performances = Performance.all
  gon.performances = @performances
  erb :index
end