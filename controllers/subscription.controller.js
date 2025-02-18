import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async(req,res,next) => {
	try {
		//Check if the user is the owner of the account
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});
		//Trigger the reminder workflow
		await workflowClient.trigger({
			url: `${SERVER_URL}/api/v1/workflows/subscriptions/reminder`,
			body: {
				subscriptionId: subscription.id
			},
			headers: {
				'Content-Type': 'application/json'
			},
			retries: 0,
		})

		//Send response
		res.status(201).json({success: true, data: subscription});
	} catch (error) {
		next(error);
	}
}

export const getUserSubscriptions = async(req,res,next) => {
	try {
		//Check if the user is the owner of the account
		if(req.user.id !== req.params.id){
			const error = new Error('You are not the owner of this account');
			error.status = 401;
			throw error;
		}
		//Find all subscriptions for the user
		const subscriptions = await Subscription.find({user: req.params.id});
		res.status(200).json({success: true, data: subscriptions});

	} catch (error) {
		next(error);
	}
}