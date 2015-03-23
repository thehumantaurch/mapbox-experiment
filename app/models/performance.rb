class Performance < ActiveRecord::Base

  extend Geocoder::Model::ActiveRecord

  geocoded_by :address
  after_validation :geocode
  has_many :show_times

end
