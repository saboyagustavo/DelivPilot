import { Test, TestingModule } from '@nestjs/testing';
import { ShippingAgentsService } from './shipping-agents.service';

describe('ShippingAgentsService', () => {
  let service: ShippingAgentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingAgentsService],
    }).compile();

    service = module.get<ShippingAgentsService>(ShippingAgentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
