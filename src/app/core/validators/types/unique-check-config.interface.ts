export interface UniqueCheckConfig<TReq, TRes> {
  endpoint: string;
  body: (controlValue: any) => TReq;
  isUnique: (response: TRes) => boolean;
}
