import { isResourceLinkage } from '@tsmetadata/json-api';
import { get } from './get';

export const include = async <I, C>(
  classInstance: I,
  relationship: keyof I,
  // biome-ignore lint/suspicious/noExplicitAny: `any` is required to support all class constructors.
  cls: new (..._: any[]) => C,
) => {
  const resourceLinkageCandidate = classInstance[relationship];

  if (
    !isResourceLinkage(resourceLinkageCandidate) ||
    resourceLinkageCandidate === null
  ) {
    return;
  }

  const resourceLinkage = resourceLinkageCandidate;

  if (Array.isArray(resourceLinkage)) {
    classInstance[relationship] = [] as I[keyof I];

    for (const { id } of resourceLinkage) {
      classInstance[relationship] = [
        ...(classInstance[relationship] as I[keyof I][]),
        await get(cls, id),
      ] as I[keyof I];
    }

    return;
  }

  const { id } = resourceLinkage;

  classInstance[relationship] = (await get(cls, id)) as I[keyof I];
};