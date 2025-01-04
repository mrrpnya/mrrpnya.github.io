import json
import datetime
import pages
import os
import hashlib
import xml.etree.ElementTree as ET
from xml.dom import minidom

# Function for sorted() to sort the XML <item>s by pubDate
def sort_func(x):
    if x.find("pubDate") is not None:
        x.find("pubDate").text
        return x.find("pubDate").text
    else:
        return ""

    


# Take a JSON file and generate an RSS XML string
# Schema:
def history_to_rss(history):
    # Load the history JSON string into a dictionary
    history_dict = json.loads(history)

    # First, iterate over the posts in order of dates, recent to oldest
    # Then, each iteration, add the RSS item to the root
    # Finally, return the XML string
    root = ET.Element("rss")
    root.set("version", "2.0")
    channel = ET.SubElement(root, "channel")
    title = ET.SubElement(channel, "title")
    title.text = "TheFelidae's Blog Updates"
    link = ET.SubElement(channel, "link")
    link.text = "https://thefelidae.github.io"
    description = ET.SubElement(channel, "description")
    description.text = "This feed displays updates regarding TheFelidae's blog."

    for post in history_dict["post_history"]:
        for date, posts in post.items():
            for post in posts:
                for path, page in post.items():
                    item = ET.SubElement(channel, "item")
                    title = ET.SubElement(item, "title")
                    link = ET.SubElement(item, "link")
                    link.text = "https://thefelidae.github.io/blog/?post=" + path
                    description = ET.SubElement(item, "description")
                    print(page)
                    if "op" in page:
                        if page["op"] == "delete":
                            title.text = "Deleted article: " + page["title"]
                        elif page["op"] == "edit":
                            title.text = "Edited article: " + page["title"]
                            description.text = "Edited this article: It now sits at " + str(page["char_count"]) + " characters and " + str(page["word_count"]) + " words"
                            description.text += "\n\n" + page["description"]
                        elif page["op"] == "add":
                            title.text = "New article: " + page["title"]
                            description.text = page["description"]
                    else:
                        title.text = "Article: " + page["title"]
                        description.text = "" + page["description"]

                    guid = ET.SubElement(item, "guid")
                    # Take current contents of XML and hash it
                    # Then, set the guid to the hash
                    guid.text = hashlib.sha256(ET.tostring(root, encoding="unicode").encode()).hexdigest()
                    # It's not isPermaLink
                    guid.set("isPermaLink", "false")
                    pubDate = ET.SubElement(item, "pubDate")
                    # Must be formatted as RFC 822 - Current format is 2025-01-01 00:00:00
                    pubDate.text = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S").strftime("%a, %d %b %Y %H:%M:%S +0000")

                    category = ET.SubElement(item, "category")
                    # For each tag, add a category
                    for tag in page["tags"]:
                        category.text = tag
                        
    # Ensure the XML <item>s are sorted by date, newest first
    # This is done by sorting the children of the channel element
    # based on the pubDate element
    channel[:] = sorted(channel, key=sort_func, reverse=True)

    # Return the pretty-printed XML string
    return minidom.parseString(ET.tostring(root)).toprettyxml()

# Print the RSS XML string from assets/post_history.json
post_history = open("assets/meta/post_history.json", "r").read()

rss_xml = history_to_rss(post_history)
print(rss_xml)

# Write the RSS XML string to public/rss.xml
rss_file = open("public/rss.xml", "w")
rss_file.write(rss_xml)