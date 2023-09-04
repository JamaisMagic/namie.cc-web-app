git pull origin main:main && \
docker run --rm -it --workdir /data/app --volume "$(pwd)":/data/app node:18.17.1-alpine3.18 /bin/sh -c "node -v && npm -v && echo \"\" && ls && echo \"\" && npm install && npm run build && ls && echo \"\" && ls ./dist && echo \"\" && echo \"Build finished.\""
