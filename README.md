# coding-project-template

`https://github.com/linhnguyen15492/backend-nodejs-capstone`

**Test the endpoints:**

```bash
curl --request GET --url http://localhost:3060/api/secondchance/items

curl --request GET --url http://localhost:3060/api/secondchance/items/875
```

**Test the API**:

```bash
curl "http://localhost:3060/api/secondchance/search?category=Office&name=Curtain"
```

**Test sentiment analysis service API**:

```bash
curl --location --request POST 'localhost:3000/sentiment?sentence=I%20fell%20off%20my%20bike%20yesterday%20and%20got%20injured.%20I%20am%20sad%20and%20not%20able%20to%20go%20to%20work%20today.'
```

**Test registration endpoint:**

```bash
curl --location 'http://localhost:3060/api/auth/register' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: jhub-reverse-tool-proxy=s%3Adf8852e8-fe28-47ac-ab62-cb52fc5bbef5.CxZgc7USbJXpxTv4Vs6BH6esBtnhnYv%2FKQ098HtCm5s' \
    --data-raw '{
        "firstName": "Lachlan",
        "lastName": "Baker",
        "email": "lachie@gmail.com",
        "password": "lac123"
    }'
```

**Test login endpoint:**

```bash
curl --location 'http://localhost:3060/api/auth/login' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: jhub-reverse-tool-proxy=s%3Adf8852e8-fe28-47ac-ab62-cb52fc5bbef5.CxZgc7USbJXpxTv4Vs6BH6esBtnhnYv%2FKQ098HtCm5s' \
    --data-raw '{
        "email": "lachie@gmail.com",
        "password": "lac123"
    }'
```

**Test update endpoint:**

```bash
curl --location --request PUT 'http://localhost/api/auth/update' \
--header 'email: laura@gmail.com' \
--header 'Content-Type: application/json' \
--header 'Cookie: jhub-reverse-tool-proxy=s%3A48bd0518-14a7-4be7-a498-b680be3e0dd0.VdP4w1OI%2BqvZJ5Rg2v%2BGqqKpL0KnqsZ6zF%2BjpK0gg5k' \
--data '{"firstName":"Lauraa"}'
```
