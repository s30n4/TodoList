using FluentValidation.Results;
using System.Collections.Generic;
using System.Linq;
using TodoList.Application.Common.Interfaces;

namespace TodoList.Application.Common.Concretes
{
    public class CommandResult<T> : ICommandResult<T>
    {
        public string Message { get; private set; }

        public IEnumerable<string> Errors { get; private set; } = new List<string>();

        public T Result { get; private set; }

        public bool IsSuccessful { get; private set; }

        protected CommandResult(T model, string message, bool isSuccessful)
        {
            Result = model;
            Message = message;
            Errors = new List<string>();
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(T model, bool isSuccessful)
        {
            Result = model;
            Errors = new List<string>();
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(T model, string message, IEnumerable<string> errors, bool isSuccessful)
        {
            Result = model;
            Message = message;
            Errors = errors;
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(T model, IEnumerable<string> errors, bool isSuccessful)
        {
            Result = model;
            Errors = errors;
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(IEnumerable<string> errors, string message, bool isSuccessful)
        {
            Message = message;
            Errors = errors;
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(IEnumerable<string> errors, bool isSuccessful)
        {
            Errors = errors;
            IsSuccessful = isSuccessful;
        }

        protected CommandResult(string message, bool isSuccessful)
        {
            Message = message;
            IsSuccessful = isSuccessful;
        }

        public static CommandResult<T> Success(T model, string message, IEnumerable<string> errors)
        {
            return new CommandResult<T>(model, message, errors, true);
        }

        public static CommandResult<T> Success(T model, string message)
        {
            return new CommandResult<T>(model, message, true);
        }

        public static CommandResult<T> Success(T model)
        {
            return new CommandResult<T>(model, true);
        }

        public static CommandResult<T> Failure(IEnumerable<string> errors)
        {
            return new CommandResult<T>(errors, false);
        }

        public static CommandResult<T> Failure(IList<ValidationFailure> errors)
        {
            return new CommandResult<T>(errors.Select(error => error.ErrorMessage), false);
        }

        public static CommandResult<T> Failure(IList<ValidationFailure> errors, string message)
        {
            return new CommandResult<T>(errors.Select(error => error.ErrorMessage), message, false);
        }

        public static CommandResult<T> Failure(IEnumerable<string> errors, string message)
        {
            return new CommandResult<T>(errors, message, false);
        }

        public static CommandResult<T> Failure(string error)
        {
            return new CommandResult<T>(error, false);
        }

        ICommandResult<T> ICommandResult<T>.Success(T model, string message)
        {
            return Success(model, message);
        }

        ICommandResult<T> ICommandResult<T>.Failure(IEnumerable<string> errors)
        {
            return Failure(errors);
        }

        ICommandResult<T> ICommandResult<T>.Failure(string error)
        {
            return Failure(error);
        }


    }
}
