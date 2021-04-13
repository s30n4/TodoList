using TodoList.Domain.Common.Interfaces;

namespace TodoList.Domain.TodoListManagement.Rules
{
    public class NameCanNotBeNullOrEmptyRule : IBusinessRule
    {
        public string Message => "Name must be provided";

        private readonly string _name;

        public NameCanNotBeNullOrEmptyRule(string name)
        {
            _name = name;
        }

        public bool IsBroken() => string.IsNullOrEmpty(_name);
    }
}
