import json
import pages
import datetime

# Output JSON string in this schema:
# {
#  "posts": [
#    {
#      "metadata": {
#    "description": "A guide to using RomFS on the 3DS. (Old)",    "date": "2025-01-01",    "tags": ["3ds", "programming", "c", "devkitpro", "old"],    "previous": "old3ds_helloworld.md",    "next": "old3ds_touchscreen.md"
#      },
#      "id": "old3ds_romfs",
#      "url": "/blog/old3ds_romfs.md"
#    },
#    {
#      "metadata": {
#    "description": "A curated list of awesome stuff I like",    "date": "2024-11-26",    "tags": ["awesome", "curated"]
#      },
#      "id": "awesome",
#      "url": "/blog/awesome.md"
#    },
def generate_page_list(pages_info):
    # Initialize the list of pages
    page_list = []
    # Iterate over the pages_info dictionary
    for path, page in pages_info.items():
        # Create a dictionary with the metadata and path of the page
        page_dict = {
            "metadata": page["metadata"],
            'id': page["local_path"],
            # Remove the public/ prefix from the path
            'url': page["absolute_path"].replace("public", ""),
            "hash": page["hash"],
        }

        # Append the page dictionary to the page list
        page_list.append(page_dict)

    # Change any dates in metadata.date to a "YYYY-MM-DD" format string
    for page in page_list:
        if "date" in page["metadata"]:
            page["metadata"]["date"] = page["metadata"]["date"].strftime("%Y-%m-%d")

    # Create a dictionary with the page list
    page_list_dict = {
        "last_generated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "posts": page_list
        }
    # Convert the dictionary to a JSON string
    page_list_json = json.dumps(page_list_dict, indent=2)
    # Return the JSON string
    return page_list_json

# Print the page list
post_list = generate_page_list(pages.get_pages_info("", "public/blog"));
print(post_list)

# Output to assets/blog_list.json (overwriting)
with open("assets/blog_list.json", "w") as f:
    f.write(post_list)
