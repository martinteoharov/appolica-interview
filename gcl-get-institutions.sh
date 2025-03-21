#!/bin/bash

country_code="$1"


curl -X GET "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=$country_code" \
        -H  "accept: application/json" \
        -H  "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNjMwNTI3LCJqdGkiOiIwYmI0ODI5ZWI0NTM0NWYxOTNmYzhlOWVjMWZlM2RlNSIsInV1aWQiOiJjNDk2YjQ5OS1jM2I3LTQyNzgtYjcxMy05MDJmMDAxMmRhMTciLCJhbGxvd2VkX2NpZHJzIjpbIjAuMC4wLjAvMCIsIjo6LzAiXX0.a75SaGzgLjTHEHD18BgRzmWJiaBO_yRZXyjRiyIEvhM"
