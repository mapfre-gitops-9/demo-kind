FROM nginx:1.31.3-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --chown=101:101 --chmod=0444 nginx.conf /etc/nginx/nginx.conf
COPY --chown=101:101 --chmod=0444 index.html /usr/share/nginx/html/index.html

USER 101:101
EXPOSE 8080
