import json
import difflib

# Load JSON data into Python dictionary
def load_dictionary(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

# Function to return definition of a word
def get_definition(word, dictionary):
    word = word.lower()  # Convert word to lowercase for case insensitivity
    if word in dictionary:
        return dictionary[word]
    else:
        # If word not found, suggest similar words using difflib
        similar_words = difflib.get_close_matches(word, dictionary.keys())
        if similar_words:
            suggestion = similar_words[0]
            suggestion_definition = dictionary[suggestion]
            return f"Word not found. Did you mean '{suggestion}'? Definition: {suggestion_definition}"
        else:
            return "Word not found."

# Main function
def main():
 # File path of the dictionary JSON file
    file_path = 'C:\\Users\\USER\\Downloads\\dictionary.json'
    
    # Load dictionary data
    dictionary = load_dictionary('dictionary.json')
    
    # User input
    word = input("Enter a word: ")
    
    # Get definition
    definition = get_definition(word, dictionary)
    print(definition)

# Run the program
if __name__ == "__main__":
    main()
