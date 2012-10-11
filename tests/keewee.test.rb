# encoding : utf-8
require 'test/unit'
require '../keewee'

class KeeweeTests < Test::Unit::TestCase

	def test_multiple_words?
		assert_equal(true, multiple_words?('Te Aroha'))
		assert_equal(true, multiple_words?('Palmertson North'))
		assert_equal(false,multiple_words?('Wellington'))
	end
end
