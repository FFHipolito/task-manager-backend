import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() 
  providers: [PrismaService],
  exports: [PrismaService], 
export class PrismaModule {}