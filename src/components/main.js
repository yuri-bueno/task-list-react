/* eslint-disable no-unused-vars */

import React, { Component } from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa"

import Form from "./Form";
import Tarefas from "./Tarefas"

import './main.css';

export default class Main extends Component {

  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
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


        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas} />

      </div >
    )
  }
}

