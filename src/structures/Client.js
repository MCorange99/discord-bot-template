const { Client: Discord, Collection, Message } = require("discord.js");
const Handler = require("./Handler.js");

const TypeConfig = {
  token: "",
  prefix: "",
  owners: [],

};

module.exports = class Client extends Discord {
  constructor() {
    super({
      intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
      ],
      allowedMentions: {
        parse: ["everyone"],
      },
    });


    /**
     * All possible command types
     * @type {Object}
     */
    this.types = {
      UTILITY: "utility",
      FUN: "fun",
      COLOR: "color",
      INFO: "info",
      MISC: "misc",
      MOD: "mod",
      ADMIN: "admin",
      OWNER: "owner",
    };

    /**
     * Commands
     * @type {Map}
     */
    this.commands = new Collection();

    /**
     * Aliases
     * @type {Map}
     */
    this.aliases = new Collection();

    /**
     * Cooldown
     * @type {Map}
     */
    this.cooldowns = new Collection();

    /**
     * Config
     */
    this.config = require("../../config.json");

    /**
     * Package.json
     */
    this.pkg = require("../../package.json");

    /**
     * Handler
     */
    this.handler = new Handler(this);

    console.log("[BOT]Loading Client.js");
  }

  login(token) {
    if (!token || typeof token !== "string") {
      console.log("[ERR]Token is missing");
    }

    super.login(token).catch((err) => {
        console.log(err);
    });

    this.handler.loadEvents('./src/core/events/**/**/*.js');
    this.handler.loadCommands('./src/core/commands/**/**/*.js');
  
  }
};
