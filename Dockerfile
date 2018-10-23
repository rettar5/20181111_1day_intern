FROM node:10.12.0-alpine

RUN echo 'Now building...'

CMD echo 'Now running...'; \
    if [ ! -d /chatapp/node_modules ]; then echo 'Installing npm packages.'; cd /chatapp/ && npm install; fi; \
    cd /chatapp; \
    echo 'Installing @angular/cli path.'; ln -s /chatapp/node_modules/.bin/ng /bin/; \
    echo 'Installed'; \
    ng serve

EXPOSE 4200
