#!/bin/bash

curl --request GET \
    --url 'https://psd2api.fibank.bg/fibank-sb/psd2/v1/accounts/REPLACE_ACCOUNT-ID/transactions?dateFrom=REPLACE_THIS_VALUE&dateTo=REPLACE_THIS_VALUE&entryReferenceFrom=REPLACE_THIS_VALUE&bookingStatus=REPLACE_THIS_VALUE&deltaList=REPLACE_THIS_VALUE' \
    --header 'Accept: REPLACE_THIS_VALUE' \
    --header 'Authorization: REPLACE_THIS_VALUE' \
    --header 'Consent-ID: REPLACE_THIS_VALUE' \
    --header 'Digest: REPLACE_THIS_VALUE' \
    --header 'PSU-Accept: REPLACE_THIS_VALUE' \
    --header 'PSU-Accept-Charset: REPLACE_THIS_VALUE' \
    --header 'PSU-Accept-Encoding: REPLACE_THIS_VALUE' \
    --header 'PSU-Accept-Language: REPLACE_THIS_VALUE' \
    --header 'PSU-Device-ID: REPLACE_THIS_VALUE' \
    --header 'PSU-Geo-Location: REPLACE_THIS_VALUE' \
    --header 'PSU-Http-Method: REPLACE_THIS_VALUE' \
    --header 'PSU-ID: REPLACE_THIS_VALUE' \
    --header 'PSU-IP-Address: REPLACE_THIS_VALUE' \
    --header 'PSU-IP-Port: REPLACE_THIS_VALUE' \
    --header 'PSU-User-Agent: REPLACE_THIS_VALUE' \
    --header 'Signature: REPLACE_THIS_VALUE' \
    --header 'TPP-Signature-Certificate: REPLACE_THIS_VALUE' \
    --header 'X-IBM-Client-Id: clientId' \
    --header 'X-IBM-Client-Secret: clientSecret' \
    --header 'X-Request-ID: REPLACE_THIS_VALUE' \
    --header 'accept: application/json'
