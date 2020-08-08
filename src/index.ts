const { Client, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const GiphyApiCore = require("giphy-js-sdk-core");
const client = new Client();
const giphy = GiphyApiCore(config.api_key);

client.on("ready", () => {
    console.log("Bot started");
});

client.on("message", async (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const unifiedargs = args.slice(1).join(" ");

    const msgembed1 = new MessageEmbed()
        .setTitle("Gif")
        .setDescription("Return's a gif")
        .setTimestamp()
        .setFooter("Powered by https://github.com/slayerinc");

    if (message.content.startsWith(`${config.prefix}gif`)) {
        if (!unifiedargs) {
            message.channel.send(msgembed1);
        }else{
            const response = await giphy.search("gifs", { 
                q: `${unifiedargs}`,
                limit: 11,
                offset: Math.floor(Math.round(Math.random() * 10)),
                rating: message.channel.type == "nsfw" ? "x" : "g"
            });
          
            message.channel.send({
                files: [response.data[0].images.fixed_height.url]
            });
        }
    }
});

client.login(config.token);