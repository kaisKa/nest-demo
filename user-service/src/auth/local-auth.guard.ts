/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
/**
 * Tjis Guard resposible of checking the user credintials 
 */


@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}