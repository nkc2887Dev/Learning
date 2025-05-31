import { Iresponse } from "../@types";
import { IAddInventoryInput } from "../@types/inventory.type";
import InventoryModel from "../models/inventory.model";
import PartModel, { IPart } from "../models/part.model";
import MESSAGE from "../utils/constants/msg";

export const handleRawPart = async (
  data: IAddInventoryInput,
  id: string
): Promise<Iresponse> => {
  try {
    const existingInventory = await InventoryModel.findOne({ part: id });

    if (existingInventory) {
      existingInventory.quantity += data.quantity || 0;
      await existingInventory.save();

      return {
        flag: true,
        data: existingInventory,
        msg: MESSAGE.INVENTORY.UPDATE,
      };
    }

    const newInventory = await InventoryModel.create({
      part: id,
      quantity: data.quantity || 0,
    });
    return { flag: true, data: newInventory, msg: MESSAGE.INVENTORY.CREATE };
  } catch (error: any) {
    console.error("Error - handleRawPart:", error);
    return { flag: false, msg: error.message };
  }
};

// export const handleAssembledPart = async (
//   data: IAddInventoryInput,
//   part: IPart,
//   id: string
// ): Promise<Iresponse> => {
//   try {
//     const requiredParts = part.parts || [];
//     const insufficient: string[] = [];

//     const subPartIds = requiredParts.map((p) => p.id);
//     const inventories = await InventoryModel.find({
//       part: { $in: subPartIds },
//     });

//     console.log("inventories: ", inventories);
//     const inventoryMap = new Map<string, number>();
//     inventories.forEach((inv) =>
//       inventoryMap.set(inv.part.toString(), inv.quantity)
//     );

//     console.log("inventoryMap: ", inventoryMap);
//     // 2. Validate all required quantities
//     for (const sub of requiredParts) {
//       const totalRequired = sub.quantity * data.quantity;
//       console.log("totalRequired: ", sub.id, totalRequired);
//       const available = inventoryMap.get(sub.id.toString()) || 0;
//       console.log("available: ", sub.id, available);
//       if (available < totalRequired) {
//         const subPart = await PartModel.findById(sub.id);
//         insufficient.push(`Insufficient quantity - ${subPart?.name || sub.id}`);
//       }
//     }

//     if (insufficient.length) {
//       return { flag: false, msg: insufficient.join(", ") };
//     }

//     // 3. Deduct sub-parts & add assembled part to inventory
//     const session = await PartModel.startSession();
//     session.startTransaction();

//     try {
//       // Deduct sub-parts
//       for (const sub of requiredParts) {
//         await InventoryModel.updateOne(
//           { part: sub.id },
//           { $inc: { quantity: -sub.quantity * data.quantity } },
//           { session }
//         );
//       }

//       // Add assembled part
//       await InventoryModel.findOneAndUpdate(
//         { part: id },
//         { $inc: { quantity: data.quantity } },
//         { upsert: true, new: true, session }
//       );

//       await session.commitTransaction();
//       session.endSession();

//       return { flag: true, data: inventories, msg: MESSAGE.INVENTORY.CREATE };
//     } catch (err: any) {
//       await session.abortTransaction();
//       session.endSession();
//       return { flag: false, msg: err.message };
//     }
//   } catch (error: any) {
//     console.error("Error - handleAssembledPart:", error);
//     return { flag: false, msg: error.message };
//   }
// };

export const handleAssembledPart = async (
  data: IAddInventoryInput,
  part: IPart,
  id: string
): Promise<Iresponse> => {
  try {
        const requiredParts = part.parts || [];
    const requiredQuantities: RequiredQuantityMap = {};
    await computeRequiredQuantities(
      id,
      data.quantity,
      requiredQuantities
    );

    // Fetch inventory for all parts involved
    const partIds = Object.keys(requiredQuantities);
    const inventories = await InventoryModel.find({ part: { $in: partIds } });

    const inventoryMap = new Map<string, number>();
    inventories.forEach((inv) =>
      inventoryMap.set(inv.part.toString(), inv.quantity)
    );

    // Validate availability
    const insufficient: string[] = [];
    for (const partId of partIds) {
      const requiredQty = requiredQuantities[partId];
      const available = inventoryMap.get(partId) || 0;

      if (available < requiredQty) {
        const subPart = await PartModel.findById(partId);
        insufficient.push(`Insufficient quantity - ${subPart?.name || partId}`);
      }
    }

    if (insufficient.length) {
      return { flag: false, msg: insufficient.join(", ") };
    }

    // 3. Deduct sub-parts & add assembled part to inventory
    const session = await PartModel.startSession();
    session.startTransaction();

    try {
      // Deduct sub-parts
      for (const sub of requiredParts) {
        await InventoryModel.updateOne(
          { part: sub.id },
          { $inc: { quantity: -sub.quantity * data.quantity } },
          { session }
        );
      }

      // Add assembled part
      await InventoryModel.findOneAndUpdate(
        { part: id },
        { $inc: { quantity: data.quantity } },
        { upsert: true, new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return { flag: true, data: inventories, msg: MESSAGE.INVENTORY.CREATE };
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      return { flag: false, msg: err.message };
    }
  } catch (error: any) {
    console.error("Error - handleAssembledPart:", error);
    return { flag: false, msg: error.message };
  }
};

interface RequiredQuantityMap {
  [partId: string]: number;
}

async function computeRequiredQuantities(
  partId: string,
  multiplier: number,
  map: RequiredQuantityMap
): Promise<void> {
  const part = await PartModel.findById(partId).lean();
  if (!part) return;

  const subParts = part.parts || [];

  // If no sub-parts, it's a base component
  if (subParts.length === 0) {
    map[partId] = (map[partId] || 0) + multiplier;
    return;
  }

  // Recursively calculate required quantities
  for (const sub of subParts) {
    await computeRequiredQuantities(sub.id.toString(), sub.quantity * multiplier, map);
  }
}
