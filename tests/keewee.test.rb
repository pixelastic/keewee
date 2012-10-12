# encoding : utf-8
require 'test/unit'
require_relative '../keewee'

class KeeweeTests < Test::Unit::TestCase

	def test_multiple_words?
		assert_equal(true, multiple_words?('Te Aroha'))
		assert_equal(true, multiple_words?('Palmertson North'))
		assert_equal(false,multiple_words?('Wellington'))
	end

	def test_repetition?
		assert_equal(true, repetition?('Matamata'))
		assert_equal(false, repetition?('Eketahuna'))
	end
end
