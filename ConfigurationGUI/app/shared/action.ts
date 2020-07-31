export class Action {
    ParameterName?: string;
    Action?: string;
    AppName?: string="Coordination Configuration GUI";
    ParentElementUniqueId?: string;
    Value?: string;
    GUID?: string;
    BUILTIN?: string;
    DocumentHashCode?: string;
    IdToken?: string;
    RevitWsSessionId?: string;
    FromWebapp?: boolean;
    ElementUniqueId?: string;
    ModelSelectedValue?; string;
    NewConstructionDemolishedPhase?: string;
    ExistDemolishedPhase?: string;
    data?: string;
    constructor(){
      this.FromWebapp=true;
    }
  };