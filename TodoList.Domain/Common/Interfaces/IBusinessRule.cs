﻿namespace TodoList.Domain.Common.Interfaces
{
    public interface IBusinessRule
    {
        bool IsBroken();

        string Message { get; }
    }
}
