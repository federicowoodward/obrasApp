docker run --name postgres-local \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=testdb \
  -p 5432:5432 \
  -d postgres:16
