import { PrismaClient, Prisma } from "@prisma/client";

class QueryBuilder<T> {
  private modelDelegate: Prisma.UserDelegate<any>;
  private query: Record<string, unknown>;

  constructor(
    modelDelegate: Prisma.UserDelegate<any>,
    query: Record<string, unknown>
  ) {
    this.modelDelegate = modelDelegate;
    this.query = query;
  }

  // Apply search conditions -1
  search(searchingFields: string[]) {
    const searchTerm = this.query?.searchTerm as string | undefined;

    if (searchTerm) {
      const searchCondition = searchingFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      }));

      // Apply search condition using `where`
      this.query["where"] = { OR: searchCondition };
    }

    return this;
  }

  // Apply filter conditions -2
  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ["searchTerm", "sort", "limit", "page", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    // Apply filters using `where`
    this.query["where"] = queryObj;

    return this;
  }

  // Apply sorting -3
  sort() {
    const sort = (this.query?.sort as string)?.split(",")?.map((s: string) => {
      const order = s.startsWith("-") ? "desc" : "asc";
      const field = s.replace("-", "");
      return { [field]: order };
    }) || { createdAt: "desc" };

    // Apply sorting using `orderBy`
    this.query["orderBy"] = sort;

    return this;
  }

  // Apply pagination -4
  paginate() {
    const limit = (this.query?.limit as number) || 100;
    const page = (this.query?.page as number) || 1;
    const skip = (page - 1) * limit;

    // Apply pagination using `skip` and `take`
    this.query["skip"] = skip;
    this.query["take"] = limit;

    return this;
  }

  // Apply field selection -5
  fields() {
    const fields = (this.query?.fields as string)?.split(",");

    if (fields && fields.length > 0) {
      // Apply selection of fields using `select`
      this.query["select"] = fields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>);
    }

    return this;
  }

  // Count method for getting total -6
  async countTotal() {
    const totalQueries = this.query["where"] || {}; // Default to an empty where clause if no filters are applied

    const total = await this.modelDelegate.count({
      where: totalQueries,
    });

    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }

  // Execute the query
  async execute() {
    return await this.modelDelegate.findMany({
      where: {}, // Add your where conditions if necessary
      orderBy: {
        createdAt: "desc", // Corrected to match the field in the Prisma schema
      },
      skip: 0,
      take: 100,
    });
  }
}

export default QueryBuilder;
