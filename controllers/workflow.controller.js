import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7,5,2,1];

export const sendReminders = serve( async (context) => {
	// Get the subscription ID from the request payload
	const { subscriptionId} = context.requestPayload;
	// Fetch the subscription from the database
	const subscription = await fetchSubscription(context, subscriptionId);
	// Check if the subscription is active
	if(!subscription || subscription.status !== 'active') return;
	// Check if the renewal date has passed
	const renewalDate = dayjs(subscription.renewalDate);
	// If the renewal date has passed, stop the workflow
	if(renewalDate.isBefore(dayjs())) {
		console.log(`Renewal data has passed for subscription ${subscriptionId}. Stopping Workflow`);
		return;
	}

	for(const daysBefore of REMINDERS) {
		// Calculate the reminder date
		const reminderDate = renewalDate.subtract(daysBefore, 'day');
		// Check if the reminder date is today
		if(reminderDate.isAfter(dayjs())) {
			//schedule reminder
			await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
		}
		// Trigger the reminder
		if (dayjs().isSame(reminderDate, 'day')) {
      await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
	}
})

const fetchSubscription = async (context, subscriptionId) => {
	// Fetch the subscription from the database
	return await context.run('get subscription', async() => {
		// Find the subscription by ID and populate the user field
		return Subscription.findById(subscriptionId).populate('user','name email' );
	})
}

const sleepUntilReminder = async(context,label, date) =>{
	// Log the reminder date
	console.log(`Sleeping until ${label} reminder at ${date}`);
	// Sleep until the reminder date
	await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async(context, label, subscription) => {
	return await context.run(label, async () => {
		console.log(`Triggering ${label} reminder`);
		// Send the reminder email

		await sendReminderEmail({
			to: subscription.user.email,
			type: label,
			subscription
		});
	})
}