mkdir cert
cd cert
openssl genrsa -out quiz-2015-key.pem 2048
openssl req -new -sha256 -key quiz-2015-key.pem -out quiz-2015-csr.pem
openssl x509 -req -in quiz-2015-csr.pem -signkey quiz-2015-key.pem -out quiz-2015-cert.pem
