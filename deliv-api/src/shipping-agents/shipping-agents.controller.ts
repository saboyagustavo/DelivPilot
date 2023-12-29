import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingAgentsService } from './shipping-agents.service';
import { CreateShippingAgentDto } from './dto/create-shipping-agent.dto';
import { UpdateShippingAgentDto } from './dto/update-shipping-agent.dto';

@Controller('shipping-agents')
export class ShippingAgentsController {
  constructor(private readonly shippingAgentsService: ShippingAgentsService) {}

  @Post()
  create(@Body() createShippingAgentDto: CreateShippingAgentDto) {
    return this.shippingAgentsService.create(createShippingAgentDto);
  }

  @Get()
  findAll() {
    return this.shippingAgentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingAgentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingAgentDto: UpdateShippingAgentDto) {
    return this.shippingAgentsService.update(+id, updateShippingAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingAgentsService.remove(+id);
  }
}
