import ElementType from "../models/elementType.model";
import EndpointType from "../models/endpointType.model";

export async function findAllByRelationType(relationTypeId: string) {
  return EndpointType.findAll({
    where: {
      relationTypeId,
    },
    include: [
      {
        model: ElementType,
        as: "elementTypes",
        attributes: ["uuid", "name"],
      },
    ],
  });
}

export async function findById(uuid: string) {
  return EndpointType.findOne({
    where: {
      uuid,
    },
    include: [
      {
        model: ElementType,
        as: "elementTypes",
        attributes: ["uuid", "name"],
      },
    ],
  });
}

export async function create(data: any) {
  return EndpointType.create(data);
}

export async function update(uuid: string, data: any) {
  return EndpointType.update(data, {
    where: {
      uuid,
    },
  });
}

export async function remove(uuid: string) {
  return EndpointType.destroy({
    where: {
      uuid,
    },
  });
}
