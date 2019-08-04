# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|unique: true|
### Association
- has_many :messages
- has_many :members
- has_many :groups, through:  :members

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
### Association
- has_many :messages
- has_many :members
- has_many :user, through:  :members


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body  |text|       |
|image |string|       |
|user |references| foreign_key: true|
|group |references| foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user