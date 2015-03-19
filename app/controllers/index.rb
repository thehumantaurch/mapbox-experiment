require 'open-uri'
require 'nokogiri'
require 'pry'
require 'geocoder'
require 'gon-sinatra'

Sinatra::register Gon::Sinatra
# before '/' do
#   doc = Nokogiri::HTML(open("http://theatrewashington.org/find-a-show?page=full"))

#   shows = []
#   doc.css('.readon.blue').each do |link|
#     shows << link.attributes["href"].value
#   end

#   shows.each do |link|
#     doc = Nokogiri::HTML(open("http://theatrewashington.org/#{link}"))

#     @theater = Theater.find_or_create_by(name: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.module-inner > div > div.production-col1 > p.last > a').children.text)

#     @performance = Performance.find_or_create_by(
#       show_title: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.rt-headline').children.text.strip,
#       theater_id: @theater.id,
#       address: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.module-inner > div > div.production-col2 > div.rt-article > div.module-inner > div > div.address').children.text.strip
#       )
#   end

# end

get '/' do
  @performances = Performance.all
  gon.performances = @performances
  erb :index
end