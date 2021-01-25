# build stage
FROM nginx:stable-alpine
VOLUME /tmp
ADD dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]