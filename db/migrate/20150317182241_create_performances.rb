class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.string :show_title
      t.references :theater
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
