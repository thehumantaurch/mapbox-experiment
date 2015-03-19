class CreateShowWeeks < ActiveRecord::Migration
  def change
    create_table :show_weeks do |t|
      t.references :performance
    end
  end
end
