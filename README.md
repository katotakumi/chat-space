# README

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|text|text|null: false, foreign_key: false|
|image|text|null: true, foreign_key: false|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|text|null: false, foreign_key: false|
|password|text|null: false, foreign_key: false|

### Association
- has_many :massages
- has_many :users_groups
- has_many :groups, through :users_groups


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_name|string|null: false, foreign_key: false|

### Association
- has_many :users_groups
- has_many :users, through :users_groups


## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
