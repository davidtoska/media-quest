export interface MqVariable {
  readonly kind:
    | "numeric-variable"
    | "numeric-range-variable"
    | "string-variable"
    | "duration-variable"
    | "timestamp-variable";

  label: string;
  varId: string;

  // Values
  stringValue?: string;
  numericValue?: number;
  timestampValue?: string;
  minValue?: number;
  maxValue?: number;

  // Context
  origin: "question" | "form-field" | "predefined" | "custom" | "mq-event" | "event-calculated";
  pageId?: string;
  eventSource?: string;
  pagePrefix?: string;
  modulePrefix?: string;
  moduleID?: string;
  pagePosition?: number;

  // Validations
  unit?: "ms" | "s" | "m" | "h" | "d";
  min?: number;
  max?: number;

  stepSize?: number;
  minLength?: number;
  maxLength?: number;
  rangeFloor?: number;
  rangeCeiling?: number;
  defaultValue?: number | string;
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
