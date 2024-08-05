// Controller for creating selling plan groups.
import { Request, Response } from 'express';
import * as sellingPlanService from '../services/plans'
import { Prisma } from '@prisma/client';

export const createSellingPlanGroup = async (req: Request, res: Response) => {
	try {
		const {
			name,
			merchant_code,
			description,
			options,
			position,
			selling_plans,
			productIds,
			variantIds
		} = req.body;

		const sellingPlanGroupData: Prisma.SellingPlanGroupCreateInput = {
			name,
			merchant_code,
			description,
			options,
			position,
			selling_plans: {
				create: selling_plans
			},
			products: {
				connect: productIds?.map((id: string) => ({ id }))
			},
			variants: {
				connect: variantIds?.map((id: string) => ({ id }))
			}
		};

		const sellingPlanGroup = await sellingPlanService.createShopifySellingPlanGroup(sellingPlanGroupData);
		res.status(201).json(sellingPlanGroup);
	} catch (error) {
		console.error('Error in createSellingPlanGroup controller: ', error);
		res.status(500).json({ error: 'Error creating selling plan group' });
	}
};

// export const getSellingPlanGroups = async (req: Request, res: Response) => {
// 	try {
// 		const sellingPlanGroups = await sellingPlanService.getSellingPlanGroups();
// 		res.json(sellingPlanGroups);
// 	} catch (error) {
// 		console.error('Error in getSellingPlanGroups controller: ', error);
// 		res.status(500).json({ error: 'Error fetching selling plan groups' });
// 	}
// };

// export const updateSellingPlanGroup = async (req: Request, res: Response) => {
// 	try {
// 		const { id } = req.params;
// 		const updateData: Prisma.SellingPlanGroupUpdateInput = req.body;

// 		const updatedSellingPlanGroup = await sellingPlanService.updateSellingPlanGroup(id, updateData);
// 		res.json(updatedSellingPlanGroup);
// 	} catch (error) {
// 		console.error('Error in updateSellingPlanGroup controller: ', error);
// 		res.status(500).json({ error: 'Error updating selling plan group' });
// 	}
// };

// export const deleteSellingPlanGroup = async (req: Request, res: Response) => {
// 	try {
// 		const { id } = req.params;
// 		await sellingPlanService.deleteSellingPlanGroup(id);
// 		res.status(204).send();
// 	} catch (error) {
// 		console.error('Error in deleteSellingPlanGroup controller: ', error);
// 		res.status(500).json({ error: 'Error deleting selling plan group' });
// 	}
// };

// export const addProductToSellingPlanGroup = async (req: Request, res: Response) => {
// 	try {
// 		const { sellingPlanGroupId, productId } = req.body;
// 		const updatedSellingPlanGroup = await sellingPlanService.addProductToSellingPlanGroup(sellingPlanGroupId, productId);
// 		res.json(updatedSellingPlanGroup);
// 	} catch (error) {
// 		console.error('Error in addProductToSellingPlanGroup controller: ', error);
// 		res.status(500).json({ error: 'Error adding product to selling plan group' });
// 	}
// };

// export const removeProductFromSellingPlanGroup = async (req: Request, res: Response) => {
// 	try {
// 		const { sellingPlanGroupId, productId } = req.body;
// 		const updatedSellingPlanGroup = await sellingPlanService.removeProductFromSellingPlanGroup(sellingPlanGroupId, productId);
// 		res.json(updatedSellingPlanGroup);
// 	} catch (error) {
// 		console.error('Error in removeProductFromSellingPlanGroup controller: ', error);
// 		res.status(500).json({ error: 'Error removing product from selling plan group' });
// 	}
// };
