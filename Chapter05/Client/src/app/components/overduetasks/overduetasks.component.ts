import { Component, OnInit, Output } from '@angular/core';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import { TodoItemQuery, OverdueTodoItemQuery } from 'src/app/types/TodoItemQuery';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'atp-overduetasks',
  templateUrl: './overduetasks.component.html',
  styleUrls: ['./overduetasks.component.scss']
})
export class OverduetasksComponent implements OnInit {

  todos: ITodoItem[] = new Array<ITodoItem>();
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    const todos = this.apollo.query<OverdueTodoItemQuery>({
      query: gql`
        query ItemsQuery {
          OverdueTodoItems {
            Id,
            Title,
            Description,
            DaysCreated,
            DueDate
          }
        }
      `
    });

    todos.subscribe(todo => {
      todo.data.OverdueTodoItems.forEach(x => {
        this.todos.push(x);
      });
    });
  }

  resubscribe = (event: string) => {
    const index = this.todos.findIndex(x => x.Id === event);
    this.todos.splice(index, 1);
  }
}