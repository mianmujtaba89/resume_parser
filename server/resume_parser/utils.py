import re
import string


def preprocess_text(text):
    # normalize the text
    text = text.lower()

    # remove extra white spaces
    text = ' '.join(text.split())

    # remove urls
    text = re.sub(r'(https?|ftp):\/\/[^\s/$.?#].[^\s]*', '', text)

    # rmove emails
    text = re.sub(r'\S+@\S+', '', text)

    # remove html tags
    text = re.sub(r'<[^>]+>', '', text)

    # remove unicode charachters
    text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", text)

    # Remove non-printable characters
    text = ''.join(char for char in text if char in string.printable)

    # Remove special character
    text = re.sub(r'[^a-zA-Z0-9]', ' ', text)

    return text