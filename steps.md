
Виждам, че PSD2 е EU стандарт, който задължава банките да следват някои правила с цел подобряване на банковите услуги.

- Създавам акаунт в psd2dev.fibank.bg и създавам app със X.509 сертификат.

- За да създам X.509 сертификата има два варианта:
  - Единия е да го self-sign-на
  - Другия е чрез certificate authority с tool като CertAccord Enterprise


Стъпки за self signed certificate:
```bash
openssl genrsa -out private_key.pem 2048
openssl req -new -key private_key.pem -out server.csr
openssl req -x509 -sha256 -days 365 -key private_key.pem -in server.csr -out server.pem
❯ openssl req -in server.csr -text -noout | grep -i "Signature.*SHA256" && echo "Certificate is valid" || echo "Certificate may not be compatible with modern systems"
```


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

DSK Direct Authentication Methods:
- цифров сертификат, издаден от банката с еднократен SMS код
- мобилното приложение (DSK mToken)


Personal Fibank Account:

- Check for cookie/jwt when logged in
  - Too hacky, we are looking for a non-hacky solution;

-
