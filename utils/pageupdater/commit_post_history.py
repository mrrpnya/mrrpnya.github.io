import json
import pages
import datetime
import os
import hashlib

# Create a JSON string that stores information about each page over time
# Schema:
# {
#  "last_generated": "2025-01-01 00:00:00",
#  "post_history": [
#    {
#      "2025-01-01": [
#        {
#          "/blog/test.md": {
#             "op": "add", # add, edit, delete
#             "hash": "SHA256 HERE",
#             "char_count": 1234,
#             "word_count": 123,
#             "title": "Test",
#             "description": "This is a test"
#          }
#        }
#      ]
#    }
#  ]
# }
# pages_info is to be sourced from pages, and state is the JSON string of the previous state
# This will check for added, removed, and edited pages compared to the state and append the changes
def generate_post_history(pages_info, state):
    # Load the state JSON string into a dictionary
    state_dict = json.loads(state)

    # Get the current date and time
    current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Initialize the post history list
    post_history = []

    # Build a dict of files and their hashes from the current state
    # Build from least recent to most recent, including deletes
    current_files = dict()
    for post in state_dict["post_history"]:
        for date, posts in post.items():
            for post in posts:
                for path, page in post.items():
                    if "op" in page:
                        if page["op"] == "delete":
                            if path in current_files:
                                del current_files[path]
                        else:
                            current_files[path] = page
                    else:
                        current_files[path] = page

    print(current_files)

    # Check for deleted files
    for path, page in current_files.items():
        if path not in pages_info:
            post_history.append({path: 
                {
                    "op": "delete", "hash": page["hash"], "title": page["title"]
                }})

    # Use the map of hashes to compare with the current pages_info 
    # to identify adds and edits
    for path, page in pages_info.items():
        if path in current_files:
            if current_files[path]["hash"] != page["hash"]:
                post_history.append({path: 
                    {
                        "op": "edit", "hash": page["hash"], 
                        "char_count": page["char_count"], 
                        "word_count": page["word_count"],
                        "title": page["metadata"]["title"],
                        "description": page["metadata"]["description"],
                        "tags": page["metadata"]["tags"]
                    }})
        else:
            post_history.append({path: 
                {
                    "op": "add", "hash": page["hash"], 
                    "char_count": page["char_count"], 
                    "word_count": page["word_count"],
                    "title": page["metadata"]["title"],
                    "description": page["metadata"]["description"],
                    "tags": page["metadata"]["tags"]
                }})

    # Append the post history list to the state dictionary
    state_dict["post_history"].append({current_date: post_history})

    # Update the last_generated field
    state_dict["last_generated"] = current_date

    # Convert the dictionary to a JSON string
    post_history_json = json.dumps(state_dict, indent=2)

    # Return the JSON string
    return post_history_json
    
# Get the pages info from the public/blog directory
pages_info = pages.get_pages_info("", "public/blog")

# Load the previous state from the assets/post_history.json file
try:
    with open("assets/post_history.json", "r") as f:
        state = f.read()
except FileNotFoundError:
    state = "{\"post_history\": []}"


# Generate the post history JSON string
post_history = generate_post_history(pages_info, state)

# Output to assets/post_history.json (overwriting)
with open("assets/meta/post_history.json", "w") as f:
    f.write(post_history)