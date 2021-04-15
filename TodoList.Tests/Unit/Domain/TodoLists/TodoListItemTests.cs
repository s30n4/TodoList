using NUnit.Framework;
using Shouldly;
using System;
using TodoList.Domain.Common.Exceptions;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Rules;
using TodoList.Tests.Unit.TestData;

namespace TodoList.Tests.Unit.Domain.TodoLists
{
    [TestFixture(Description = "TodoListItemTests", Category = "Unit")]
    public class TodoListItemTests : TestBase
    {
        [Test]
        public void AddNewTodoListItem_ShouldReturnNewGuid()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();


            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.TodoListItemId.ShouldNotBe(Guid.Empty);
        }


        [Test]
        public void NewTodoListItem_Status_ShouldBePending()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();


            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.Status.ShouldBe(TodoListItemStatuses.Pending);
        }

        [Test]
        public void CreateNew_CompletedOn_ShouldBeNull()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();


            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.CompletedOn.ShouldBeNull();
        }

        [Test]
        public void CreateNew_WhenNameIsNull_IsBroken()
        {
            AssertBrokenRule<NameCanNotBeNullOrEmptyRule>(() =>
            {
                TodoListItem.CreateNew(null, string.Empty);

            });
        }

        [Test]
        public void CreateNew_WhenNameIsNull_ShouldThrowBusinessRuleValidationException()
        {
            var exception = Should.Throw<BusinessRuleValidationException>(() => TodoListItem.CreateNew(null, "test"));
            exception.Message.ShouldBe("Name must be provided");
        }

        [Test]
        public void CreateNew_WhenNameDescriptionLengthCanNotBeMoreThan500CharacterRule_IsBroken()
        {
            AssertBrokenRule<DescriptionLengthCanNotBeMoreThan500CharacterRule>(() =>
            {
                TodoListItem.CreateNew("Test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare nec elit et pretium. Cras aliquet sed metus et facilisis. Suspendisse augue nisi, efficitur at rutrum eget, dapibus et quam. Nullam magna sem, rhoncus eget lorem eget, varius pulvinar quam. Nulla hendrerit a orci nec mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam non erat in magna lacinia dapibus. Sed at dignissim magna, eget interdum mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin condimentum velit ac elit vehicula accumsan. Vestibulum at urna finibus, blandit sem a, lobortis quam. Morbi sodales fringilla est elementum dignissim. Duis accumsan fringilla risus non rhoncus. Integer et congue odio. Sed tempus fermentum mi.");

            });
        }

        [Test]
        public void CreateNew_DueDate_ShouldBeNull()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData(hasDueDate: false);


            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.DueDate.ShouldBeNull();
        }

        [Test]
        public void CreateNew_Description_ShouldBeNull()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData(hasDescription: false);

            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.Description.ShouldBeNull();
        }



        [Test]
        public void Update_DueDate_ShouldBeNull()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            todoListItem.Update("Update TodoListItem", "Update DescriptionTodoListItem");

            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.DueDate.ShouldBeNull();
        }

        [Test]
        public void Update_Description_ShouldBeNull()
        {
            //Act
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            todoListItem.Update("Update TodoListItem", null);

            //Assert
            todoListItem.ShouldBeOfType<TodoListItem>();
            todoListItem.Description.ShouldBeNull();
        }

        [Test]
        public void Update_WhenNameCanNotBeNullOrEmptyRule_IsBroken()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            AssertBrokenRule<NameCanNotBeNullOrEmptyRule>(() =>
            {
                todoListItem.Update(null, string.Empty);

            });
        }

        [Test]
        public void Update_WhenDescriptionLengthCanNotBeMoreThan500CharacterRule_IsBroken()
        {

            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            AssertBrokenRule<DescriptionLengthCanNotBeMoreThan500CharacterRule>(() =>
            {
                todoListItem.Update("Test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare nec elit et pretium. Cras aliquet sed metus et facilisis. Suspendisse augue nisi, efficitur at rutrum eget, dapibus et quam. Nullam magna sem, rhoncus eget lorem eget, varius pulvinar quam. Nulla hendrerit a orci nec mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam non erat in magna lacinia dapibus. Sed at dignissim magna, eget interdum mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin condimentum velit ac elit vehicula accumsan. Vestibulum at urna finibus, blandit sem a, lobortis quam. Morbi sodales fringilla est elementum dignissim. Duis accumsan fringilla risus non rhoncus. Integer et congue odio. Sed tempus fermentum mi.");

            });
        }


        [Test]
        public void TodoListItem_MarkAsDone_CompletedOn_ShouldNotBeNull()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            todoListItem.MarkAsDone();


            todoListItem.CompletedOn.ShouldNotBeNull();
        }

        [Test]
        public void TodoListItem_MarkAsDone_Status_ShouldBe_Done()
        {
            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            todoListItem.MarkAsDone();


            todoListItem.Status.ShouldBe(TodoListItemStatuses.Done);
        }


    }
}
