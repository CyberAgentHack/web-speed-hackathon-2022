FROM node:16

ENV NODE_ENV=production


# ディレクトリを移動する
WORKDIR /app
COPY ./ ./

# ポート3000番を開放する
EXPOSE 3000