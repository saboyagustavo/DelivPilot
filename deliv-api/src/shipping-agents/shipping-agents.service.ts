import { Injectable } from '@nestjs/common';
import { CreateShippingAgentDto } from './dto/create-shipping-agent.dto';
import { UpdateShippingAgentDto } from './dto/update-shipping-agent.dto';

@Injectable()
export class ShippingAgentsService {
  create(createShippingAgentDto: CreateShippingAgentDto) {
    return 'This action adds a new shippingAgent';
  }

  findAll() {
    return `This action returns all shippingAgents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingAgent`;
  }

  update(id: number, updateShippingAgentDto: UpdateShippingAgentDto) {
    return `This action updates a #${id} shippingAgent`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingAgent`;
  }
}
