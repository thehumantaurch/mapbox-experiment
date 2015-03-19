class Performance < ActiveRecord::Base

  extend Geocoder::Model::ActiveRecord

  belongs_to :theater
  geocoded_by :address
  after_validation :geocode
  has_one :show_week
end
