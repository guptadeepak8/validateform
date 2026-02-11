import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { FormService } from './form.service';

import type { SubmitFormDTO } from '@repo/types';


@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get("rules")
  getRules() {
    return {
      rules: [
        { field: "email", required: true, pattern: "^\\S+@\\S+$" },
        { field: "amount", required: true, min: 100 }
      ],
    };
  }

  @Post("submit")
  submit(@Body() body: SubmitFormDTO) {
    if (body.amount < 100) {
      throw new BadRequestException({
        field: "amount",
        message: "Minimum amount is 100",
      });
    }

    if (body.email.endsWith("@test.com")) {
      throw new BadRequestException({
        field: "email",
        message: "Test domains not allowed",
      });
    }

    return { success: true };
  }
}
