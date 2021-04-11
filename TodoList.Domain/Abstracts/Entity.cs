using MediatR;
using System;
using System.Collections.Generic;

namespace TodoList.Domain.Abstracts
{
    public abstract class Entity
    {
        private readonly List<INotification> _domainEvents = new List<INotification>();
        public DateTime DateCreated { get; set; }
        public DateTime? DateLastUpdated { get; set; }
        public List<INotification> DomainEvents => _domainEvents;

        public void AddDomainEvent(INotification eventItem)
        {
            _domainEvents.Add(eventItem);
        }

       
    }
}
