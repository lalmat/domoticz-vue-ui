export interface DomoticzDevice {
  AddjMulti         : number,
  AddjMulti2        : number,
  AddjValue         : number,
  AddjValue2        : number,
  BatteryLevel      : number,
  CustomImage       : number,
  Data              : string,
  Description       : string,
  DimmerType        : string,
  Favorite          : number,
  HardwareDisabled  : boolean,
  HardwareID        : number,
  HardwareName      : string,
  HardwareType      : string,
  HardwareTypeVal   : number,
  HaveDimmer        : boolean,
  HaveGroupCmd      : boolean,
  HaveTimeout       : boolean,
  ID                : string,
  Image             : string,
  IsSubDevice       : boolean,
  LastUpdate        : string,
  Level             : number,
  LevelInt          : number,
  MaxDimLevel       : number,
  Name              : string,
  Notifications     : string,
  PlanID            : string,
  PlanIDs           : number[],
  Protected         : boolean,
  ShowNotifications : boolean,
  SignalLevel       : string,
  Status            : string,
  StrParam1         : string,
  StrParam2         : string,
  SubType           : string,
  SwitchType        : string,
  SwitchTypeVal     : number,
  Timers            : string,
  Type              : string,
  TypeImg           : string,
  Unit              : number,
  Used              : number,
  UsedByCamera      : boolean,
  XOffset           : string,
  YOffset           : string,
  idx               : string,
  ForecastStr       : string
}
