const fastify = require('fastify')({
    logger: true
})
const nodemailer = require('nodemailer')

fastify.post('/email', async (request, response) => {
    try {
        const email = request.body.email
        if (!email) {
            response.send({"error": "Email is not received"})
        }
        let emailAccount = await nodemailer.createTestAccount()
        let trasnporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'Account login here',
                pass: 'Account password here'
            }
        })
        await trasnporter.sendMail({
            from: '"Company title here"',
            to: `${request.body.email}`,
            subject: 'Text',
            text: `Some text`
        })
        response.send({"result": "success"})
    } catch (e) {
        console.log(e)
    }

})

fastify.listen((3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
}))