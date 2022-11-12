
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: string
  telegramId: number
  username: string | null
  first_name: string | null
  lastSendTime: Date
  createdAt: Date
  updatedAt: Date
  mode: string
  period: number
  language: string
}

/**
 * Model Word
 * 
 */
export type Word = {
  text: string
  createdAt: Date
  updatedAt: Date
  language: string
}

/**
 * Model WordsOnUsers
 * 
 */
export type WordsOnUsers = {
  userId: number
  wordId: string
  frequency: number
}

/**
 * Model Entry
 * 
 */
export type Entry = {
  text: string
  part_of_speech: string
  transcription: string | null
  wordId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Translation
 * 
 */
export type Translation = {
  id: string
  text: string
  part_of_speech: string
  synonym: string | null
  meaning: string | null
  example: string | null
  createdAt: Date
  updatedAt: Date
  entryText: string
  entryPart_of_speech: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.word`: Exposes CRUD operations for the **Word** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Words
    * const words = await prisma.word.findMany()
    * ```
    */
  get word(): Prisma.WordDelegate<GlobalReject>;

  /**
   * `prisma.wordsOnUsers`: Exposes CRUD operations for the **WordsOnUsers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WordsOnUsers
    * const wordsOnUsers = await prisma.wordsOnUsers.findMany()
    * ```
    */
  get wordsOnUsers(): Prisma.WordsOnUsersDelegate<GlobalReject>;

  /**
   * `prisma.entry`: Exposes CRUD operations for the **Entry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entries
    * const entries = await prisma.entry.findMany()
    * ```
    */
  get entry(): Prisma.EntryDelegate<GlobalReject>;

  /**
   * `prisma.translation`: Exposes CRUD operations for the **Translation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Translations
    * const translations = await prisma.translation.findMany()
    * ```
    */
  get translation(): Prisma.TranslationDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.6.0
   * Query Engine version: 2e719efb80b56a3f32d18a62489de95bb9c130e3
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Word: 'Word',
    WordsOnUsers: 'WordsOnUsers',
    Entry: 'Entry',
    Translation: 'Translation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    wordsOnUsers: number
  }

  export type UserCountOutputTypeSelect = {
    wordsOnUsers?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type WordCountOutputType
   */


  export type WordCountOutputType = {
    entry: number
    wordsOnUsers: number
  }

  export type WordCountOutputTypeSelect = {
    entry?: boolean
    wordsOnUsers?: boolean
  }

  export type WordCountOutputTypeGetPayload<S extends boolean | null | undefined | WordCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WordCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WordCountOutputTypeArgs)
    ? WordCountOutputType 
    : S extends { select: any } & (WordCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof WordCountOutputType ? WordCountOutputType[P] : never
  } 
      : WordCountOutputType




  // Custom InputTypes

  /**
   * WordCountOutputType without action
   */
  export type WordCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WordCountOutputType
     * 
    **/
    select?: WordCountOutputTypeSelect | null
  }



  /**
   * Count Type EntryCountOutputType
   */


  export type EntryCountOutputType = {
    translation: number
  }

  export type EntryCountOutputTypeSelect = {
    translation?: boolean
  }

  export type EntryCountOutputTypeGetPayload<S extends boolean | null | undefined | EntryCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? EntryCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (EntryCountOutputTypeArgs)
    ? EntryCountOutputType 
    : S extends { select: any } & (EntryCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof EntryCountOutputType ? EntryCountOutputType[P] : never
  } 
      : EntryCountOutputType




  // Custom InputTypes

  /**
   * EntryCountOutputType without action
   */
  export type EntryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EntryCountOutputType
     * 
    **/
    select?: EntryCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    telegramId: number | null
    period: number | null
  }

  export type UserSumAggregateOutputType = {
    telegramId: number | null
    period: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    telegramId: number | null
    username: string | null
    first_name: string | null
    lastSendTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    mode: string | null
    period: number | null
    language: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    telegramId: number | null
    username: string | null
    first_name: string | null
    lastSendTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    mode: string | null
    period: number | null
    language: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    first_name: number
    lastSendTime: number
    createdAt: number
    updatedAt: number
    mode: number
    period: number
    language: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    telegramId?: true
    period?: true
  }

  export type UserSumAggregateInputType = {
    telegramId?: true
    period?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    first_name?: true
    lastSendTime?: true
    createdAt?: true
    updatedAt?: true
    mode?: true
    period?: true
    language?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    first_name?: true
    lastSendTime?: true
    createdAt?: true
    updatedAt?: true
    mode?: true
    period?: true
    language?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    first_name?: true
    lastSendTime?: true
    createdAt?: true
    updatedAt?: true
    mode?: true
    period?: true
    language?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    telegramId: number
    username: string | null
    first_name: string | null
    lastSendTime: Date
    createdAt: Date
    updatedAt: Date
    mode: string
    period: number
    language: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    first_name?: boolean
    lastSendTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mode?: boolean
    period?: boolean
    language?: boolean
    wordsOnUsers?: boolean | WordsOnUsersFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    wordsOnUsers?: boolean | WordsOnUsersFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'wordsOnUsers' ? Array < WordsOnUsersGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'wordsOnUsers' ? Array < WordsOnUsersGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    wordsOnUsers<T extends WordsOnUsersFindManyArgs= {}>(args?: Subset<T, WordsOnUsersFindManyArgs>): PrismaPromise<Array<WordsOnUsersGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Word
   */


  export type AggregateWord = {
    _count: WordCountAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  export type WordMinAggregateOutputType = {
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
    language: string | null
  }

  export type WordMaxAggregateOutputType = {
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
    language: string | null
  }

  export type WordCountAggregateOutputType = {
    text: number
    createdAt: number
    updatedAt: number
    language: number
    _all: number
  }


  export type WordMinAggregateInputType = {
    text?: true
    createdAt?: true
    updatedAt?: true
    language?: true
  }

  export type WordMaxAggregateInputType = {
    text?: true
    createdAt?: true
    updatedAt?: true
    language?: true
  }

  export type WordCountAggregateInputType = {
    text?: true
    createdAt?: true
    updatedAt?: true
    language?: true
    _all?: true
  }

  export type WordAggregateArgs = {
    /**
     * Filter which Word to aggregate.
     * 
    **/
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     * 
    **/
    orderBy?: Enumerable<WordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Words
    **/
    _count?: true | WordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordMaxAggregateInputType
  }

  export type GetWordAggregateType<T extends WordAggregateArgs> = {
        [P in keyof T & keyof AggregateWord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWord[P]>
      : GetScalarType<T[P], AggregateWord[P]>
  }




  export type WordGroupByArgs = {
    where?: WordWhereInput
    orderBy?: Enumerable<WordOrderByWithAggregationInput>
    by: Array<WordScalarFieldEnum>
    having?: WordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordCountAggregateInputType | true
    _min?: WordMinAggregateInputType
    _max?: WordMaxAggregateInputType
  }


  export type WordGroupByOutputType = {
    text: string
    createdAt: Date
    updatedAt: Date
    language: string
    _count: WordCountAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  type GetWordGroupByPayload<T extends WordGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordGroupByOutputType[P]>
            : GetScalarType<T[P], WordGroupByOutputType[P]>
        }
      >
    >


  export type WordSelect = {
    text?: boolean
    entry?: boolean | EntryFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    language?: boolean
    wordsOnUsers?: boolean | WordsOnUsersFindManyArgs
    _count?: boolean | WordCountOutputTypeArgs
  }


  export type WordInclude = {
    entry?: boolean | EntryFindManyArgs
    wordsOnUsers?: boolean | WordsOnUsersFindManyArgs
    _count?: boolean | WordCountOutputTypeArgs
  } 

  export type WordGetPayload<S extends boolean | null | undefined | WordArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Word :
    S extends undefined ? never :
    S extends { include: any } & (WordArgs | WordFindManyArgs)
    ? Word  & {
    [P in TrueKeys<S['include']>]:
        P extends 'entry' ? Array < EntryGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'wordsOnUsers' ? Array < WordsOnUsersGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? WordCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (WordArgs | WordFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'entry' ? Array < EntryGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'wordsOnUsers' ? Array < WordsOnUsersGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? WordCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Word ? Word[P] : never
  } 
      : Word


  type WordCountArgs = Merge<
    Omit<WordFindManyArgs, 'select' | 'include'> & {
      select?: WordCountAggregateInputType | true
    }
  >

  export interface WordDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Word that matches the filter.
     * @param {WordFindUniqueArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WordFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WordFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Word'> extends True ? Prisma__WordClient<WordGetPayload<T>> : Prisma__WordClient<WordGetPayload<T> | null, null>

    /**
     * Find the first Word that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WordFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WordFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Word'> extends True ? Prisma__WordClient<WordGetPayload<T>> : Prisma__WordClient<WordGetPayload<T> | null, null>

    /**
     * Find zero or more Words that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Words
     * const words = await prisma.word.findMany()
     * 
     * // Get first 10 Words
     * const words = await prisma.word.findMany({ take: 10 })
     * 
     * // Only select the `text`
     * const wordWithTextOnly = await prisma.word.findMany({ select: { text: true } })
     * 
    **/
    findMany<T extends WordFindManyArgs>(
      args?: SelectSubset<T, WordFindManyArgs>
    ): PrismaPromise<Array<WordGetPayload<T>>>

    /**
     * Create a Word.
     * @param {WordCreateArgs} args - Arguments to create a Word.
     * @example
     * // Create one Word
     * const Word = await prisma.word.create({
     *   data: {
     *     // ... data to create a Word
     *   }
     * })
     * 
    **/
    create<T extends WordCreateArgs>(
      args: SelectSubset<T, WordCreateArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Create many Words.
     *     @param {WordCreateManyArgs} args - Arguments to create many Words.
     *     @example
     *     // Create many Words
     *     const word = await prisma.word.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WordCreateManyArgs>(
      args?: SelectSubset<T, WordCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Word.
     * @param {WordDeleteArgs} args - Arguments to delete one Word.
     * @example
     * // Delete one Word
     * const Word = await prisma.word.delete({
     *   where: {
     *     // ... filter to delete one Word
     *   }
     * })
     * 
    **/
    delete<T extends WordDeleteArgs>(
      args: SelectSubset<T, WordDeleteArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Update one Word.
     * @param {WordUpdateArgs} args - Arguments to update one Word.
     * @example
     * // Update one Word
     * const word = await prisma.word.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WordUpdateArgs>(
      args: SelectSubset<T, WordUpdateArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Delete zero or more Words.
     * @param {WordDeleteManyArgs} args - Arguments to filter Words to delete.
     * @example
     * // Delete a few Words
     * const { count } = await prisma.word.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WordDeleteManyArgs>(
      args?: SelectSubset<T, WordDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WordUpdateManyArgs>(
      args: SelectSubset<T, WordUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Word.
     * @param {WordUpsertArgs} args - Arguments to update or create a Word.
     * @example
     * // Update or create a Word
     * const word = await prisma.word.upsert({
     *   create: {
     *     // ... data to create a Word
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Word we want to update
     *   }
     * })
    **/
    upsert<T extends WordUpsertArgs>(
      args: SelectSubset<T, WordUpsertArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Find one Word that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WordFindUniqueOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WordFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WordFindUniqueOrThrowArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Find the first Word that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WordFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WordFindFirstOrThrowArgs>
    ): Prisma__WordClient<WordGetPayload<T>>

    /**
     * Count the number of Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordCountArgs} args - Arguments to filter Words to count.
     * @example
     * // Count the number of Words
     * const count = await prisma.word.count({
     *   where: {
     *     // ... the filter for the Words we want to count
     *   }
     * })
    **/
    count<T extends WordCountArgs>(
      args?: Subset<T, WordCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordAggregateArgs>(args: Subset<T, WordAggregateArgs>): PrismaPromise<GetWordAggregateType<T>>

    /**
     * Group by Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordGroupByArgs['orderBy'] }
        : { orderBy?: WordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Word.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WordClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    entry<T extends EntryFindManyArgs= {}>(args?: Subset<T, EntryFindManyArgs>): PrismaPromise<Array<EntryGetPayload<T>>| Null>;

    wordsOnUsers<T extends WordsOnUsersFindManyArgs= {}>(args?: Subset<T, WordsOnUsersFindManyArgs>): PrismaPromise<Array<WordsOnUsersGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Word base type for findUnique actions
   */
  export type WordFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * Filter, which Word to fetch.
     * 
    **/
    where: WordWhereUniqueInput
  }

  /**
   * Word: findUnique
   */
  export interface WordFindUniqueArgs extends WordFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Word base type for findFirst actions
   */
  export type WordFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * Filter, which Word to fetch.
     * 
    **/
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     * 
    **/
    orderBy?: Enumerable<WordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     * 
    **/
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     * 
    **/
    distinct?: Enumerable<WordScalarFieldEnum>
  }

  /**
   * Word: findFirst
   */
  export interface WordFindFirstArgs extends WordFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Word findMany
   */
  export type WordFindManyArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * Filter, which Words to fetch.
     * 
    **/
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     * 
    **/
    orderBy?: Enumerable<WordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Words.
     * 
    **/
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WordScalarFieldEnum>
  }


  /**
   * Word create
   */
  export type WordCreateArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * The data needed to create a Word.
     * 
    **/
    data: XOR<WordCreateInput, WordUncheckedCreateInput>
  }


  /**
   * Word createMany
   */
  export type WordCreateManyArgs = {
    /**
     * The data used to create many Words.
     * 
    **/
    data: Enumerable<WordCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Word update
   */
  export type WordUpdateArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * The data needed to update a Word.
     * 
    **/
    data: XOR<WordUpdateInput, WordUncheckedUpdateInput>
    /**
     * Choose, which Word to update.
     * 
    **/
    where: WordWhereUniqueInput
  }


  /**
   * Word updateMany
   */
  export type WordUpdateManyArgs = {
    /**
     * The data used to update Words.
     * 
    **/
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     * 
    **/
    where?: WordWhereInput
  }


  /**
   * Word upsert
   */
  export type WordUpsertArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * The filter to search for the Word to update in case it exists.
     * 
    **/
    where: WordWhereUniqueInput
    /**
     * In case the Word found by the `where` argument doesn't exist, create a new Word with this data.
     * 
    **/
    create: XOR<WordCreateInput, WordUncheckedCreateInput>
    /**
     * In case the Word was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WordUpdateInput, WordUncheckedUpdateInput>
  }


  /**
   * Word delete
   */
  export type WordDeleteArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
    /**
     * Filter which Word to delete.
     * 
    **/
    where: WordWhereUniqueInput
  }


  /**
   * Word deleteMany
   */
  export type WordDeleteManyArgs = {
    /**
     * Filter which Words to delete
     * 
    **/
    where?: WordWhereInput
  }


  /**
   * Word: findUniqueOrThrow
   */
  export type WordFindUniqueOrThrowArgs = WordFindUniqueArgsBase
      

  /**
   * Word: findFirstOrThrow
   */
  export type WordFindFirstOrThrowArgs = WordFindFirstArgsBase
      

  /**
   * Word without action
   */
  export type WordArgs = {
    /**
     * Select specific fields to fetch from the Word
     * 
    **/
    select?: WordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordInclude | null
  }



  /**
   * Model WordsOnUsers
   */


  export type AggregateWordsOnUsers = {
    _count: WordsOnUsersCountAggregateOutputType | null
    _avg: WordsOnUsersAvgAggregateOutputType | null
    _sum: WordsOnUsersSumAggregateOutputType | null
    _min: WordsOnUsersMinAggregateOutputType | null
    _max: WordsOnUsersMaxAggregateOutputType | null
  }

  export type WordsOnUsersAvgAggregateOutputType = {
    userId: number | null
    frequency: number | null
  }

  export type WordsOnUsersSumAggregateOutputType = {
    userId: number | null
    frequency: number | null
  }

  export type WordsOnUsersMinAggregateOutputType = {
    userId: number | null
    wordId: string | null
    frequency: number | null
  }

  export type WordsOnUsersMaxAggregateOutputType = {
    userId: number | null
    wordId: string | null
    frequency: number | null
  }

  export type WordsOnUsersCountAggregateOutputType = {
    userId: number
    wordId: number
    frequency: number
    _all: number
  }


  export type WordsOnUsersAvgAggregateInputType = {
    userId?: true
    frequency?: true
  }

  export type WordsOnUsersSumAggregateInputType = {
    userId?: true
    frequency?: true
  }

  export type WordsOnUsersMinAggregateInputType = {
    userId?: true
    wordId?: true
    frequency?: true
  }

  export type WordsOnUsersMaxAggregateInputType = {
    userId?: true
    wordId?: true
    frequency?: true
  }

  export type WordsOnUsersCountAggregateInputType = {
    userId?: true
    wordId?: true
    frequency?: true
    _all?: true
  }

  export type WordsOnUsersAggregateArgs = {
    /**
     * Filter which WordsOnUsers to aggregate.
     * 
    **/
    where?: WordsOnUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordsOnUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<WordsOnUsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WordsOnUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordsOnUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordsOnUsers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WordsOnUsers
    **/
    _count?: true | WordsOnUsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordsOnUsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordsOnUsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordsOnUsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordsOnUsersMaxAggregateInputType
  }

  export type GetWordsOnUsersAggregateType<T extends WordsOnUsersAggregateArgs> = {
        [P in keyof T & keyof AggregateWordsOnUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWordsOnUsers[P]>
      : GetScalarType<T[P], AggregateWordsOnUsers[P]>
  }




  export type WordsOnUsersGroupByArgs = {
    where?: WordsOnUsersWhereInput
    orderBy?: Enumerable<WordsOnUsersOrderByWithAggregationInput>
    by: Array<WordsOnUsersScalarFieldEnum>
    having?: WordsOnUsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordsOnUsersCountAggregateInputType | true
    _avg?: WordsOnUsersAvgAggregateInputType
    _sum?: WordsOnUsersSumAggregateInputType
    _min?: WordsOnUsersMinAggregateInputType
    _max?: WordsOnUsersMaxAggregateInputType
  }


  export type WordsOnUsersGroupByOutputType = {
    userId: number
    wordId: string
    frequency: number
    _count: WordsOnUsersCountAggregateOutputType | null
    _avg: WordsOnUsersAvgAggregateOutputType | null
    _sum: WordsOnUsersSumAggregateOutputType | null
    _min: WordsOnUsersMinAggregateOutputType | null
    _max: WordsOnUsersMaxAggregateOutputType | null
  }

  type GetWordsOnUsersGroupByPayload<T extends WordsOnUsersGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WordsOnUsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordsOnUsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordsOnUsersGroupByOutputType[P]>
            : GetScalarType<T[P], WordsOnUsersGroupByOutputType[P]>
        }
      >
    >


  export type WordsOnUsersSelect = {
    user?: boolean | UserArgs
    userId?: boolean
    word?: boolean | WordArgs
    wordId?: boolean
    frequency?: boolean
  }


  export type WordsOnUsersInclude = {
    user?: boolean | UserArgs
    word?: boolean | WordArgs
  } 

  export type WordsOnUsersGetPayload<S extends boolean | null | undefined | WordsOnUsersArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WordsOnUsers :
    S extends undefined ? never :
    S extends { include: any } & (WordsOnUsersArgs | WordsOnUsersFindManyArgs)
    ? WordsOnUsers  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'word' ? WordGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (WordsOnUsersArgs | WordsOnUsersFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'word' ? WordGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof WordsOnUsers ? WordsOnUsers[P] : never
  } 
      : WordsOnUsers


  type WordsOnUsersCountArgs = Merge<
    Omit<WordsOnUsersFindManyArgs, 'select' | 'include'> & {
      select?: WordsOnUsersCountAggregateInputType | true
    }
  >

  export interface WordsOnUsersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one WordsOnUsers that matches the filter.
     * @param {WordsOnUsersFindUniqueArgs} args - Arguments to find a WordsOnUsers
     * @example
     * // Get one WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WordsOnUsersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WordsOnUsersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WordsOnUsers'> extends True ? Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>> : Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T> | null, null>

    /**
     * Find the first WordsOnUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersFindFirstArgs} args - Arguments to find a WordsOnUsers
     * @example
     * // Get one WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WordsOnUsersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WordsOnUsersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WordsOnUsers'> extends True ? Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>> : Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T> | null, null>

    /**
     * Find zero or more WordsOnUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findMany()
     * 
     * // Get first 10 WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const wordsOnUsersWithUserIdOnly = await prisma.wordsOnUsers.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends WordsOnUsersFindManyArgs>(
      args?: SelectSubset<T, WordsOnUsersFindManyArgs>
    ): PrismaPromise<Array<WordsOnUsersGetPayload<T>>>

    /**
     * Create a WordsOnUsers.
     * @param {WordsOnUsersCreateArgs} args - Arguments to create a WordsOnUsers.
     * @example
     * // Create one WordsOnUsers
     * const WordsOnUsers = await prisma.wordsOnUsers.create({
     *   data: {
     *     // ... data to create a WordsOnUsers
     *   }
     * })
     * 
    **/
    create<T extends WordsOnUsersCreateArgs>(
      args: SelectSubset<T, WordsOnUsersCreateArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Create many WordsOnUsers.
     *     @param {WordsOnUsersCreateManyArgs} args - Arguments to create many WordsOnUsers.
     *     @example
     *     // Create many WordsOnUsers
     *     const wordsOnUsers = await prisma.wordsOnUsers.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WordsOnUsersCreateManyArgs>(
      args?: SelectSubset<T, WordsOnUsersCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a WordsOnUsers.
     * @param {WordsOnUsersDeleteArgs} args - Arguments to delete one WordsOnUsers.
     * @example
     * // Delete one WordsOnUsers
     * const WordsOnUsers = await prisma.wordsOnUsers.delete({
     *   where: {
     *     // ... filter to delete one WordsOnUsers
     *   }
     * })
     * 
    **/
    delete<T extends WordsOnUsersDeleteArgs>(
      args: SelectSubset<T, WordsOnUsersDeleteArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Update one WordsOnUsers.
     * @param {WordsOnUsersUpdateArgs} args - Arguments to update one WordsOnUsers.
     * @example
     * // Update one WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WordsOnUsersUpdateArgs>(
      args: SelectSubset<T, WordsOnUsersUpdateArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Delete zero or more WordsOnUsers.
     * @param {WordsOnUsersDeleteManyArgs} args - Arguments to filter WordsOnUsers to delete.
     * @example
     * // Delete a few WordsOnUsers
     * const { count } = await prisma.wordsOnUsers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WordsOnUsersDeleteManyArgs>(
      args?: SelectSubset<T, WordsOnUsersDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordsOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WordsOnUsersUpdateManyArgs>(
      args: SelectSubset<T, WordsOnUsersUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one WordsOnUsers.
     * @param {WordsOnUsersUpsertArgs} args - Arguments to update or create a WordsOnUsers.
     * @example
     * // Update or create a WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.upsert({
     *   create: {
     *     // ... data to create a WordsOnUsers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WordsOnUsers we want to update
     *   }
     * })
    **/
    upsert<T extends WordsOnUsersUpsertArgs>(
      args: SelectSubset<T, WordsOnUsersUpsertArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Find one WordsOnUsers that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WordsOnUsersFindUniqueOrThrowArgs} args - Arguments to find a WordsOnUsers
     * @example
     * // Get one WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WordsOnUsersFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WordsOnUsersFindUniqueOrThrowArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Find the first WordsOnUsers that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersFindFirstOrThrowArgs} args - Arguments to find a WordsOnUsers
     * @example
     * // Get one WordsOnUsers
     * const wordsOnUsers = await prisma.wordsOnUsers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WordsOnUsersFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WordsOnUsersFindFirstOrThrowArgs>
    ): Prisma__WordsOnUsersClient<WordsOnUsersGetPayload<T>>

    /**
     * Count the number of WordsOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersCountArgs} args - Arguments to filter WordsOnUsers to count.
     * @example
     * // Count the number of WordsOnUsers
     * const count = await prisma.wordsOnUsers.count({
     *   where: {
     *     // ... the filter for the WordsOnUsers we want to count
     *   }
     * })
    **/
    count<T extends WordsOnUsersCountArgs>(
      args?: Subset<T, WordsOnUsersCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordsOnUsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WordsOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordsOnUsersAggregateArgs>(args: Subset<T, WordsOnUsersAggregateArgs>): PrismaPromise<GetWordsOnUsersAggregateType<T>>

    /**
     * Group by WordsOnUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordsOnUsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordsOnUsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordsOnUsersGroupByArgs['orderBy'] }
        : { orderBy?: WordsOnUsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordsOnUsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordsOnUsersGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WordsOnUsers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WordsOnUsersClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    word<T extends WordArgs= {}>(args?: Subset<T, WordArgs>): Prisma__WordClient<WordGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WordsOnUsers base type for findUnique actions
   */
  export type WordsOnUsersFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * Filter, which WordsOnUsers to fetch.
     * 
    **/
    where: WordsOnUsersWhereUniqueInput
  }

  /**
   * WordsOnUsers: findUnique
   */
  export interface WordsOnUsersFindUniqueArgs extends WordsOnUsersFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WordsOnUsers base type for findFirst actions
   */
  export type WordsOnUsersFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * Filter, which WordsOnUsers to fetch.
     * 
    **/
    where?: WordsOnUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordsOnUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<WordsOnUsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordsOnUsers.
     * 
    **/
    cursor?: WordsOnUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordsOnUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordsOnUsers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordsOnUsers.
     * 
    **/
    distinct?: Enumerable<WordsOnUsersScalarFieldEnum>
  }

  /**
   * WordsOnUsers: findFirst
   */
  export interface WordsOnUsersFindFirstArgs extends WordsOnUsersFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WordsOnUsers findMany
   */
  export type WordsOnUsersFindManyArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * Filter, which WordsOnUsers to fetch.
     * 
    **/
    where?: WordsOnUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordsOnUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<WordsOnUsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WordsOnUsers.
     * 
    **/
    cursor?: WordsOnUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordsOnUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordsOnUsers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WordsOnUsersScalarFieldEnum>
  }


  /**
   * WordsOnUsers create
   */
  export type WordsOnUsersCreateArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * The data needed to create a WordsOnUsers.
     * 
    **/
    data: XOR<WordsOnUsersCreateInput, WordsOnUsersUncheckedCreateInput>
  }


  /**
   * WordsOnUsers createMany
   */
  export type WordsOnUsersCreateManyArgs = {
    /**
     * The data used to create many WordsOnUsers.
     * 
    **/
    data: Enumerable<WordsOnUsersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WordsOnUsers update
   */
  export type WordsOnUsersUpdateArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * The data needed to update a WordsOnUsers.
     * 
    **/
    data: XOR<WordsOnUsersUpdateInput, WordsOnUsersUncheckedUpdateInput>
    /**
     * Choose, which WordsOnUsers to update.
     * 
    **/
    where: WordsOnUsersWhereUniqueInput
  }


  /**
   * WordsOnUsers updateMany
   */
  export type WordsOnUsersUpdateManyArgs = {
    /**
     * The data used to update WordsOnUsers.
     * 
    **/
    data: XOR<WordsOnUsersUpdateManyMutationInput, WordsOnUsersUncheckedUpdateManyInput>
    /**
     * Filter which WordsOnUsers to update
     * 
    **/
    where?: WordsOnUsersWhereInput
  }


  /**
   * WordsOnUsers upsert
   */
  export type WordsOnUsersUpsertArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * The filter to search for the WordsOnUsers to update in case it exists.
     * 
    **/
    where: WordsOnUsersWhereUniqueInput
    /**
     * In case the WordsOnUsers found by the `where` argument doesn't exist, create a new WordsOnUsers with this data.
     * 
    **/
    create: XOR<WordsOnUsersCreateInput, WordsOnUsersUncheckedCreateInput>
    /**
     * In case the WordsOnUsers was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WordsOnUsersUpdateInput, WordsOnUsersUncheckedUpdateInput>
  }


  /**
   * WordsOnUsers delete
   */
  export type WordsOnUsersDeleteArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
    /**
     * Filter which WordsOnUsers to delete.
     * 
    **/
    where: WordsOnUsersWhereUniqueInput
  }


  /**
   * WordsOnUsers deleteMany
   */
  export type WordsOnUsersDeleteManyArgs = {
    /**
     * Filter which WordsOnUsers to delete
     * 
    **/
    where?: WordsOnUsersWhereInput
  }


  /**
   * WordsOnUsers: findUniqueOrThrow
   */
  export type WordsOnUsersFindUniqueOrThrowArgs = WordsOnUsersFindUniqueArgsBase
      

  /**
   * WordsOnUsers: findFirstOrThrow
   */
  export type WordsOnUsersFindFirstOrThrowArgs = WordsOnUsersFindFirstArgsBase
      

  /**
   * WordsOnUsers without action
   */
  export type WordsOnUsersArgs = {
    /**
     * Select specific fields to fetch from the WordsOnUsers
     * 
    **/
    select?: WordsOnUsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WordsOnUsersInclude | null
  }



  /**
   * Model Entry
   */


  export type AggregateEntry = {
    _count: EntryCountAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  export type EntryMinAggregateOutputType = {
    text: string | null
    part_of_speech: string | null
    transcription: string | null
    wordId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntryMaxAggregateOutputType = {
    text: string | null
    part_of_speech: string | null
    transcription: string | null
    wordId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntryCountAggregateOutputType = {
    text: number
    part_of_speech: number
    transcription: number
    wordId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntryMinAggregateInputType = {
    text?: true
    part_of_speech?: true
    transcription?: true
    wordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntryMaxAggregateInputType = {
    text?: true
    part_of_speech?: true
    transcription?: true
    wordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntryCountAggregateInputType = {
    text?: true
    part_of_speech?: true
    transcription?: true
    wordId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntryAggregateArgs = {
    /**
     * Filter which Entry to aggregate.
     * 
    **/
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entries
    **/
    _count?: true | EntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryMaxAggregateInputType
  }

  export type GetEntryAggregateType<T extends EntryAggregateArgs> = {
        [P in keyof T & keyof AggregateEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntry[P]>
      : GetScalarType<T[P], AggregateEntry[P]>
  }




  export type EntryGroupByArgs = {
    where?: EntryWhereInput
    orderBy?: Enumerable<EntryOrderByWithAggregationInput>
    by: Array<EntryScalarFieldEnum>
    having?: EntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryCountAggregateInputType | true
    _min?: EntryMinAggregateInputType
    _max?: EntryMaxAggregateInputType
  }


  export type EntryGroupByOutputType = {
    text: string
    part_of_speech: string
    transcription: string | null
    wordId: string
    createdAt: Date
    updatedAt: Date
    _count: EntryCountAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  type GetEntryGroupByPayload<T extends EntryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryGroupByOutputType[P]>
            : GetScalarType<T[P], EntryGroupByOutputType[P]>
        }
      >
    >


  export type EntrySelect = {
    text?: boolean
    part_of_speech?: boolean
    transcription?: boolean
    wordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    word?: boolean | WordArgs
    translation?: boolean | TranslationFindManyArgs
    _count?: boolean | EntryCountOutputTypeArgs
  }


  export type EntryInclude = {
    word?: boolean | WordArgs
    translation?: boolean | TranslationFindManyArgs
    _count?: boolean | EntryCountOutputTypeArgs
  } 

  export type EntryGetPayload<S extends boolean | null | undefined | EntryArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Entry :
    S extends undefined ? never :
    S extends { include: any } & (EntryArgs | EntryFindManyArgs)
    ? Entry  & {
    [P in TrueKeys<S['include']>]:
        P extends 'word' ? WordGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'translation' ? Array < TranslationGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? EntryCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (EntryArgs | EntryFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'word' ? WordGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'translation' ? Array < TranslationGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? EntryCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Entry ? Entry[P] : never
  } 
      : Entry


  type EntryCountArgs = Merge<
    Omit<EntryFindManyArgs, 'select' | 'include'> & {
      select?: EntryCountAggregateInputType | true
    }
  >

  export interface EntryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Entry that matches the filter.
     * @param {EntryFindUniqueArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EntryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EntryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Entry'> extends True ? Prisma__EntryClient<EntryGetPayload<T>> : Prisma__EntryClient<EntryGetPayload<T> | null, null>

    /**
     * Find the first Entry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EntryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EntryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Entry'> extends True ? Prisma__EntryClient<EntryGetPayload<T>> : Prisma__EntryClient<EntryGetPayload<T> | null, null>

    /**
     * Find zero or more Entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entries
     * const entries = await prisma.entry.findMany()
     * 
     * // Get first 10 Entries
     * const entries = await prisma.entry.findMany({ take: 10 })
     * 
     * // Only select the `text`
     * const entryWithTextOnly = await prisma.entry.findMany({ select: { text: true } })
     * 
    **/
    findMany<T extends EntryFindManyArgs>(
      args?: SelectSubset<T, EntryFindManyArgs>
    ): PrismaPromise<Array<EntryGetPayload<T>>>

    /**
     * Create a Entry.
     * @param {EntryCreateArgs} args - Arguments to create a Entry.
     * @example
     * // Create one Entry
     * const Entry = await prisma.entry.create({
     *   data: {
     *     // ... data to create a Entry
     *   }
     * })
     * 
    **/
    create<T extends EntryCreateArgs>(
      args: SelectSubset<T, EntryCreateArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Create many Entries.
     *     @param {EntryCreateManyArgs} args - Arguments to create many Entries.
     *     @example
     *     // Create many Entries
     *     const entry = await prisma.entry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EntryCreateManyArgs>(
      args?: SelectSubset<T, EntryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Entry.
     * @param {EntryDeleteArgs} args - Arguments to delete one Entry.
     * @example
     * // Delete one Entry
     * const Entry = await prisma.entry.delete({
     *   where: {
     *     // ... filter to delete one Entry
     *   }
     * })
     * 
    **/
    delete<T extends EntryDeleteArgs>(
      args: SelectSubset<T, EntryDeleteArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Update one Entry.
     * @param {EntryUpdateArgs} args - Arguments to update one Entry.
     * @example
     * // Update one Entry
     * const entry = await prisma.entry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EntryUpdateArgs>(
      args: SelectSubset<T, EntryUpdateArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Delete zero or more Entries.
     * @param {EntryDeleteManyArgs} args - Arguments to filter Entries to delete.
     * @example
     * // Delete a few Entries
     * const { count } = await prisma.entry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EntryDeleteManyArgs>(
      args?: SelectSubset<T, EntryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EntryUpdateManyArgs>(
      args: SelectSubset<T, EntryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Entry.
     * @param {EntryUpsertArgs} args - Arguments to update or create a Entry.
     * @example
     * // Update or create a Entry
     * const entry = await prisma.entry.upsert({
     *   create: {
     *     // ... data to create a Entry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entry we want to update
     *   }
     * })
    **/
    upsert<T extends EntryUpsertArgs>(
      args: SelectSubset<T, EntryUpsertArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Find one Entry that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EntryFindUniqueOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EntryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EntryFindUniqueOrThrowArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Find the first Entry that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EntryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EntryFindFirstOrThrowArgs>
    ): Prisma__EntryClient<EntryGetPayload<T>>

    /**
     * Count the number of Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryCountArgs} args - Arguments to filter Entries to count.
     * @example
     * // Count the number of Entries
     * const count = await prisma.entry.count({
     *   where: {
     *     // ... the filter for the Entries we want to count
     *   }
     * })
    **/
    count<T extends EntryCountArgs>(
      args?: Subset<T, EntryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntryAggregateArgs>(args: Subset<T, EntryAggregateArgs>): PrismaPromise<GetEntryAggregateType<T>>

    /**
     * Group by Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryGroupByArgs['orderBy'] }
        : { orderBy?: EntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Entry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EntryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    word<T extends WordArgs= {}>(args?: Subset<T, WordArgs>): Prisma__WordClient<WordGetPayload<T> | Null>;

    translation<T extends TranslationFindManyArgs= {}>(args?: Subset<T, TranslationFindManyArgs>): PrismaPromise<Array<TranslationGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Entry base type for findUnique actions
   */
  export type EntryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * Filter, which Entry to fetch.
     * 
    **/
    where: EntryWhereUniqueInput
  }

  /**
   * Entry: findUnique
   */
  export interface EntryFindUniqueArgs extends EntryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Entry base type for findFirst actions
   */
  export type EntryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * Filter, which Entry to fetch.
     * 
    **/
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entries.
     * 
    **/
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     * 
    **/
    distinct?: Enumerable<EntryScalarFieldEnum>
  }

  /**
   * Entry: findFirst
   */
  export interface EntryFindFirstArgs extends EntryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Entry findMany
   */
  export type EntryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * Filter, which Entries to fetch.
     * 
    **/
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entries.
     * 
    **/
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EntryScalarFieldEnum>
  }


  /**
   * Entry create
   */
  export type EntryCreateArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * The data needed to create a Entry.
     * 
    **/
    data: XOR<EntryCreateInput, EntryUncheckedCreateInput>
  }


  /**
   * Entry createMany
   */
  export type EntryCreateManyArgs = {
    /**
     * The data used to create many Entries.
     * 
    **/
    data: Enumerable<EntryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Entry update
   */
  export type EntryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * The data needed to update a Entry.
     * 
    **/
    data: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
    /**
     * Choose, which Entry to update.
     * 
    **/
    where: EntryWhereUniqueInput
  }


  /**
   * Entry updateMany
   */
  export type EntryUpdateManyArgs = {
    /**
     * The data used to update Entries.
     * 
    **/
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>
    /**
     * Filter which Entries to update
     * 
    **/
    where?: EntryWhereInput
  }


  /**
   * Entry upsert
   */
  export type EntryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * The filter to search for the Entry to update in case it exists.
     * 
    **/
    where: EntryWhereUniqueInput
    /**
     * In case the Entry found by the `where` argument doesn't exist, create a new Entry with this data.
     * 
    **/
    create: XOR<EntryCreateInput, EntryUncheckedCreateInput>
    /**
     * In case the Entry was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
  }


  /**
   * Entry delete
   */
  export type EntryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
    /**
     * Filter which Entry to delete.
     * 
    **/
    where: EntryWhereUniqueInput
  }


  /**
   * Entry deleteMany
   */
  export type EntryDeleteManyArgs = {
    /**
     * Filter which Entries to delete
     * 
    **/
    where?: EntryWhereInput
  }


  /**
   * Entry: findUniqueOrThrow
   */
  export type EntryFindUniqueOrThrowArgs = EntryFindUniqueArgsBase
      

  /**
   * Entry: findFirstOrThrow
   */
  export type EntryFindFirstOrThrowArgs = EntryFindFirstArgsBase
      

  /**
   * Entry without action
   */
  export type EntryArgs = {
    /**
     * Select specific fields to fetch from the Entry
     * 
    **/
    select?: EntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryInclude | null
  }



  /**
   * Model Translation
   */


  export type AggregateTranslation = {
    _count: TranslationCountAggregateOutputType | null
    _min: TranslationMinAggregateOutputType | null
    _max: TranslationMaxAggregateOutputType | null
  }

  export type TranslationMinAggregateOutputType = {
    id: string | null
    text: string | null
    part_of_speech: string | null
    synonym: string | null
    meaning: string | null
    example: string | null
    createdAt: Date | null
    updatedAt: Date | null
    entryText: string | null
    entryPart_of_speech: string | null
  }

  export type TranslationMaxAggregateOutputType = {
    id: string | null
    text: string | null
    part_of_speech: string | null
    synonym: string | null
    meaning: string | null
    example: string | null
    createdAt: Date | null
    updatedAt: Date | null
    entryText: string | null
    entryPart_of_speech: string | null
  }

  export type TranslationCountAggregateOutputType = {
    id: number
    text: number
    part_of_speech: number
    synonym: number
    meaning: number
    example: number
    createdAt: number
    updatedAt: number
    entryText: number
    entryPart_of_speech: number
    _all: number
  }


  export type TranslationMinAggregateInputType = {
    id?: true
    text?: true
    part_of_speech?: true
    synonym?: true
    meaning?: true
    example?: true
    createdAt?: true
    updatedAt?: true
    entryText?: true
    entryPart_of_speech?: true
  }

  export type TranslationMaxAggregateInputType = {
    id?: true
    text?: true
    part_of_speech?: true
    synonym?: true
    meaning?: true
    example?: true
    createdAt?: true
    updatedAt?: true
    entryText?: true
    entryPart_of_speech?: true
  }

  export type TranslationCountAggregateInputType = {
    id?: true
    text?: true
    part_of_speech?: true
    synonym?: true
    meaning?: true
    example?: true
    createdAt?: true
    updatedAt?: true
    entryText?: true
    entryPart_of_speech?: true
    _all?: true
  }

  export type TranslationAggregateArgs = {
    /**
     * Filter which Translation to aggregate.
     * 
    **/
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     * 
    **/
    orderBy?: Enumerable<TranslationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Translations
    **/
    _count?: true | TranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TranslationMaxAggregateInputType
  }

  export type GetTranslationAggregateType<T extends TranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTranslation[P]>
      : GetScalarType<T[P], AggregateTranslation[P]>
  }




  export type TranslationGroupByArgs = {
    where?: TranslationWhereInput
    orderBy?: Enumerable<TranslationOrderByWithAggregationInput>
    by: Array<TranslationScalarFieldEnum>
    having?: TranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TranslationCountAggregateInputType | true
    _min?: TranslationMinAggregateInputType
    _max?: TranslationMaxAggregateInputType
  }


  export type TranslationGroupByOutputType = {
    id: string
    text: string
    part_of_speech: string
    synonym: string | null
    meaning: string | null
    example: string | null
    createdAt: Date
    updatedAt: Date
    entryText: string
    entryPart_of_speech: string
    _count: TranslationCountAggregateOutputType | null
    _min: TranslationMinAggregateOutputType | null
    _max: TranslationMaxAggregateOutputType | null
  }

  type GetTranslationGroupByPayload<T extends TranslationGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TranslationGroupByOutputType[P]>
            : GetScalarType<T[P], TranslationGroupByOutputType[P]>
        }
      >
    >


  export type TranslationSelect = {
    id?: boolean
    text?: boolean
    part_of_speech?: boolean
    synonym?: boolean
    meaning?: boolean
    example?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entry?: boolean | EntryArgs
    entryText?: boolean
    entryPart_of_speech?: boolean
  }


  export type TranslationInclude = {
    entry?: boolean | EntryArgs
  } 

  export type TranslationGetPayload<S extends boolean | null | undefined | TranslationArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Translation :
    S extends undefined ? never :
    S extends { include: any } & (TranslationArgs | TranslationFindManyArgs)
    ? Translation  & {
    [P in TrueKeys<S['include']>]:
        P extends 'entry' ? EntryGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (TranslationArgs | TranslationFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'entry' ? EntryGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Translation ? Translation[P] : never
  } 
      : Translation


  type TranslationCountArgs = Merge<
    Omit<TranslationFindManyArgs, 'select' | 'include'> & {
      select?: TranslationCountAggregateInputType | true
    }
  >

  export interface TranslationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Translation that matches the filter.
     * @param {TranslationFindUniqueArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TranslationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TranslationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Translation'> extends True ? Prisma__TranslationClient<TranslationGetPayload<T>> : Prisma__TranslationClient<TranslationGetPayload<T> | null, null>

    /**
     * Find the first Translation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindFirstArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TranslationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TranslationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Translation'> extends True ? Prisma__TranslationClient<TranslationGetPayload<T>> : Prisma__TranslationClient<TranslationGetPayload<T> | null, null>

    /**
     * Find zero or more Translations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Translations
     * const translations = await prisma.translation.findMany()
     * 
     * // Get first 10 Translations
     * const translations = await prisma.translation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const translationWithIdOnly = await prisma.translation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TranslationFindManyArgs>(
      args?: SelectSubset<T, TranslationFindManyArgs>
    ): PrismaPromise<Array<TranslationGetPayload<T>>>

    /**
     * Create a Translation.
     * @param {TranslationCreateArgs} args - Arguments to create a Translation.
     * @example
     * // Create one Translation
     * const Translation = await prisma.translation.create({
     *   data: {
     *     // ... data to create a Translation
     *   }
     * })
     * 
    **/
    create<T extends TranslationCreateArgs>(
      args: SelectSubset<T, TranslationCreateArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Create many Translations.
     *     @param {TranslationCreateManyArgs} args - Arguments to create many Translations.
     *     @example
     *     // Create many Translations
     *     const translation = await prisma.translation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TranslationCreateManyArgs>(
      args?: SelectSubset<T, TranslationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Translation.
     * @param {TranslationDeleteArgs} args - Arguments to delete one Translation.
     * @example
     * // Delete one Translation
     * const Translation = await prisma.translation.delete({
     *   where: {
     *     // ... filter to delete one Translation
     *   }
     * })
     * 
    **/
    delete<T extends TranslationDeleteArgs>(
      args: SelectSubset<T, TranslationDeleteArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Update one Translation.
     * @param {TranslationUpdateArgs} args - Arguments to update one Translation.
     * @example
     * // Update one Translation
     * const translation = await prisma.translation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TranslationUpdateArgs>(
      args: SelectSubset<T, TranslationUpdateArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Delete zero or more Translations.
     * @param {TranslationDeleteManyArgs} args - Arguments to filter Translations to delete.
     * @example
     * // Delete a few Translations
     * const { count } = await prisma.translation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TranslationDeleteManyArgs>(
      args?: SelectSubset<T, TranslationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Translations
     * const translation = await prisma.translation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TranslationUpdateManyArgs>(
      args: SelectSubset<T, TranslationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Translation.
     * @param {TranslationUpsertArgs} args - Arguments to update or create a Translation.
     * @example
     * // Update or create a Translation
     * const translation = await prisma.translation.upsert({
     *   create: {
     *     // ... data to create a Translation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Translation we want to update
     *   }
     * })
    **/
    upsert<T extends TranslationUpsertArgs>(
      args: SelectSubset<T, TranslationUpsertArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Find one Translation that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TranslationFindUniqueOrThrowArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TranslationFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TranslationFindUniqueOrThrowArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Find the first Translation that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindFirstOrThrowArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TranslationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TranslationFindFirstOrThrowArgs>
    ): Prisma__TranslationClient<TranslationGetPayload<T>>

    /**
     * Count the number of Translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationCountArgs} args - Arguments to filter Translations to count.
     * @example
     * // Count the number of Translations
     * const count = await prisma.translation.count({
     *   where: {
     *     // ... the filter for the Translations we want to count
     *   }
     * })
    **/
    count<T extends TranslationCountArgs>(
      args?: Subset<T, TranslationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Translation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TranslationAggregateArgs>(args: Subset<T, TranslationAggregateArgs>): PrismaPromise<GetTranslationAggregateType<T>>

    /**
     * Group by Translation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TranslationGroupByArgs['orderBy'] }
        : { orderBy?: TranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTranslationGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Translation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TranslationClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    entry<T extends EntryArgs= {}>(args?: Subset<T, EntryArgs>): Prisma__EntryClient<EntryGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Translation base type for findUnique actions
   */
  export type TranslationFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * Filter, which Translation to fetch.
     * 
    **/
    where: TranslationWhereUniqueInput
  }

  /**
   * Translation: findUnique
   */
  export interface TranslationFindUniqueArgs extends TranslationFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Translation base type for findFirst actions
   */
  export type TranslationFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * Filter, which Translation to fetch.
     * 
    **/
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     * 
    **/
    orderBy?: Enumerable<TranslationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Translations.
     * 
    **/
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Translations.
     * 
    **/
    distinct?: Enumerable<TranslationScalarFieldEnum>
  }

  /**
   * Translation: findFirst
   */
  export interface TranslationFindFirstArgs extends TranslationFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Translation findMany
   */
  export type TranslationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * Filter, which Translations to fetch.
     * 
    **/
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     * 
    **/
    orderBy?: Enumerable<TranslationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Translations.
     * 
    **/
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TranslationScalarFieldEnum>
  }


  /**
   * Translation create
   */
  export type TranslationCreateArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * The data needed to create a Translation.
     * 
    **/
    data: XOR<TranslationCreateInput, TranslationUncheckedCreateInput>
  }


  /**
   * Translation createMany
   */
  export type TranslationCreateManyArgs = {
    /**
     * The data used to create many Translations.
     * 
    **/
    data: Enumerable<TranslationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Translation update
   */
  export type TranslationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * The data needed to update a Translation.
     * 
    **/
    data: XOR<TranslationUpdateInput, TranslationUncheckedUpdateInput>
    /**
     * Choose, which Translation to update.
     * 
    **/
    where: TranslationWhereUniqueInput
  }


  /**
   * Translation updateMany
   */
  export type TranslationUpdateManyArgs = {
    /**
     * The data used to update Translations.
     * 
    **/
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyInput>
    /**
     * Filter which Translations to update
     * 
    **/
    where?: TranslationWhereInput
  }


  /**
   * Translation upsert
   */
  export type TranslationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * The filter to search for the Translation to update in case it exists.
     * 
    **/
    where: TranslationWhereUniqueInput
    /**
     * In case the Translation found by the `where` argument doesn't exist, create a new Translation with this data.
     * 
    **/
    create: XOR<TranslationCreateInput, TranslationUncheckedCreateInput>
    /**
     * In case the Translation was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TranslationUpdateInput, TranslationUncheckedUpdateInput>
  }


  /**
   * Translation delete
   */
  export type TranslationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
    /**
     * Filter which Translation to delete.
     * 
    **/
    where: TranslationWhereUniqueInput
  }


  /**
   * Translation deleteMany
   */
  export type TranslationDeleteManyArgs = {
    /**
     * Filter which Translations to delete
     * 
    **/
    where?: TranslationWhereInput
  }


  /**
   * Translation: findUniqueOrThrow
   */
  export type TranslationFindUniqueOrThrowArgs = TranslationFindUniqueArgsBase
      

  /**
   * Translation: findFirstOrThrow
   */
  export type TranslationFindFirstOrThrowArgs = TranslationFindFirstArgsBase
      

  /**
   * Translation without action
   */
  export type TranslationArgs = {
    /**
     * Select specific fields to fetch from the Translation
     * 
    **/
    select?: TranslationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TranslationInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const EntryScalarFieldEnum: {
    text: 'text',
    part_of_speech: 'part_of_speech',
    transcription: 'transcription',
    wordId: 'wordId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntryScalarFieldEnum = (typeof EntryScalarFieldEnum)[keyof typeof EntryScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TranslationScalarFieldEnum: {
    id: 'id',
    text: 'text',
    part_of_speech: 'part_of_speech',
    synonym: 'synonym',
    meaning: 'meaning',
    example: 'example',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    entryText: 'entryText',
    entryPart_of_speech: 'entryPart_of_speech'
  };

  export type TranslationScalarFieldEnum = (typeof TranslationScalarFieldEnum)[keyof typeof TranslationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    first_name: 'first_name',
    lastSendTime: 'lastSendTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    mode: 'mode',
    period: 'period',
    language: 'language'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WordScalarFieldEnum: {
    text: 'text',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    language: 'language'
  };

  export type WordScalarFieldEnum = (typeof WordScalarFieldEnum)[keyof typeof WordScalarFieldEnum]


  export const WordsOnUsersScalarFieldEnum: {
    userId: 'userId',
    wordId: 'wordId',
    frequency: 'frequency'
  };

  export type WordsOnUsersScalarFieldEnum = (typeof WordsOnUsersScalarFieldEnum)[keyof typeof WordsOnUsersScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    telegramId?: IntFilter | number
    username?: StringNullableFilter | string | null
    first_name?: StringNullableFilter | string | null
    lastSendTime?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    mode?: StringFilter | string
    period?: IntFilter | number
    language?: StringFilter | string
    wordsOnUsers?: WordsOnUsersListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    lastSendTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mode?: SortOrder
    period?: SortOrder
    language?: SortOrder
    wordsOnUsers?: WordsOnUsersOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    telegramId?: number
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    lastSendTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mode?: SortOrder
    period?: SortOrder
    language?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    telegramId?: IntWithAggregatesFilter | number
    username?: StringNullableWithAggregatesFilter | string | null
    first_name?: StringNullableWithAggregatesFilter | string | null
    lastSendTime?: DateTimeWithAggregatesFilter | Date | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    mode?: StringWithAggregatesFilter | string
    period?: IntWithAggregatesFilter | number
    language?: StringWithAggregatesFilter | string
  }

  export type WordWhereInput = {
    AND?: Enumerable<WordWhereInput>
    OR?: Enumerable<WordWhereInput>
    NOT?: Enumerable<WordWhereInput>
    text?: StringFilter | string
    entry?: EntryListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    language?: StringFilter | string
    wordsOnUsers?: WordsOnUsersListRelationFilter
  }

  export type WordOrderByWithRelationInput = {
    text?: SortOrder
    entry?: EntryOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    language?: SortOrder
    wordsOnUsers?: WordsOnUsersOrderByRelationAggregateInput
  }

  export type WordWhereUniqueInput = {
    text?: string
  }

  export type WordOrderByWithAggregationInput = {
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    language?: SortOrder
    _count?: WordCountOrderByAggregateInput
    _max?: WordMaxOrderByAggregateInput
    _min?: WordMinOrderByAggregateInput
  }

  export type WordScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WordScalarWhereWithAggregatesInput>
    OR?: Enumerable<WordScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WordScalarWhereWithAggregatesInput>
    text?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    language?: StringWithAggregatesFilter | string
  }

  export type WordsOnUsersWhereInput = {
    AND?: Enumerable<WordsOnUsersWhereInput>
    OR?: Enumerable<WordsOnUsersWhereInput>
    NOT?: Enumerable<WordsOnUsersWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    word?: XOR<WordRelationFilter, WordWhereInput>
    wordId?: StringFilter | string
    frequency?: IntFilter | number
  }

  export type WordsOnUsersOrderByWithRelationInput = {
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    word?: WordOrderByWithRelationInput
    wordId?: SortOrder
    frequency?: SortOrder
  }

  export type WordsOnUsersWhereUniqueInput = {
    userId_wordId?: WordsOnUsersUserIdWordIdCompoundUniqueInput
  }

  export type WordsOnUsersOrderByWithAggregationInput = {
    userId?: SortOrder
    wordId?: SortOrder
    frequency?: SortOrder
    _count?: WordsOnUsersCountOrderByAggregateInput
    _avg?: WordsOnUsersAvgOrderByAggregateInput
    _max?: WordsOnUsersMaxOrderByAggregateInput
    _min?: WordsOnUsersMinOrderByAggregateInput
    _sum?: WordsOnUsersSumOrderByAggregateInput
  }

  export type WordsOnUsersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WordsOnUsersScalarWhereWithAggregatesInput>
    OR?: Enumerable<WordsOnUsersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WordsOnUsersScalarWhereWithAggregatesInput>
    userId?: IntWithAggregatesFilter | number
    wordId?: StringWithAggregatesFilter | string
    frequency?: IntWithAggregatesFilter | number
  }

  export type EntryWhereInput = {
    AND?: Enumerable<EntryWhereInput>
    OR?: Enumerable<EntryWhereInput>
    NOT?: Enumerable<EntryWhereInput>
    text?: StringFilter | string
    part_of_speech?: StringFilter | string
    transcription?: StringNullableFilter | string | null
    wordId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    word?: XOR<WordRelationFilter, WordWhereInput>
    translation?: TranslationListRelationFilter
  }

  export type EntryOrderByWithRelationInput = {
    text?: SortOrder
    part_of_speech?: SortOrder
    transcription?: SortOrder
    wordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    word?: WordOrderByWithRelationInput
    translation?: TranslationOrderByRelationAggregateInput
  }

  export type EntryWhereUniqueInput = {
    text_part_of_speech?: EntryTextPart_of_speechCompoundUniqueInput
  }

  export type EntryOrderByWithAggregationInput = {
    text?: SortOrder
    part_of_speech?: SortOrder
    transcription?: SortOrder
    wordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntryCountOrderByAggregateInput
    _max?: EntryMaxOrderByAggregateInput
    _min?: EntryMinOrderByAggregateInput
  }

  export type EntryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EntryScalarWhereWithAggregatesInput>
    OR?: Enumerable<EntryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EntryScalarWhereWithAggregatesInput>
    text?: StringWithAggregatesFilter | string
    part_of_speech?: StringWithAggregatesFilter | string
    transcription?: StringNullableWithAggregatesFilter | string | null
    wordId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TranslationWhereInput = {
    AND?: Enumerable<TranslationWhereInput>
    OR?: Enumerable<TranslationWhereInput>
    NOT?: Enumerable<TranslationWhereInput>
    id?: StringFilter | string
    text?: StringFilter | string
    part_of_speech?: StringFilter | string
    synonym?: StringNullableFilter | string | null
    meaning?: StringNullableFilter | string | null
    example?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    entry?: XOR<EntryRelationFilter, EntryWhereInput>
    entryText?: StringFilter | string
    entryPart_of_speech?: StringFilter | string
  }

  export type TranslationOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    part_of_speech?: SortOrder
    synonym?: SortOrder
    meaning?: SortOrder
    example?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entry?: EntryOrderByWithRelationInput
    entryText?: SortOrder
    entryPart_of_speech?: SortOrder
  }

  export type TranslationWhereUniqueInput = {
    id?: string
  }

  export type TranslationOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    part_of_speech?: SortOrder
    synonym?: SortOrder
    meaning?: SortOrder
    example?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entryText?: SortOrder
    entryPart_of_speech?: SortOrder
    _count?: TranslationCountOrderByAggregateInput
    _max?: TranslationMaxOrderByAggregateInput
    _min?: TranslationMinOrderByAggregateInput
  }

  export type TranslationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TranslationScalarWhereWithAggregatesInput>
    OR?: Enumerable<TranslationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TranslationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    text?: StringWithAggregatesFilter | string
    part_of_speech?: StringWithAggregatesFilter | string
    synonym?: StringNullableWithAggregatesFilter | string | null
    meaning?: StringNullableWithAggregatesFilter | string | null
    example?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    entryText?: StringWithAggregatesFilter | string
    entryPart_of_speech?: StringWithAggregatesFilter | string
  }

  export type UserCreateInput = {
    id?: string
    telegramId: number
    username?: string | null
    first_name?: string | null
    lastSendTime?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mode?: string
    period?: number
    language?: string
    wordsOnUsers?: WordsOnUsersCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    telegramId: number
    username?: string | null
    first_name?: string | null
    lastSendTime?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mode?: string
    period?: number
    language?: string
    wordsOnUsers?: WordsOnUsersUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    telegramId: number
    username?: string | null
    first_name?: string | null
    lastSendTime?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mode?: string
    period?: number
    language?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordCreateInput = {
    text: string
    entry?: EntryCreateNestedManyWithoutWordInput
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
    wordsOnUsers?: WordsOnUsersCreateNestedManyWithoutWordInput
  }

  export type WordUncheckedCreateInput = {
    text: string
    entry?: EntryUncheckedCreateNestedManyWithoutWordInput
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
    wordsOnUsers?: WordsOnUsersUncheckedCreateNestedManyWithoutWordInput
  }

  export type WordUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    entry?: EntryUpdateManyWithoutWordNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    entry?: EntryUncheckedUpdateManyWithoutWordNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUncheckedUpdateManyWithoutWordNestedInput
  }

  export type WordCreateManyInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
  }

  export type WordUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordUncheckedUpdateManyInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordsOnUsersCreateInput = {
    user: UserCreateNestedOneWithoutWordsOnUsersInput
    word: WordCreateNestedOneWithoutWordsOnUsersInput
    frequency?: number
  }

  export type WordsOnUsersUncheckedCreateInput = {
    userId: number
    wordId: string
    frequency?: number
  }

  export type WordsOnUsersUpdateInput = {
    user?: UserUpdateOneRequiredWithoutWordsOnUsersNestedInput
    word?: WordUpdateOneRequiredWithoutWordsOnUsersNestedInput
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    wordId?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersCreateManyInput = {
    userId: number
    wordId: string
    frequency?: number
  }

  export type WordsOnUsersUpdateManyMutationInput = {
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    wordId?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type EntryCreateInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    word: WordCreateNestedOneWithoutEntryInput
    translation?: TranslationCreateNestedManyWithoutEntryInput
  }

  export type EntryUncheckedCreateInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    wordId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    translation?: TranslationUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EntryUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    word?: WordUpdateOneRequiredWithoutEntryNestedInput
    translation?: TranslationUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    wordId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translation?: TranslationUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EntryCreateManyInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    wordId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntryUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryUncheckedUpdateManyInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    wordId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranslationCreateInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entry: EntryCreateNestedOneWithoutTranslationInput
  }

  export type TranslationUncheckedCreateInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entryText: string
    entryPart_of_speech: string
  }

  export type TranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: EntryUpdateOneRequiredWithoutTranslationNestedInput
  }

  export type TranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryText?: StringFieldUpdateOperationsInput | string
    entryPart_of_speech?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationCreateManyInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entryText: string
    entryPart_of_speech: string
  }

  export type TranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryText?: StringFieldUpdateOperationsInput | string
    entryPart_of_speech?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type WordsOnUsersListRelationFilter = {
    every?: WordsOnUsersWhereInput
    some?: WordsOnUsersWhereInput
    none?: WordsOnUsersWhereInput
  }

  export type WordsOnUsersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    lastSendTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mode?: SortOrder
    period?: SortOrder
    language?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    telegramId?: SortOrder
    period?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    lastSendTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mode?: SortOrder
    period?: SortOrder
    language?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    lastSendTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mode?: SortOrder
    period?: SortOrder
    language?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    telegramId?: SortOrder
    period?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EntryListRelationFilter = {
    every?: EntryWhereInput
    some?: EntryWhereInput
    none?: EntryWhereInput
  }

  export type EntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WordCountOrderByAggregateInput = {
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    language?: SortOrder
  }

  export type WordMaxOrderByAggregateInput = {
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    language?: SortOrder
  }

  export type WordMinOrderByAggregateInput = {
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    language?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WordRelationFilter = {
    is?: WordWhereInput
    isNot?: WordWhereInput
  }

  export type WordsOnUsersUserIdWordIdCompoundUniqueInput = {
    userId: number
    wordId: string
  }

  export type WordsOnUsersCountOrderByAggregateInput = {
    userId?: SortOrder
    wordId?: SortOrder
    frequency?: SortOrder
  }

  export type WordsOnUsersAvgOrderByAggregateInput = {
    userId?: SortOrder
    frequency?: SortOrder
  }

  export type WordsOnUsersMaxOrderByAggregateInput = {
    userId?: SortOrder
    wordId?: SortOrder
    frequency?: SortOrder
  }

  export type WordsOnUsersMinOrderByAggregateInput = {
    userId?: SortOrder
    wordId?: SortOrder
    frequency?: SortOrder
  }

  export type WordsOnUsersSumOrderByAggregateInput = {
    userId?: SortOrder
    frequency?: SortOrder
  }

  export type TranslationListRelationFilter = {
    every?: TranslationWhereInput
    some?: TranslationWhereInput
    none?: TranslationWhereInput
  }

  export type TranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntryTextPart_of_speechCompoundUniqueInput = {
    text: string
    part_of_speech: string
  }

  export type EntryCountOrderByAggregateInput = {
    text?: SortOrder
    part_of_speech?: SortOrder
    transcription?: SortOrder
    wordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntryMaxOrderByAggregateInput = {
    text?: SortOrder
    part_of_speech?: SortOrder
    transcription?: SortOrder
    wordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntryMinOrderByAggregateInput = {
    text?: SortOrder
    part_of_speech?: SortOrder
    transcription?: SortOrder
    wordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntryRelationFilter = {
    is?: EntryWhereInput
    isNot?: EntryWhereInput
  }

  export type TranslationCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    part_of_speech?: SortOrder
    synonym?: SortOrder
    meaning?: SortOrder
    example?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entryText?: SortOrder
    entryPart_of_speech?: SortOrder
  }

  export type TranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    part_of_speech?: SortOrder
    synonym?: SortOrder
    meaning?: SortOrder
    example?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entryText?: SortOrder
    entryPart_of_speech?: SortOrder
  }

  export type TranslationMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    part_of_speech?: SortOrder
    synonym?: SortOrder
    meaning?: SortOrder
    example?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entryText?: SortOrder
    entryPart_of_speech?: SortOrder
  }

  export type WordsOnUsersCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutUserInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutUserInput>
    createMany?: WordsOnUsersCreateManyUserInputEnvelope
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
  }

  export type WordsOnUsersUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutUserInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutUserInput>
    createMany?: WordsOnUsersCreateManyUserInputEnvelope
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WordsOnUsersUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutUserInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WordsOnUsersUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WordsOnUsersCreateManyUserInputEnvelope
    set?: Enumerable<WordsOnUsersWhereUniqueInput>
    disconnect?: Enumerable<WordsOnUsersWhereUniqueInput>
    delete?: Enumerable<WordsOnUsersWhereUniqueInput>
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
    update?: Enumerable<WordsOnUsersUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WordsOnUsersUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WordsOnUsersScalarWhereInput>
  }

  export type WordsOnUsersUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutUserInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WordsOnUsersUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WordsOnUsersCreateManyUserInputEnvelope
    set?: Enumerable<WordsOnUsersWhereUniqueInput>
    disconnect?: Enumerable<WordsOnUsersWhereUniqueInput>
    delete?: Enumerable<WordsOnUsersWhereUniqueInput>
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
    update?: Enumerable<WordsOnUsersUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WordsOnUsersUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WordsOnUsersScalarWhereInput>
  }

  export type EntryCreateNestedManyWithoutWordInput = {
    create?: XOR<Enumerable<EntryCreateWithoutWordInput>, Enumerable<EntryUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<EntryCreateOrConnectWithoutWordInput>
    createMany?: EntryCreateManyWordInputEnvelope
    connect?: Enumerable<EntryWhereUniqueInput>
  }

  export type WordsOnUsersCreateNestedManyWithoutWordInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutWordInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutWordInput>
    createMany?: WordsOnUsersCreateManyWordInputEnvelope
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
  }

  export type EntryUncheckedCreateNestedManyWithoutWordInput = {
    create?: XOR<Enumerable<EntryCreateWithoutWordInput>, Enumerable<EntryUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<EntryCreateOrConnectWithoutWordInput>
    createMany?: EntryCreateManyWordInputEnvelope
    connect?: Enumerable<EntryWhereUniqueInput>
  }

  export type WordsOnUsersUncheckedCreateNestedManyWithoutWordInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutWordInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutWordInput>
    createMany?: WordsOnUsersCreateManyWordInputEnvelope
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
  }

  export type EntryUpdateManyWithoutWordNestedInput = {
    create?: XOR<Enumerable<EntryCreateWithoutWordInput>, Enumerable<EntryUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<EntryCreateOrConnectWithoutWordInput>
    upsert?: Enumerable<EntryUpsertWithWhereUniqueWithoutWordInput>
    createMany?: EntryCreateManyWordInputEnvelope
    set?: Enumerable<EntryWhereUniqueInput>
    disconnect?: Enumerable<EntryWhereUniqueInput>
    delete?: Enumerable<EntryWhereUniqueInput>
    connect?: Enumerable<EntryWhereUniqueInput>
    update?: Enumerable<EntryUpdateWithWhereUniqueWithoutWordInput>
    updateMany?: Enumerable<EntryUpdateManyWithWhereWithoutWordInput>
    deleteMany?: Enumerable<EntryScalarWhereInput>
  }

  export type WordsOnUsersUpdateManyWithoutWordNestedInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutWordInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutWordInput>
    upsert?: Enumerable<WordsOnUsersUpsertWithWhereUniqueWithoutWordInput>
    createMany?: WordsOnUsersCreateManyWordInputEnvelope
    set?: Enumerable<WordsOnUsersWhereUniqueInput>
    disconnect?: Enumerable<WordsOnUsersWhereUniqueInput>
    delete?: Enumerable<WordsOnUsersWhereUniqueInput>
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
    update?: Enumerable<WordsOnUsersUpdateWithWhereUniqueWithoutWordInput>
    updateMany?: Enumerable<WordsOnUsersUpdateManyWithWhereWithoutWordInput>
    deleteMany?: Enumerable<WordsOnUsersScalarWhereInput>
  }

  export type EntryUncheckedUpdateManyWithoutWordNestedInput = {
    create?: XOR<Enumerable<EntryCreateWithoutWordInput>, Enumerable<EntryUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<EntryCreateOrConnectWithoutWordInput>
    upsert?: Enumerable<EntryUpsertWithWhereUniqueWithoutWordInput>
    createMany?: EntryCreateManyWordInputEnvelope
    set?: Enumerable<EntryWhereUniqueInput>
    disconnect?: Enumerable<EntryWhereUniqueInput>
    delete?: Enumerable<EntryWhereUniqueInput>
    connect?: Enumerable<EntryWhereUniqueInput>
    update?: Enumerable<EntryUpdateWithWhereUniqueWithoutWordInput>
    updateMany?: Enumerable<EntryUpdateManyWithWhereWithoutWordInput>
    deleteMany?: Enumerable<EntryScalarWhereInput>
  }

  export type WordsOnUsersUncheckedUpdateManyWithoutWordNestedInput = {
    create?: XOR<Enumerable<WordsOnUsersCreateWithoutWordInput>, Enumerable<WordsOnUsersUncheckedCreateWithoutWordInput>>
    connectOrCreate?: Enumerable<WordsOnUsersCreateOrConnectWithoutWordInput>
    upsert?: Enumerable<WordsOnUsersUpsertWithWhereUniqueWithoutWordInput>
    createMany?: WordsOnUsersCreateManyWordInputEnvelope
    set?: Enumerable<WordsOnUsersWhereUniqueInput>
    disconnect?: Enumerable<WordsOnUsersWhereUniqueInput>
    delete?: Enumerable<WordsOnUsersWhereUniqueInput>
    connect?: Enumerable<WordsOnUsersWhereUniqueInput>
    update?: Enumerable<WordsOnUsersUpdateWithWhereUniqueWithoutWordInput>
    updateMany?: Enumerable<WordsOnUsersUpdateManyWithWhereWithoutWordInput>
    deleteMany?: Enumerable<WordsOnUsersScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutWordsOnUsersInput = {
    create?: XOR<UserCreateWithoutWordsOnUsersInput, UserUncheckedCreateWithoutWordsOnUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWordsOnUsersInput
    connect?: UserWhereUniqueInput
  }

  export type WordCreateNestedOneWithoutWordsOnUsersInput = {
    create?: XOR<WordCreateWithoutWordsOnUsersInput, WordUncheckedCreateWithoutWordsOnUsersInput>
    connectOrCreate?: WordCreateOrConnectWithoutWordsOnUsersInput
    connect?: WordWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWordsOnUsersNestedInput = {
    create?: XOR<UserCreateWithoutWordsOnUsersInput, UserUncheckedCreateWithoutWordsOnUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWordsOnUsersInput
    upsert?: UserUpsertWithoutWordsOnUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutWordsOnUsersInput, UserUncheckedUpdateWithoutWordsOnUsersInput>
  }

  export type WordUpdateOneRequiredWithoutWordsOnUsersNestedInput = {
    create?: XOR<WordCreateWithoutWordsOnUsersInput, WordUncheckedCreateWithoutWordsOnUsersInput>
    connectOrCreate?: WordCreateOrConnectWithoutWordsOnUsersInput
    upsert?: WordUpsertWithoutWordsOnUsersInput
    connect?: WordWhereUniqueInput
    update?: XOR<WordUpdateWithoutWordsOnUsersInput, WordUncheckedUpdateWithoutWordsOnUsersInput>
  }

  export type WordCreateNestedOneWithoutEntryInput = {
    create?: XOR<WordCreateWithoutEntryInput, WordUncheckedCreateWithoutEntryInput>
    connectOrCreate?: WordCreateOrConnectWithoutEntryInput
    connect?: WordWhereUniqueInput
  }

  export type TranslationCreateNestedManyWithoutEntryInput = {
    create?: XOR<Enumerable<TranslationCreateWithoutEntryInput>, Enumerable<TranslationUncheckedCreateWithoutEntryInput>>
    connectOrCreate?: Enumerable<TranslationCreateOrConnectWithoutEntryInput>
    createMany?: TranslationCreateManyEntryInputEnvelope
    connect?: Enumerable<TranslationWhereUniqueInput>
  }

  export type TranslationUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<Enumerable<TranslationCreateWithoutEntryInput>, Enumerable<TranslationUncheckedCreateWithoutEntryInput>>
    connectOrCreate?: Enumerable<TranslationCreateOrConnectWithoutEntryInput>
    createMany?: TranslationCreateManyEntryInputEnvelope
    connect?: Enumerable<TranslationWhereUniqueInput>
  }

  export type WordUpdateOneRequiredWithoutEntryNestedInput = {
    create?: XOR<WordCreateWithoutEntryInput, WordUncheckedCreateWithoutEntryInput>
    connectOrCreate?: WordCreateOrConnectWithoutEntryInput
    upsert?: WordUpsertWithoutEntryInput
    connect?: WordWhereUniqueInput
    update?: XOR<WordUpdateWithoutEntryInput, WordUncheckedUpdateWithoutEntryInput>
  }

  export type TranslationUpdateManyWithoutEntryNestedInput = {
    create?: XOR<Enumerable<TranslationCreateWithoutEntryInput>, Enumerable<TranslationUncheckedCreateWithoutEntryInput>>
    connectOrCreate?: Enumerable<TranslationCreateOrConnectWithoutEntryInput>
    upsert?: Enumerable<TranslationUpsertWithWhereUniqueWithoutEntryInput>
    createMany?: TranslationCreateManyEntryInputEnvelope
    set?: Enumerable<TranslationWhereUniqueInput>
    disconnect?: Enumerable<TranslationWhereUniqueInput>
    delete?: Enumerable<TranslationWhereUniqueInput>
    connect?: Enumerable<TranslationWhereUniqueInput>
    update?: Enumerable<TranslationUpdateWithWhereUniqueWithoutEntryInput>
    updateMany?: Enumerable<TranslationUpdateManyWithWhereWithoutEntryInput>
    deleteMany?: Enumerable<TranslationScalarWhereInput>
  }

  export type TranslationUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<Enumerable<TranslationCreateWithoutEntryInput>, Enumerable<TranslationUncheckedCreateWithoutEntryInput>>
    connectOrCreate?: Enumerable<TranslationCreateOrConnectWithoutEntryInput>
    upsert?: Enumerable<TranslationUpsertWithWhereUniqueWithoutEntryInput>
    createMany?: TranslationCreateManyEntryInputEnvelope
    set?: Enumerable<TranslationWhereUniqueInput>
    disconnect?: Enumerable<TranslationWhereUniqueInput>
    delete?: Enumerable<TranslationWhereUniqueInput>
    connect?: Enumerable<TranslationWhereUniqueInput>
    update?: Enumerable<TranslationUpdateWithWhereUniqueWithoutEntryInput>
    updateMany?: Enumerable<TranslationUpdateManyWithWhereWithoutEntryInput>
    deleteMany?: Enumerable<TranslationScalarWhereInput>
  }

  export type EntryCreateNestedOneWithoutTranslationInput = {
    create?: XOR<EntryCreateWithoutTranslationInput, EntryUncheckedCreateWithoutTranslationInput>
    connectOrCreate?: EntryCreateOrConnectWithoutTranslationInput
    connect?: EntryWhereUniqueInput
  }

  export type EntryUpdateOneRequiredWithoutTranslationNestedInput = {
    create?: XOR<EntryCreateWithoutTranslationInput, EntryUncheckedCreateWithoutTranslationInput>
    connectOrCreate?: EntryCreateOrConnectWithoutTranslationInput
    upsert?: EntryUpsertWithoutTranslationInput
    connect?: EntryWhereUniqueInput
    update?: XOR<EntryUpdateWithoutTranslationInput, EntryUncheckedUpdateWithoutTranslationInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type WordsOnUsersCreateWithoutUserInput = {
    word: WordCreateNestedOneWithoutWordsOnUsersInput
    frequency?: number
  }

  export type WordsOnUsersUncheckedCreateWithoutUserInput = {
    wordId: string
    frequency?: number
  }

  export type WordsOnUsersCreateOrConnectWithoutUserInput = {
    where: WordsOnUsersWhereUniqueInput
    create: XOR<WordsOnUsersCreateWithoutUserInput, WordsOnUsersUncheckedCreateWithoutUserInput>
  }

  export type WordsOnUsersCreateManyUserInputEnvelope = {
    data: Enumerable<WordsOnUsersCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type WordsOnUsersUpsertWithWhereUniqueWithoutUserInput = {
    where: WordsOnUsersWhereUniqueInput
    update: XOR<WordsOnUsersUpdateWithoutUserInput, WordsOnUsersUncheckedUpdateWithoutUserInput>
    create: XOR<WordsOnUsersCreateWithoutUserInput, WordsOnUsersUncheckedCreateWithoutUserInput>
  }

  export type WordsOnUsersUpdateWithWhereUniqueWithoutUserInput = {
    where: WordsOnUsersWhereUniqueInput
    data: XOR<WordsOnUsersUpdateWithoutUserInput, WordsOnUsersUncheckedUpdateWithoutUserInput>
  }

  export type WordsOnUsersUpdateManyWithWhereWithoutUserInput = {
    where: WordsOnUsersScalarWhereInput
    data: XOR<WordsOnUsersUpdateManyMutationInput, WordsOnUsersUncheckedUpdateManyWithoutWordsOnUsersInput>
  }

  export type WordsOnUsersScalarWhereInput = {
    AND?: Enumerable<WordsOnUsersScalarWhereInput>
    OR?: Enumerable<WordsOnUsersScalarWhereInput>
    NOT?: Enumerable<WordsOnUsersScalarWhereInput>
    userId?: IntFilter | number
    wordId?: StringFilter | string
    frequency?: IntFilter | number
  }

  export type EntryCreateWithoutWordInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translation?: TranslationCreateNestedManyWithoutEntryInput
  }

  export type EntryUncheckedCreateWithoutWordInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translation?: TranslationUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EntryCreateOrConnectWithoutWordInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutWordInput, EntryUncheckedCreateWithoutWordInput>
  }

  export type EntryCreateManyWordInputEnvelope = {
    data: Enumerable<EntryCreateManyWordInput>
    skipDuplicates?: boolean
  }

  export type WordsOnUsersCreateWithoutWordInput = {
    user: UserCreateNestedOneWithoutWordsOnUsersInput
    frequency?: number
  }

  export type WordsOnUsersUncheckedCreateWithoutWordInput = {
    userId: number
    frequency?: number
  }

  export type WordsOnUsersCreateOrConnectWithoutWordInput = {
    where: WordsOnUsersWhereUniqueInput
    create: XOR<WordsOnUsersCreateWithoutWordInput, WordsOnUsersUncheckedCreateWithoutWordInput>
  }

  export type WordsOnUsersCreateManyWordInputEnvelope = {
    data: Enumerable<WordsOnUsersCreateManyWordInput>
    skipDuplicates?: boolean
  }

  export type EntryUpsertWithWhereUniqueWithoutWordInput = {
    where: EntryWhereUniqueInput
    update: XOR<EntryUpdateWithoutWordInput, EntryUncheckedUpdateWithoutWordInput>
    create: XOR<EntryCreateWithoutWordInput, EntryUncheckedCreateWithoutWordInput>
  }

  export type EntryUpdateWithWhereUniqueWithoutWordInput = {
    where: EntryWhereUniqueInput
    data: XOR<EntryUpdateWithoutWordInput, EntryUncheckedUpdateWithoutWordInput>
  }

  export type EntryUpdateManyWithWhereWithoutWordInput = {
    where: EntryScalarWhereInput
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutEntryInput>
  }

  export type EntryScalarWhereInput = {
    AND?: Enumerable<EntryScalarWhereInput>
    OR?: Enumerable<EntryScalarWhereInput>
    NOT?: Enumerable<EntryScalarWhereInput>
    text?: StringFilter | string
    part_of_speech?: StringFilter | string
    transcription?: StringNullableFilter | string | null
    wordId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type WordsOnUsersUpsertWithWhereUniqueWithoutWordInput = {
    where: WordsOnUsersWhereUniqueInput
    update: XOR<WordsOnUsersUpdateWithoutWordInput, WordsOnUsersUncheckedUpdateWithoutWordInput>
    create: XOR<WordsOnUsersCreateWithoutWordInput, WordsOnUsersUncheckedCreateWithoutWordInput>
  }

  export type WordsOnUsersUpdateWithWhereUniqueWithoutWordInput = {
    where: WordsOnUsersWhereUniqueInput
    data: XOR<WordsOnUsersUpdateWithoutWordInput, WordsOnUsersUncheckedUpdateWithoutWordInput>
  }

  export type WordsOnUsersUpdateManyWithWhereWithoutWordInput = {
    where: WordsOnUsersScalarWhereInput
    data: XOR<WordsOnUsersUpdateManyMutationInput, WordsOnUsersUncheckedUpdateManyWithoutWordsOnUsersInput>
  }

  export type UserCreateWithoutWordsOnUsersInput = {
    id?: string
    telegramId: number
    username?: string | null
    first_name?: string | null
    lastSendTime?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mode?: string
    period?: number
    language?: string
  }

  export type UserUncheckedCreateWithoutWordsOnUsersInput = {
    id?: string
    telegramId: number
    username?: string | null
    first_name?: string | null
    lastSendTime?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mode?: string
    period?: number
    language?: string
  }

  export type UserCreateOrConnectWithoutWordsOnUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWordsOnUsersInput, UserUncheckedCreateWithoutWordsOnUsersInput>
  }

  export type WordCreateWithoutWordsOnUsersInput = {
    text: string
    entry?: EntryCreateNestedManyWithoutWordInput
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
  }

  export type WordUncheckedCreateWithoutWordsOnUsersInput = {
    text: string
    entry?: EntryUncheckedCreateNestedManyWithoutWordInput
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
  }

  export type WordCreateOrConnectWithoutWordsOnUsersInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutWordsOnUsersInput, WordUncheckedCreateWithoutWordsOnUsersInput>
  }

  export type UserUpsertWithoutWordsOnUsersInput = {
    update: XOR<UserUpdateWithoutWordsOnUsersInput, UserUncheckedUpdateWithoutWordsOnUsersInput>
    create: XOR<UserCreateWithoutWordsOnUsersInput, UserUncheckedCreateWithoutWordsOnUsersInput>
  }

  export type UserUpdateWithoutWordsOnUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutWordsOnUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSendTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mode?: StringFieldUpdateOperationsInput | string
    period?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordUpsertWithoutWordsOnUsersInput = {
    update: XOR<WordUpdateWithoutWordsOnUsersInput, WordUncheckedUpdateWithoutWordsOnUsersInput>
    create: XOR<WordCreateWithoutWordsOnUsersInput, WordUncheckedCreateWithoutWordsOnUsersInput>
  }

  export type WordUpdateWithoutWordsOnUsersInput = {
    text?: StringFieldUpdateOperationsInput | string
    entry?: EntryUpdateManyWithoutWordNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordUncheckedUpdateWithoutWordsOnUsersInput = {
    text?: StringFieldUpdateOperationsInput | string
    entry?: EntryUncheckedUpdateManyWithoutWordNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
  }

  export type WordCreateWithoutEntryInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
    wordsOnUsers?: WordsOnUsersCreateNestedManyWithoutWordInput
  }

  export type WordUncheckedCreateWithoutEntryInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    language: string
    wordsOnUsers?: WordsOnUsersUncheckedCreateNestedManyWithoutWordInput
  }

  export type WordCreateOrConnectWithoutEntryInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutEntryInput, WordUncheckedCreateWithoutEntryInput>
  }

  export type TranslationCreateWithoutEntryInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TranslationUncheckedCreateWithoutEntryInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TranslationCreateOrConnectWithoutEntryInput = {
    where: TranslationWhereUniqueInput
    create: XOR<TranslationCreateWithoutEntryInput, TranslationUncheckedCreateWithoutEntryInput>
  }

  export type TranslationCreateManyEntryInputEnvelope = {
    data: Enumerable<TranslationCreateManyEntryInput>
    skipDuplicates?: boolean
  }

  export type WordUpsertWithoutEntryInput = {
    update: XOR<WordUpdateWithoutEntryInput, WordUncheckedUpdateWithoutEntryInput>
    create: XOR<WordCreateWithoutEntryInput, WordUncheckedCreateWithoutEntryInput>
  }

  export type WordUpdateWithoutEntryInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateWithoutEntryInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: StringFieldUpdateOperationsInput | string
    wordsOnUsers?: WordsOnUsersUncheckedUpdateManyWithoutWordNestedInput
  }

  export type TranslationUpsertWithWhereUniqueWithoutEntryInput = {
    where: TranslationWhereUniqueInput
    update: XOR<TranslationUpdateWithoutEntryInput, TranslationUncheckedUpdateWithoutEntryInput>
    create: XOR<TranslationCreateWithoutEntryInput, TranslationUncheckedCreateWithoutEntryInput>
  }

  export type TranslationUpdateWithWhereUniqueWithoutEntryInput = {
    where: TranslationWhereUniqueInput
    data: XOR<TranslationUpdateWithoutEntryInput, TranslationUncheckedUpdateWithoutEntryInput>
  }

  export type TranslationUpdateManyWithWhereWithoutEntryInput = {
    where: TranslationScalarWhereInput
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyWithoutTranslationInput>
  }

  export type TranslationScalarWhereInput = {
    AND?: Enumerable<TranslationScalarWhereInput>
    OR?: Enumerable<TranslationScalarWhereInput>
    NOT?: Enumerable<TranslationScalarWhereInput>
    id?: StringFilter | string
    text?: StringFilter | string
    part_of_speech?: StringFilter | string
    synonym?: StringNullableFilter | string | null
    meaning?: StringNullableFilter | string | null
    example?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    entryText?: StringFilter | string
    entryPart_of_speech?: StringFilter | string
  }

  export type EntryCreateWithoutTranslationInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    word: WordCreateNestedOneWithoutEntryInput
  }

  export type EntryUncheckedCreateWithoutTranslationInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    wordId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntryCreateOrConnectWithoutTranslationInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutTranslationInput, EntryUncheckedCreateWithoutTranslationInput>
  }

  export type EntryUpsertWithoutTranslationInput = {
    update: XOR<EntryUpdateWithoutTranslationInput, EntryUncheckedUpdateWithoutTranslationInput>
    create: XOR<EntryCreateWithoutTranslationInput, EntryUncheckedCreateWithoutTranslationInput>
  }

  export type EntryUpdateWithoutTranslationInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    word?: WordUpdateOneRequiredWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateWithoutTranslationInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    wordId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordsOnUsersCreateManyUserInput = {
    wordId: string
    frequency?: number
  }

  export type WordsOnUsersUpdateWithoutUserInput = {
    word?: WordUpdateOneRequiredWithoutWordsOnUsersNestedInput
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersUncheckedUpdateWithoutUserInput = {
    wordId?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersUncheckedUpdateManyWithoutWordsOnUsersInput = {
    wordId?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type EntryCreateManyWordInput = {
    text: string
    part_of_speech: string
    transcription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordsOnUsersCreateManyWordInput = {
    userId: number
    frequency?: number
  }

  export type EntryUpdateWithoutWordInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translation?: TranslationUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateWithoutWordInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translation?: TranslationUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateManyWithoutEntryInput = {
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    transcription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordsOnUsersUpdateWithoutWordInput = {
    user?: UserUpdateOneRequiredWithoutWordsOnUsersNestedInput
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type WordsOnUsersUncheckedUpdateWithoutWordInput = {
    userId?: IntFieldUpdateOperationsInput | number
    frequency?: IntFieldUpdateOperationsInput | number
  }

  export type TranslationCreateManyEntryInput = {
    id?: string
    text: string
    part_of_speech: string
    synonym?: string | null
    meaning?: string | null
    example?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TranslationUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranslationUncheckedUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranslationUncheckedUpdateManyWithoutTranslationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    part_of_speech?: StringFieldUpdateOperationsInput | string
    synonym?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}