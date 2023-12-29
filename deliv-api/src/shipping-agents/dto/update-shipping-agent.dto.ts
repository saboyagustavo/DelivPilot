import { PartialType } from '@nestjs/swagger';
import { CreateShippingAgentDto } from './create-shipping-agent.dto';

export class UpdateShippingAgentDto extends PartialType(CreateShippingAgentDto) {}
