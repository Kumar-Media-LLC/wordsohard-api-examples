# Discord word bot

A small bot that answers `!define <word>` and `!score <word>` in your server.

```
you:  !define zax
bot:  ZAX is valid for 19 points.
      A tool for cutting and piercing roofing slates.
      Definitions by WordSoHard (https://wordsohard.com)
```

## Run it

1. Create an application at the [Discord Developer Portal](https://discord.com/developers/applications), add a bot, and copy its token.
2. Under **Bot**, turn on **Message Content Intent**.
3. Invite the bot to your server with the `bot` scope and the **Send Messages** and **Read Message History** permissions.
4. Then:

```bash
cp .env.example .env    # paste your token into .env
npm install
npm start
```

Requires Node 20.6+ (for `--env-file`).
