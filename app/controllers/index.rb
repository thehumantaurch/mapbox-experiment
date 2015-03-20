require 'open-uri'
require 'nokogiri'
require 'pry'
require 'geocoder'
require 'gon-sinatra'

Sinatra::register Gon::Sinatra
enable :sessions

before '/' do
  if request.cookies['cookie'] == nil
    response.set_cookie('cookie', :value => session[:session_id], :path => '/', :expires => Time.now + 604800)

    doc = Nokogiri::HTML(open("http://theatrewashington.org/find-a-show?page=full"))

    shows = []
    doc.css('.readon.blue').each do |link|
      shows << link.attributes["href"].value
    end

    shows.each do |link|
      doc = Nokogiri::HTML(open("http://theatrewashington.org/#{link}"))

      @theater = Theater.find_or_create_by(name: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.module-inner > div > div.production-col1 > p.last > a').children.text)

      @performance = Performance.find_or_create_by(
        show_title: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.rt-headline').children.text.strip,
        theater_id: @theater.id,
        address: doc.css('#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.module-inner > div > div.production-col2 > div.rt-article > div.module-inner > div > div.address').children.text.strip,
        buy_tickets: doc.css("#rt-main > div > div.rt-grid-12 > div > div > div > div.rt-module-inner > div > div > div.rt-article > div.module-inner > div > div.production-col1 > a")[0].attributes["href"].value,
        start_date: doc.css("#performances-curtain-times > caption > span > span:nth-child(1)").children.text,
        end_date: doc.css("#performances-curtain-times > caption > span > span:nth-child(2)").children.text,
        genre: doc.css("#performances-description-specifics").children.children.children.text.split("\t\t\t")[1].strip,
        price_range: doc.css("#performances-description-specifics").children.children.children.text.split("\t\t\t")[-1].strip
        )
    end
  end
end

get '/' do
  @performances = Performance.all
  gon.performances = @performances
  erb :index
end