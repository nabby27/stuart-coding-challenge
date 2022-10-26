import { Courier } from "../Entities/Courier";
import { Id } from "../../../Shared/VOs/Id";
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";

export interface CouriersRepository {
    find(courierId: Id): Promise<Courier | null>
    searchWithAvailableCapacity(capacityRequired: PositiveNumber): Promise<Courier[]>
    save(courier: Courier): Promise<void>
    remove(courier: Courier): Promise<void>
}