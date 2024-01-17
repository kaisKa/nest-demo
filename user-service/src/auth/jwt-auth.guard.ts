/* eslint-disable prettier/prettier */
/**
 * This guard is resposible of verifying the jwt of protected resources 
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
