#!/bin/sh

git clone https://github.com/hpi-schul-cloud/k6-nextcloud.git
cd k6-nextcloud
git checkout $BRANCH

K6_PROMETHEUS_RW_SERVER_URL=http://servicecenter-vminsert.servicecenterlocal/insert/0/prometheus/ \
K6_PROMETHEUS_RW_USERNAME=$SECRET_USERNAME \
K6_PROMETHEUS_RW_PASSWORD=$SECRET_PASSWORD \
k6 "$@"