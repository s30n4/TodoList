using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoList.Application.TodoLists.Queries;

namespace TodoList.Api.Controllers
{
    [Route("api/todo-list")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TodoListController(IMediator mediator)
        {
            _mediator = mediator;

        }


        [HttpGet("pending")]
        public async Task<ActionResult> GetPendingTodoListItems([FromQuery] GetTodoListsQuery request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("done")]
        public async Task<ActionResult> GetDoneTodoListItems([FromQuery] GetTodoListsQuery request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

    }
}
