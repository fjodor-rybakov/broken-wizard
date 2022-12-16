# REPRODUCE

* npm run install
* Setup envs
```bash
export TELEGRAM_REDIS_URL=redis://host.docker.internal:6379
export TELEGRAM_API_TOKEN=your-token;
```
* docker compose up -d
* npm run start:dev

In telegram run `/start`

## ACTUAL

START
ENTER HERO_WIZARD_ID STEP 0
ENTER HERO_WIZARD_ID STEP 2

## EXPECT

START
ENTER HERO_WIZARD_ID STEP 0
ENTER HERO_WIZARD_ID STEP 2
ENTER DRAGON_WIZARD_ID STEP 0
ENTER DRAGON_WIZARD_ID STEP 1
