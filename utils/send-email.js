import dayjs from "dayjs";
import { emailTemplates } from "./email-template";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) =>{
	if(!to || !type) throw new Error('Missing required parameters');

	// Send the reminder email
	const template = emailTemplates.find(t => t.label === type);

	if(!template) throw new Error('Invalid email type');

	const mailInfo = {
		userName: subscription.user.name,
		subscriptionName: subscription.name,
		renewalDate: dayjs(subscription.renewalDate).format('MM D, YYYY'),
		planName: subscription.name,
		price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
		paymentMethod: subscription.paymentMethod,
	}

	const message = template.generateBody(mailInfo);
	const subject = template.generateSubject(mailInfo);

	const mailOptions = {
		from: accountEmail,
		to: to,
		subject: subject,
		html: message,
	}

	transporter.sendMail(mailOptions, (error,info) => {
		if(error) {
			console.log(`Error sending email: ${error}`);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	})
}