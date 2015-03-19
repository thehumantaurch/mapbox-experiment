class CreateShowTimes < ActiveRecord::Migration
  def change
    create_table :show_times do |t|
      t.references :performance
  end
end
