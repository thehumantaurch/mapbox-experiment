require 'geocoder'

class Performance < ActiveRecord::Base

  extend Geocoder::Model::ActiveRecord
  Geocoder::Configuration.timeout = 30

  geocoded_by :address
  after_validation :geocode
  has_many :show_times

end
