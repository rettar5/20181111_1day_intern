FROM node:10.12.0-alpine

RUN echo 'Now building...'

CMD echo 'Now running...'; \
    if [ ! -d /chatapp/node_modules ]; then echo 'Installing npm packages.'; cd /chatapp/ && npm install; cd ; fi; \
    echo 'Installing @angular/cli path.'; ln -s /chatapp/node_modules/.bin/ng /bin/; \
    echo 'Installed'; \
    cd /chatapp; \
    ng serve;

EXPOSE 4200
