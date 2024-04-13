const Joi = require('joi');
const { WebhookClient, EmbedBuilder } = require('discord.js')
const { generateUsername } = require('unique-username-generator');

const bodySchema = Joi.object({
    webhookUrl: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string()
});

const generateEmbed = ({ title, description }) => {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setTimestamp(new Date())
        .setColor('#0099ff')

    return embed;
}

const sendMessageToDiscord = async (data) => {
    try {
        const webhookClient = new WebhookClient({ url: data?.webhookUrl })
        const username = generateUsername("-", 4, 24)
        const embed = generateEmbed({ title: data?.title, description: data?.description })

        await webhookClient.send({
            username: username,
            avatarURL: `https://robohash.org/${username}`,
            embeds: [embed]
        })
    } catch (err) {
        console.log("error occured in sending message to discord", err)
    }
}

module.exports = { bodySchema, sendMessageToDiscord }