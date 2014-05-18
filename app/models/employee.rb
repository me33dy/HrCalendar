class Employee
  include Mongoid::Document
  field :name, type: String
  field :ssn, type: Integer
  field :hiring_date, type: Date
  field :prob_expire, type: Date
  field :act_insure, type: Date
  field :ann_review, type: Date
  field :birthday, type: Date
  belongs_to :user
end
