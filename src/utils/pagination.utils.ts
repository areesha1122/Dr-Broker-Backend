import { Model, Document, FilterQuery } from 'mongoose';

interface PaginateOptions {
  page: number;
  limit: number;
  order?: string;
  filters?: FilterQuery<any>;
  excludeFields?: string[]; // Add an optional excludeFields array
}

export async function paginateResults<T extends Document>(
  model: Model<T>,
  options: PaginateOptions
): Promise<{ results: T[]; total: number }> {
  const { page, limit, order, filters, excludeFields } = options;
  const skip = (page - 1) * limit;

  const query = model.find().skip(skip).limit(limit);

  // Apply sorting criteria based on the 'order' option
  if (order) {
    query.sort({ [order]: -1 }); // Sort in descending order
  }

  // Apply filter criteria if provided
  if (filters) {
    query.find(filters);
  }

  // Apply projection to exclude specified fields
  if (excludeFields) {
    const projection: Record<string, number> = {};
    excludeFields.forEach((field) => {
      projection[field] = 0; // Exclude the field
    });
    query.select(projection);
  }

  // Apply the same filters to the total query
  const totalQuery = model.countDocuments(filters);

  const [results, total] = await Promise.all([
    query.exec(),
    totalQuery.exec(),
  ]);

  return {
    results,
    total,
  };
}
