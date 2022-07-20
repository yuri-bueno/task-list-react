/* eslint-disable no-unused-vars */

import React, { Component } from "react";

import { FaPlus } from "react-icons/fa"
import { FaEdit, FaWindowClose } from "react-icons/fa"

import './main.css';

export default class Main extends Component {

  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  }


  handleSubmit = (e) => {
    e.preventDefault

    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    if (index === -1) {

      novaTarefa = novaTarefa.trim();

      if (tarefas.indexOf(novaTarefa) !== -1 || novaTarefa == "") return;
      const novaTarefas = [...tarefas];

      this.setState({
        tarefas: [...novaTarefas, novaTarefa],
        novaTarefa: ""
      })
    } else {
      tarefas.splice(index, 1, novaTarefa)
      this.setState({
        tarefas: [...tarefas],
        novaTarefa: "",
        index: -1
      })
    }

  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value
    })
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;


    this.setState({
      index: index,
      novaTarefa: tarefas[index]
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    let restoTarefas = [...tarefas]

    restoTarefas.splice(index, 1)

    this.setState({
      tarefas: [...restoTarefas]
    })
  }


  render() {
    const { novaTarefa, tarefas } = this.state

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>


        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (

            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit onClick={(e) => this.handleEdit(e, index)} className="edit" />
                <FaWindowClose onClick={(e) => this.handleDelete(e, index)} className="delete" />
              </div>
            </li >
          ))
          }
        </ul>
      </div >
    )
  }
}

