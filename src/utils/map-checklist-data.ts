import { CHECKLIST_LISTSIDE_DOCUMENT } from './check-list-side-enum';
import { CHECKLIST_BUYSIDE_DOCUMENT } from './check-buy-side-enum';
import { CHECKLIST_BOTHSIDE_DOCUMENT } from './check-both-side-enum';



// Function to map request data to model fields
export function mapChecklistListSideData(requestData: Record<string, any>): Record<string, any> {
  const mappedData: Record<string, any> = {};

  for (const key in requestData) {
    if (CHECKLIST_LISTSIDE_DOCUMENT[key as keyof typeof CHECKLIST_LISTSIDE_DOCUMENT]) {
      // Use type assertion to inform TypeScript that key is a valid enum key
      const enumKey = key as keyof typeof CHECKLIST_LISTSIDE_DOCUMENT;
      mappedData[CHECKLIST_LISTSIDE_DOCUMENT[enumKey]] = requestData[key];
    } else {
      // Key not found in the enum, set it as-is and append to the result
      mappedData[key] = requestData[key];
    }
  }

  return mappedData;
}

export function mapChecklistBuySideData(requestData: Record<string, any>): Record<string, any> {
  const mappedData: Record<string, any> = {};

  for (const key in requestData) {
    if (CHECKLIST_BUYSIDE_DOCUMENT[key as keyof typeof CHECKLIST_BUYSIDE_DOCUMENT]) {
      // Use type assertion to inform TypeScript that key is a valid enum key
      const enumKey = key as keyof typeof CHECKLIST_BUYSIDE_DOCUMENT;
      mappedData[CHECKLIST_BUYSIDE_DOCUMENT[enumKey]] = requestData[key];
    } else {
      // Key not found in the enum, set it as-is and append to the result
      mappedData[key] = requestData[key];
    }
  }

  return mappedData;
}

export function mapChecklistBothSideData(requestData: Record<string, any>): Record<string, any> {
  const mappedData: Record<string, any> = {};

  for (const key in requestData) {
    if (CHECKLIST_BOTHSIDE_DOCUMENT[key as keyof typeof CHECKLIST_BOTHSIDE_DOCUMENT]) {
      // Use type assertion to inform TypeScript that key is a valid enum key
      const enumKey = key as keyof typeof CHECKLIST_BOTHSIDE_DOCUMENT;
      mappedData[CHECKLIST_BOTHSIDE_DOCUMENT[enumKey]] = requestData[key];
    } else {
      // Key not found in the enum, set it as-is and append to the result
      mappedData[key] = requestData[key];
    }
  }

  return mappedData;
}
