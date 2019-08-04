class Group < ApplicationRecord
  has_many :messages
  has_many :members
  has_many :user, through:  :members  
end
