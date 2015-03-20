class CreateShowTimes < ActiveRecord::Migration
  def change
    create_table :show_times do |t|
      t.references :performance
      t.datetime :day_and_time
    end
  end
end
