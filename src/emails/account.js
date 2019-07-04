const sgMail = require('@sendgrid/mail')
//const sendGridAPIKey = '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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        from:"yashsonar213@gmail.com",
        to: email,
        subject:"Welcome Email",
        text:`Hey ${name}, let us know if you like using our application`
    })
}
const sendGoodByeEmail = (email,name)=>{
    sgMail.send({
        from:'yashsonar213@gmail.com',
        to: email,
        subject:`Hey there ${name}`,
        text:'could you please tell us the reason you had to leave so we can improve our services'
    })
}
module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}