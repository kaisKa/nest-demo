/* eslint-disable prettier/prettier */
import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from 'express';


export interface Sorting {
    property: string;
    direction: string;
}
export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
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

    return { property, direction };
});

export const getOrder = (sort: Sorting) => sort ? { [sort.property]: sort.direction } : {};