export interface MqVariable {
  readonly kind: "numeric-variable" | "numeric-range-variable" | "string-variable";

  label: string;
  varId: string;

  // Values - The actual value of the variable.
  stringValue?: string;
  numericValue?: number;
  minValue?: number;
  initialValue?: number;
  maxValue?: number;
  defaultValue?: number | string;
  defaultMinValue?: number;
  defaultMaxValue?: number;

  // Context
  origin:
    | "question"
    | "form-field"
    | "predefined"
    | "event"
    | "calculated"
    | "sum-score"
    | "predefined-or-question";

  pageId?: string;
  eventSource?: string;
  pagePrefix?: string;
  modulePrefix?: string;
  moduleID?: string;
  pageNumber?: number;

  // Validations
  min?: number;
  max?: number;
  stepSize?: number;
  minLength?: number;
  maxLength?: number;
  rangeFloor?: number;
  rangeCeiling?: number;

  options?: Array<{ label: string; value: number }>;
}

export interface PageVariable extends MqVariable {
  readonly pageId: string;
  readonly pagePrefix: string;
  readonly pagePosition: number;
  readonly modulePrefix: string;
  readonly origin: "question" | "form-field";
}

export interface PredefinedVariable extends MqVariable {
  readonly origin: "predefined";
  readonly modulePrefix: string;
  readonly moduleID: string;
  defaultValue: number;
  requireManualSelection: boolean;
  options: Array<{ label: string; value: number }>;
}
