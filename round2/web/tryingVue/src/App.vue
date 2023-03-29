<template>
  <form @submit.prevent="addTodo">
    <input type="text" v-model="userInput" />
    <button>add todo</button>
  </form>
  <ul class="todoWrapper">
    <li v-for="todo in todoArray">
      <p :class="todo.isDone ? 'done' : ''" @click="ToggleTodoIsDone(todo.id)">
        {{ todo.title }}
      </p>
      <button @click="deleteTodo(todo.id)">X</button>
    </li>
  </ul>
</template>

<script lang="ts">
let id = 1;
interface todoTypes {
  id: number;
  title: string;
  isDone: boolean;
}

type Data = {
  todoArray: todoTypes[];
  userInput: string;
};

export default {
  data(): Data {
    return {
      todoArray: [],
      userInput: "",
    };
  },
  methods: {
    addTodo() {
      if (this.userInput != "") {
        this.todoArray.push({ id: id, title: this.userInput, isDone: false });
        id++;
      }
    },
    deleteTodo(id: number) {
      const temp: todoTypes[] = [...this.todoArray];
      const index = this.todoArray.findIndex((item) => item.id == id);
      temp.splice(index, 1);
      this.todoArray = temp;
    },
    ToggleTodoIsDone(id: number) {
      const temp = [...this.todoArray];
      const index = this.todoArray.findIndex((item) => item.id === id);
      temp[index].isDone = !temp[index].isDone;
      this.todoArray = temp;
    },
  },
  /* methods: {
    changeNumber(number: number) {
      this.count = number;
    },
  }, */
  /* computed: {
    counted() {
      const counted = this.count;
      return counted;
    },
  }, */
};
</script>
