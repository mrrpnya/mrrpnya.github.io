import os
import hashlib
from typing import Dict
# Front Matter reader
import frontmatter

def get_metadata(file_path):
    file = frontmatter.load(file_path)
    return file.metadata

def get_sha256_hash(file_path):
    # Open the file in binary mode
    with open(file_path, "rb") as f:
        # Read the contents of the file
        content = f.read()
        # Create a sha256 hash object
        sha256_hash = hashlib.sha256()
        # Update the hash object with the file content
        sha256_hash.update(content)
        # Get the hexadecimal representation of the hash
        hex_dig = sha256_hash.hexdigest()
    return hex_dig

def get_char_count(file_path):
    # Open the file in read mode
    with open(file_path, "r") as f:
        # Read the contents of the file
        content = f.read()
        # Get the character count of the content
        char_count = len(content)
    return char_count

def get_word_count(file_path):
    # Open the file in read mode
    with open(file_path, "r") as f:
        # Read the contents of the file
        content = f.read()
        # Get the word count of the content
        word_count = len(content.split())
    return word_count

# Dict of pages containing metadata (Front Matter), sha256 hash of the page content,
# page character count, page word count, and path
def get_pages_info(search_directory, root_directory):
    # Scan the search directory for .md files
    # When seeing a directory, recursively call this function

    # Initialize the dictionary
    page_info = {}

    current_directory = root_directory + search_directory

    # Get the list of files and directories in the search directory
    files = os.listdir(root_directory + search_directory)

    # Iterate over the files and directories
    for file in files:
        # Get the full path of the file
        full_path = os.path.join(current_directory, file)
        local_path = full_path.replace(root_directory, "")

        # If the file is a directory, recursively call this function
        if os.path.isdir(full_path):
            page_info.update(get_page_infos(search_directory + "/" + file, root_directory))
        # If the file is a markdown file, get the metadata
        elif file.endswith(".md"):
            # Get the metadata
            metadata = get_metadata(full_path)

            # Get the sha256 hash of the content
            sha256_hash = get_sha256_hash(full_path)

            # Get the character count of the content
            char_count = get_char_count(full_path)

            # Get the word count of the content
            word_count = get_word_count(full_path)

            # Add the metadata, sha256 hash, character count, word count, and path to the dictionary
            page_info[full_path] = {
                "local_path": local_path,
                "metadata": metadata,
                "hash": sha256_hash,
                "char_count": char_count,
                "word_count": word_count,
                "path": full_path,
            }
    
    return page_info
