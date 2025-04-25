import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; 
  taskName: string = ''; 

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  moveTask = (task: Task, direction: number) => {
    
    const oldStage = task.stage;
    const newStage = oldStage + direction;
    if (newStage < 0 || newStage >= this.stagesNames.length) {
      return; 
    }
    task.stage = newStage;
    this.configureTasksForRendering();
  }
  deleteTask = (task: Task) => {
    const index = this.tasks.findIndex(t => t.name === task.name);    
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    this.configureTasksForRendering();  
  }
  createTask = () => { 
    const newTask = { name: this.taskName, stage: 0 };
    this.tasks.push(newTask);
    this.configureTasksForRendering();
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}