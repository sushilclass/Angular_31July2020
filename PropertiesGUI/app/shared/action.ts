export class Action {
  ParameterName?: string;
  Action?: string;
  AppName?: string="Properties GUI";
  ParentElementUniqueId?: string;
  Value?: string;
  GUID?: string;
  BUILTIN?: string;
  DocumentHashCode?: string;
  IdToken?: string;
  RevitWsSessionId?: string;
  FromWebapp?: boolean;
  ElementUniqueId?: string;
  Name?: string;
  ActionArray?: [Action];
  BuiltInId?: string;
  constructor() {
    this.FromWebapp = true;
  }
};