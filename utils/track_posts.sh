#!/bin/sh

# This is meant to track the contents of /public/blog/*.md
# to maintain an up-to-date list of blog posts.
#
# It outputs JSON to stdout:
# Given a file /public/blog/2019-01-01-foo-bar.md of contents:
#
# ---
# title: Foo Bar
# date: 2019-01-01
# arbitrary_key: arbitrary_value
# ---
# # Foo Bar
#
# it will output:
# {
#     posts: [
#         {
#           id: "2019-01-01-foo-bar",
#           title: "Foo Bar",
#           date: "2019-01-01",
#           arbitrary_key: "arbitrary_value",
#           url: "/blog/2019-01-01-foo-bar"
#         }
#     ]
# }

# It should also read the YAML Front Matter of each post
# and place all the keys in the JSON output.

# The script should be run from the root of the project.

# SCRIPT ENTRY
echo "{"
echo "  \"posts\": ["

# Front-Matter Extraction (procedure)
# Given data, extract the YAML Front Matter header
# and output it as JSON.
extract_front_matter() {
    local data="$1"

    # Remove everything after the second '---'
    # make sure everything between the first and second '---' is the front matter
    # use awk
    local front_matter=$(echo "$data" | awk '/---/ && !f {f=1; next} f; /---/ {exit}')

    echo "$front_matter" | sed '1d;$d' | sed 's/^/    "/' | sed 's/: /": "/' | sed 's/$/"/' | tr '\n' ',' | sed 's/,$//' | sed 's/"tags": "\[\(.*\)\]"/"tags": \[\1\]/g' | sed "s/'/\"/g"
}

# Find files via Regex
# Find all files in /public/blog/*.md
# Process and extract the front matter of each file.
# Output the JSON representation of the front matter.
extract_files() {
    local files=$(find public/blog -type f -name "*.md")
    for file in $files; do
        # Enter, create {} for each file
        echo "    {"

        echo "      \"metadata\": {"

        local data=$(cat $file)
        local front_matter=$(extract_front_matter "$data")
        echo "$front_matter"

        echo "      },"

        # Add the id and url
        local id=$(echo "$file" | sed 's/public\/blog\///' | sed 's/\.md//')
        echo "      \"id\": \"$id\","
        echo "      \"url\": \"/blog/$id.md\""

        # Exit, close {} for each file 
        echo "    },"
    done
}

# Process all files
extract_files | sed '$s/,$//'

# SCRIPT EXIT
echo "  ]"
echo "}"