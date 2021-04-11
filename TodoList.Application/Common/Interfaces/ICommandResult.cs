using System.Collections.Generic;

namespace TodoList.Application.Common.Interfaces
{
    public interface ICommandResult<T>
    {
        string Message { get; }

        IEnumerable<string> Errors { get; }

        bool IsSuccessful { get; }

        T Result { get; }

        ICommandResult<T> Success(T model, string message);

        ICommandResult<T> Failure(IEnumerable<string> errors);

        ICommandResult<T> Failure(string error);

    }
}
