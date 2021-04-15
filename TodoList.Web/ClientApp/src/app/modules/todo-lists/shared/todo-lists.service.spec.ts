import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoListsService } from './todo-lists.service';

describe('TodoListsService', () => {
  let service: TodoListsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [TodoListsService]

    });
    
    service = TestBed.get(TodoListsService);


  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
