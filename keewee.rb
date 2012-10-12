# encoding : utf-8

# Checks if a name is composed of several words
def multiple_words?(city)
	split = city.split(' ')
	return split.length>1
end

# Checks if a word is made of a repetition
def repetition?(city)
	city = city.downcase
	middle = city.length/2
	return city[0,middle] == city[middle,4]
end

repetition?('Matamata')
