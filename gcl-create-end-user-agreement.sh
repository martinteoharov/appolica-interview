#!/bin/bash

curl -X POST "https://bankaccountdata.gocardless.com/api/v2/agreements/enduser/" \
  -H  "accept: application/json" \
  -H  "Content-Type: application/json" \
  -H  "Authorization: Bearer ACCESS_TOKEN" \
  -d "{\"institution_id\": \"REVOLUT_REVOGB21\",
       \"max_historical_days\": \"180\",
       \"access_valid_for_days\": \"30\",
       \"access_scope\": [\"balances\", \"details\", \"transactions\"] }"
