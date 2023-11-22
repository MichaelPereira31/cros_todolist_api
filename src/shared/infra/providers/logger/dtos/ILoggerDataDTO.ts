export type ILoggerDataDTO<Payload, Type> = Type extends 'error'
  ? {
      payload?: Payload;
      err?: Error;
      store?: boolean;
    } & (
      | {
          payload: Payload;
        }
      | {
          err: Error;
        }
    )
  : {
      payload?: Payload;
      store?: boolean;
    };
