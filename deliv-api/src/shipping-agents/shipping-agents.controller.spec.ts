import { Test, TestingModule } from '@nestjs/testing';
import { ShippingAgentsController } from './shipping-agents.controller';
import { ShippingAgentsService } from './shipping-agents.service';

describe('ShippingAgentsController', () => {
  let controller: ShippingAgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingAgentsController],
      providers: [ShippingAgentsService],
    }).compile();

    controller = module.get<ShippingAgentsController>(ShippingAgentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
