class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :group_name, null: false
      t.references :user, foreign_key: true
      t.timestamps null: false
    end
  end
end
