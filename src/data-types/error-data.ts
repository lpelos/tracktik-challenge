export default interface ErrorData {
  code: string;
  details?: Record<string, any>;
  message?: string;
}
