#!/bin/bash
OCC_COMMAND="sudo -E -u www-data PHP_MEMORY_LIMIT=$PHP_MEMORY_LIMIT php html/occ "

prefix=$1
start=$(($2))
end=$(($3))

i=$(($start + 1))

while [[ $i -le $end ]]; do
  username=$(printf "$prefix%05d" $i)
  $OCC_COMMAND user:del $username
  i=$(( $i + 1 ))
done