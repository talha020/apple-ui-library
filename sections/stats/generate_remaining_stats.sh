#!/bin/bash

# This script will help track which files need to be created
# Files needed: stats-151-175.html through stats-476-500.html (14 files)

echo "Files to create:"
for i in {151..500..25}; do
    end=$((i + 24))
    echo "stats-$i-$end.html"
done
