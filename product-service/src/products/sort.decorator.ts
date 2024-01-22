/* eslint-disable prettier/prettier */
import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Request } from 'express';



export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortPropertyOptions {
    price = 'price',
    productName = 'product_name',
}

export class Sorting {
    @ApiPropertyOptional({enum: SortPropertyOptions})
    property: SortPropertyOptions;
    @ApiPropertyOptional({ enum: SortOrder })
    direction: SortOrder;
}
export const SortingParams = createParamDecorator((validParams, ctx: ExecutionContext): Sorting | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    // check if the valid params sent is an array
    if (typeof validParams != 'object') throw new BadRequestException('Invalid sort parameter');

    // check the format of the sort query param
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern)) throw new BadRequestException('Invalid sort parameter');

    // extract the property name and direction and check if they are valid
    const [property, direction] = sort.split(':');
    if (!validParams.includes(property)) throw new BadRequestException(`Invalid sort property: ${property}`);
    return { property: SortPropertyOptions[property as keyof typeof SortPropertyOptions], direction: SortOrder[direction as keyof typeof SortOrder] };
});

export const getOrder = (sort: Sorting) => sort ? { [sort.property]: sort.direction } : {};