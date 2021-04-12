export class CommandResult<T> {
  message: string;
  errors: string[];
  result: T;
  isSuccessful: boolean;
}
