# BOT-O-MAT
Use any language to complete this challenge. The implementation is up to you: it can be a command-line application or have a graphical interface.

Your application should collect a name and robot type from the types we list below. For each, it should create a Good Robot of the type the user chooses, e.g. Larry, Bipedal. It should also create a Bad Robot by prefixing the name with “Bad-”, e.g. Bad-Larry, Bipedal.

Given the list of tasks below, your application should then assign the Good Robot a set of five tasks, all of which complete after a duration that we show in milliseconds. 

The Bad Robot should put tasks the Good Robot completes, at random, back on the Good Robot’s to-do list. For example, maybe your application would put every 3rd-completed task back on the Good Robot’s to-do list.


- Collect a name and robot type from user.
- Instantiate a Good Robot of the type provided by the user with the name provied by the user
  - for example: Bipedal, Larry
- Instantiate a Bad Robot of the same type as Good Robot and has 'Bad-' prefixing the name
  - for example: Bipedal, Bad-Larry
- Set up methods on Good Robot to complete tasks from the provided list
- At random intervals have Bad Robot take a completed task and put it back on the todo list
  - for example: every 3rd completed task goes back on Good Bot's todo list

## Robot

### Good Robot
Good Robot completes tasks and removes them from the list when they are done (i.e. enough time has passed since starting the task).


### Bad Robot
Bad Robot is Good Robot's evil twin. It spies on Good Robot and randomly puts completed tasks back on the list.


## Tasks
Tasks have a description and an estimated time to complete.

```
[
  {
    description: 'do the dishes',
    eta: 1000,
  },{
    description: 'sweep the house',
    eta: 3000,
  },{
    description: 'do the laundry',
    eta: 10000,
  },{
    description: 'take out the recycling',
    eta: 4000,
  },{
    description: 'make a sammich',
    eta: 7000,
  },{
    description: 'mow the lawn',
    eta: 20000,
  },{
    description: 'rake the leaves',
    eta: 18000,
  },{
    description: 'give the dog a bath',
    eta: 14500,
  },{
    description: 'bake some cookies',
    eta: 8000,
  },{
    description: 'wash the car',
    eta: 20000,
  },
]
```

## Types
```
{ 
  UNIPEDAL: 'Unipedal',
  BIPEDAL: 'Bipedal',
  QUADRUPEDAL: 'Quadrupedal',
  ARACHNID: 'Arachnid',
  RADIAL: 'Radial',
  AERONAUTICAL: 'Aeronautical'
}
```

## Features to add once the core functionality is complete
Be creative and have fun! Use this list or create your own features.
- Allow users to create multiple robots at one time
- create a leaderboard for tasks completed by each Good Robot
- Create a leaderboard for tasks put back by each Bad Robot
- Create tasks specific for each robot type, this could work in conjunction with the leaderboard. For e.g. robots that are assigned tasks that their type can’t perform won’t get “credit” for finishing the task.
- Add persistance for tasks, bots and leaderboard stats


## Authors
- Scott Hoffman <https://github.com/scottshane>
- Olivia Osby <https://github.com/oosby>