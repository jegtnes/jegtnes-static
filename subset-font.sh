#!/bin/zsh

output=""

find "./dist" -name "*.html" | while IFS= read -r file
do
    result=$(glyphhanger "$file" --jsdom < /dev/null)

    if [ -n "$result" ] && [ -z "$output" ]; then
        output="$result"
    elif [ -n "$result" ]; then
        output="$output,$result"
    fi
done

echo "$output"

# glyphhanger --whitelist=[the-output-of-this-command] --subset="src/assets/fonts/Fraunces/Fraunces.ttf" --formats=woff2