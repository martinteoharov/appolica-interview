#!/bin/bash

curl -X POST "https://bankaccountdata.gocardless.com/api/v2/token/new/" \
        -H 'accept: application/json' \
        -H 'Content-Type: application/json' \
        -d '{
            "secret_id": "fda444ed-fd1e-4d88-b438-46d0afb3816c",
            "secret_key": "22034c1a752aa9184cf44cf758aa0bcce5268414bbef534e3094065341c3bae221b548d2996dc092a47324e228ae5902785444e153ed985af3383d6cb62d1554"
        }'
