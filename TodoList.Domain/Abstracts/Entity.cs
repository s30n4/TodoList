using MediatR;
using System;
using System.Collections.Generic;
using TodoList.Domain.Common.Exceptions;
using TodoList.Domain.Common.Interfaces;

namespace TodoList.Domain.Abstracts
{
    public abstract class Entity
    {
        public DateTime DateCreated { get; set; }
        public DateTime? DateLastUpdated { get; set; }

        protected void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
            {
                throw new BusinessRuleValidationException(rule);
            }
        }


    }
}
