#!/bin/bash
OCC_COMMAND="sudo -E -u www-data PHP_MEMORY_LIMIT=$PHP_MEMORY_LIMIT php html/occ "

secretsalt=<REPLACE>

prefix=$1
start=$(($2))
end=$(($3))

i=$(($start + 1))

while [[ $i -le $end ]]; do
  username=$(printf "$prefix%05d" $i)
  export OC_PASS=$(echo -n "$username$secretsalt" | md5sum | awk '{print $1}')
  $OCC_COMMAND user:add --password-from-env --display-name="$username" --group=users $username
  i=$(( $i + 1 ))
done