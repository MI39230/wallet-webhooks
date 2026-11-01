# wallet-webhooks

Receives payment-provider webhooks and credits test wallets in PostgreSQL.

## Run locally

```
docker compose up -d --build
```

The API listens on http://localhost:3000. Postgres is on localhost:5432 (user, password and database: `wallet`).

Reset to a clean database:

```
docker compose down -v && docker compose up -d --build
```

## Test data

Five synthetic wallets, `wallet_A` to `wallet_E`, all starting at 0. Webhook payloads in `bruno/` are synthetic.
