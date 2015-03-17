class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.string :show_title
      t.references :theater

      t.timestamps
    end
  end
end
