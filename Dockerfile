# Build the react application
FROM node:12.4.0-alpine as build
WORKDIR /app

# Copy files
COPY package.json ./
RUN rm -rf node_modules
RUN yarn install
COPY . ./

RUN npm run build

# Serve application over nginx 
FROM nginx:1.17.8-alpine

# Copy files
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]