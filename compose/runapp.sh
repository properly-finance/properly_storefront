#!/bin/bash

set -Eeo pipefail

BASE_DIR=/usr/local/lib/$PROJECT\_$SERVICE
cd $BASE_DIR

eval $(echo $COMMAND | sed -r 's/@/$/g')
