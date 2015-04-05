class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.string :show_title
      t.string :theater_name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.date :start_date
      t.date :end_date
      t.string :genre
      t.integer :price_low
      t.integer :price_high
      t.text :buy_tickets
      t.string :days

      t.timestamps
    end
  end
end
