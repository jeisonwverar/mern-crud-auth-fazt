import {z} from 'zod';

export const  CreateTaskSchema=z.object({
    title:z.string({
        required_error:'title is required'
    }),
    description:z.string({
        required_error:'Description must be a string'
    }).optional(),
    date:z.string({
        required_error:'Description must be a string'
    }).datetime().optional()
})