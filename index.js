const express = require('express');
const { bodySchema, sendMessageToDiscord } = require('./utils');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'server running fine' })
});

router.post('/discord', async (req, res) => {
    try {
        const validationresult = bodySchema.validate(req.body);
        if (validationresult.error && validationresult.error !== null) {
            console.log("validation error:", validationresult.error.message)
            return res.status(400).json({ error: validationresult.error.message, message: 'bad request' })
        }

        sendMessageToDiscord(req?.body);
        return res.status(200).json({ status: 'OK', message: 'webhook invoked' })
    } catch (err) {
        console.log("error occured:", err)
        return res.status(500).json({ error: "something went wrong", message: "error occurred" })
    }
})

app.use('/', router);

// Listen for incoming requests
app.listen(PORT, () =>
    console.log(`server started, listening at PORT ${PORT}`)
);