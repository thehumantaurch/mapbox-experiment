require 'open-uri'
require 'nokogiri'
require 'pry'

before '/' do
  doc = Nokogiri::HTML(open("http://theatrewashington.org/find-a-show?page=full"))

  shows = []
  theaters = []

  doc.css('.tw-show-list-title').each do |link|
    shows << Performance.find_or_create_by(show_title: link.content)
  end

  doc.css('.tw-theater-list-title').each do |link|
    theaters << Theater.find_or_create_by(name: link.content)
  end

  test = shows.zip(theaters)

  test.each do |combo|
    combo[0].update(theater_id: combo[1].id)
  end

end

get '/' do
  erb :index
end