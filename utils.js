const { WebhookClient, EmbedBuilder } = require("discord.js");
const Joi = require("joi");
const { generateUsername } = require("unique-username-generator");

const bodySchema = Joi.object({
    webhookUrl: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string()
})

const generateEmbedding = ({ title, description }) => {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor('#22d775')
        .setTimestamp(new Date())
        .setDescription(description)

    return embed
}

const sendMessageToDiscord = async (data) => {
    try {
        const webhookClient = new WebhookClient({ url: data?.webhookUrl })

        const embed = generateEmbedding({ title: data?.title, description: data?.description })
        const username = generateUsername("-", 5, 15);

        await webhookClient.send({
            username: username,
            avatarURL: `https://robohash.org/${username}`,
            embeds: [embed]
        })
    } catch (err) {
        console.log("error occured while calling webhook", err)
    }
}

module.exports = {
    bodySchema, sendMessageToDiscord
}