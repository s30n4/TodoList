using TodoList.Domain.Common.Interfaces;

namespace TodoList.Domain.TodoListManagement.Rules
{
    public class DescriptionLengthCanNotBeMoreThan500CharacterRule : IBusinessRule
    {
        public string Message => "Description must be less than 500 characters long";

        private readonly string _description;

        public DescriptionLengthCanNotBeMoreThan500CharacterRule(string description)
        {
            _description = description;
        }

        public bool IsBroken() => !string.IsNullOrEmpty(_description) && _description.Length > 500;
    }
}
