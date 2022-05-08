export type Resolve<Value = void> = (value: Value | PromiseLike<Value>) => void;

export type Reject<Reason = any> = (reason?: Reason) => void;
