cd `dirname $0`
trap 'docker kill youtube-db' 2

docker run \
  --name youtube-db \
  --rm \
  -d \
  -v $PWD/data:/docker-entrypoint-initdb.d \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres
docker logs youtube-db -f
