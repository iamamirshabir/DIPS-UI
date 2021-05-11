FROM node:14.7.0-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY .   .
RUN npm run build --prod
FROM nginx:1.19-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/DIPS/ /usr/share/nginx/html
EXPOSE 80