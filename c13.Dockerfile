FROM gcc:13

WORKDIR /

COPY . .

RUN gcc c13.c

CMD ./a.out

# docker build -f c.Dockerfile  -t IMAGENAME .
# docker run -it -d --name CONTIANERNAME IMAGENAME