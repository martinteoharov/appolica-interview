Generate TLS certificates:

```bash
# make sure you create the certs directory
mkdir certs

openssl genrsa -out certs/key.pem 2048
openssl req -new -sha256 -key certs/key.pem -out certs/csr.csr -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"
openssl req -x509 -sha256 -days 365 -key certs/key.pem -in certs/csr.csr -out certs/cert.pem
```

Install node dependencies:
```bash
bun install
```

Set up and `.env` in the project root and fill in the following values:
```
XERO_CLIENT_ID=
XERO_CLIENT_SECRET=
XERO_REDIRECT_URI=
XERO_BANK_ACCOUNT_ID=
XERO_EMAIL=
XERO_PASSWORD=

GC_ACCESS_TOKEN=
GC_REDIRECT_URI=
GC_INSTITUTION_ID=
GC_SANDBOX=
```




---
# Steps



Виждам, че PSD2 е EU стандарт, който задължава банките да следват някои правила с цел подобряване на банковите услуги.

## 1. DSK Direct Integration

Bank Authentication Methods:
- цифров сертификат, издаден от банката с еднократен SMS код
- мобилното приложение (DSK mToken)

QWAC Certificate Authentication:
- За да създам X.509 сертификата има два варианта:
  - Единия е да го self-sign-на
  - Другия е чрез certificate authority с tool като CertAccord Enterprise (необходимо за non-sandbox)

### Self Signed Certificate

```
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:BG
State or Province Name (full name) [Some-State]:Sofia
Locality Name (eg, city) []:Sofia
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Martin
Organizational Unit Name (eg, section) []:Martin
Common Name (e.g. server FQDN or YOUR name) []:Martin Teoharov
Email Address []:martin.s.teoharov@proton.me

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:idkwhattowrite
An optional company name []:martin
```

```bash
openssl genrsa -out private_key.pem 2048
openssl req -new -key private_key.pem -out server.csr
openssl req -x509 -sha256 -days 365 -key private_key.pem -in server.csr -out server.pem
❯ openssl req -in server.csr -text -noout | grep -i "Signature.*SHA256" && echo "Certificate is valid" || echo "Certificate may not be compatible with modern systems"
```

### Test Certificate

За момента може да се ползва test certificate за sandbox. Трябва да се свали от dashboard-a и после да се split-не.

Split test certificate into parts and store in certs/sandbox/ via:
```bash
# split
openssl pkcs12 -in certs/sandbox/dsk-test.pfx -clcerts -nokeys -out certs/sandbox/public.pem -passin pass:123456
openssl pkcs12 -in certs/sandbox/dsk-test.pfx -nocerts -nodes -out certs/sandbox/private.pem -passin pass:123456
openssl pkcs12 -in certs/sandbox/dsk-test.pfx -cacerts -nokeys -out certs/sandbox/ca.pem -passin pass:123456

# verify chain
openssl verify -CAfile certs/sandbox/ca.pem certs/sandbox/public.pem
```

## 2. GoCardless Third Party Provider (TPP) Approach

- Create a gocardless account and application
  - generate client id and secret


Auth flow:

graph TD
    A[Your App] --> B[GoCardless]
    B --> C[DSK Login]
    C -->|SCA| D[DSK mToken/OTP]
    D --> B
    B --> A
