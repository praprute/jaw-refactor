# Production image: build the CRA bundle, then serve it with server.js.
FROM node:12.22.12-buster AS build

WORKDIR /app

COPY package.json package-lock.json ./

# raphael (via @toast-ui/react-chart) pulls `eve` over git://, which GitHub
# stopped serving in 2022. Rewrite the protocol so the install can resolve it.
RUN git config --global url."https://github.com/".insteadOf "git://github.com/" \
 && npm ci

COPY . .
RUN npm run build

# ---

FROM node:12.22.12-buster-slim AS runtime

WORKDIR /app

# server.js requires express and compression, but neither is listed in
# package.json — install them here so the runtime layer stays minimal.
RUN npm install --production --no-package-lock express@4.17.1 compression@1.7.4

COPY --from=build /app/build ./build
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
