#!/bin/zsh

output=""

find "./dist" -name "*.html" | while IFS= read -r file
do
    result=$(glyphhanger "$file" --jsdom < /dev/null)

    if [ -z "$output" ]; then
        output="$result"
    else
        output="$output,$result"
    fi
done

echo "$output"