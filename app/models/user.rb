class User
  include Mongoid::Document

	attr_accessor :password

  field :username, type: String
  field :email, type: String
  field :salt, type: String
  field :hashed_password, type: String

  validates_uniqueness_of :email
  
  has_many :employees, dependent: :destroy


  def authenticate(password)
  	self.hashed_password == BCrypt::Engine.hash_secret(password, self.salt)
  end
	#this line has to be here. 
	before_save :hashed_word
  private
  def hashed_word
  	self.salt = BCrypt::Engine.generate_salt
  	self.hashed_password = BCrypt::Engine.hash_secret(self.password, self.salt)
  	self.password = nil 
  end


end
