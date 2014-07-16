class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :hiring_date, :prob_expire, :act_insure, :birthday, :ann_review, :ssn
end
