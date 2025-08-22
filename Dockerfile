FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci


COPY . .

RUN npm run build

FROM nginx:alpine
RUN echo $'\
server { \n\
    listen 8080; \n\
    root /usr/share/nginx/html; \n\
    index index.html index.htm; \n\
    location / { \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
