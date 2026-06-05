import {
  ArchiveDiscount,
  GetDashboardMetrics,
  ListDiscounts,
  PublishDiscount,
  SaveDiscount,
} from '@descuentos-santiago/application'
import { InMemoryDiscountRepository } from '@descuentos-santiago/infrastructure'

const repository = new InMemoryDiscountRepository()

export const dependencies = {
  listDiscounts: new ListDiscounts(repository),
  getDashboardMetrics: new GetDashboardMetrics(repository),
  saveDiscount: new SaveDiscount(repository),
  publishDiscount: new PublishDiscount(repository),
  archiveDiscount: new ArchiveDiscount(repository),
}
