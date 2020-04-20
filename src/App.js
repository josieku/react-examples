import React from 'react';
import HeartOutline from 'react-ionicons/lib/MdHeartOutline';
import HeartFilled from 'react-ionicons/lib/MdHeart';
import './App.css';
export default class App extends React.Component {
  state = {
    type: ""
  }

  render() {
    return (
      <div className="App">
        <h1>Here are a few examples of React functions!</h1>
        <ActivateButtons/>
        <FilterListByButton/>
        <SearchList/>
        <LocalStorageSave/>
        <p id="author">by Josie Ku</p>
      </div>
    );
  }
}

const BUTTONS = [ "button1", "button2", "button3", "button4" ]

class ActivateButtons extends React.Component {
  state = {
    selected: ""
  }

  onClick = (button) => {
    this.setState({
      selected: button
    });
  }

  render(){
    return(
      <div className="activateButtonsContainer">
        <p>1. Activate buttons by adding a new CSS class when it's selected</p>
        { BUTTONS.map((name, ind) => (
          <button
            onClick={()=> this.onClick(name)}
            className={this.state.selected === name ? "selected" : ""}
            >
            {name}
          </button>
        ))}
      </div>
    )
  }
}

const STUDENTS = [
  {
    name: "Josie Ku",
    school: "Wellesley",
  },
  {
    name: "Pug Pug",
    school: "MIT",
  },
  {
    name: "Jessica Fox",
    school: "Wellesley",
  },
  {
    name: "Alex Doodoo",
    school: "Harvard"
  },
  {
    name: "Mina Math",
    school: "MIT"
  },
  {
    name: "Oakey Puppy",
    school: "Wellesley"
  }
]

const SCHOOLS = [ "All", "Wellesley", "MIT", "Harvard" ]

class FilterListByButton extends React.Component {
  state = {
    selected: "All",
    list: STUDENTS
  }

  onClick = (category) => {
    this.filterList(category);

    this.setState({
      selected: category
    });
  }

  filterList = (category) => {
    let results = STUDENTS; // default list is all students

    if (category !== "All") { // if the button selected is not all, filter
      results = STUDENTS.filter((student) => student.school === category);
    }

    console.log(category, results);

    this.setState({
      list: results // set the result list
    })
  }

  render(){
    return(
      <div className="filterListByButtonContainer">
        <p>2. Filter a list by buttons</p>
        { SCHOOLS.map((name, ind) => (
          <button
            onClick={()=> this.onClick(name)}
            className={this.state.selected === name ? "selected" : ""}
            >
            {name}
          </button>
        ))}
        <div className="resultContainer">
          {
            this.state.list.map((student) => (
              <div>
                <p>Name: {student.name}</p>
                <p>School: {student.school}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

class SearchList extends React.Component {
  state = {
    search: "",
    list: STUDENTS
  }

  onChange = (e) => {
    const input = e.target.value;

    this.setState({ search: input }); // change how the input box looks

    this.filterList(input); // filter the results based on search input
  }

  filterList = (search) => {
    let results = STUDENTS; // default list of students

    if (search !== "") {
      results = results.filter((student) => student.name.toLowerCase().includes(search));
    }

    this.setState({ // update results
      list: results 
    })
  }

  render() {
    return(
      <div className="searchListContainer">
        <p>3. Search a list</p>
        <input 
          value={this.state.search}
          placeholder="search..."
          onChange={this.onChange}
          />
        <div className="resultContainer">
          {
            this.state.list.map((student) => (
              <div>
                <p>Name: {student.name}</p>
                <p>School: {student.school}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

class LocalStorageSave extends React.Component {
  state = {
    list: STUDENTS,
    liked: []
  }

  async componentDidMount() {
    const liked = await localStorage.getItem("likedStudents") || "[]";
    this.setState({
      liked: JSON.parse(liked)
    })
  }

  handleOnClick = async (name) => {
    let liked = this.state.liked;
    const arr_index = liked.indexOf(name);

    if (arr_index > -1){ // this student is already liked
      liked.splice(arr_index, 1); // remove name from array
    } else { // this student is not liked
      liked.push(name); // add name to array
    }

    this.setState({
      liked // update liked list in component
    })

    // store updated list in local storage
    await localStorage.setItem("likedStudents", JSON.stringify(liked)) 
  }

  render() {
    return(
      <div className="searchListContainer">
        <p>4. Saving items temporarily on local storage</p>
        <div className="resultContainer">
          {
            this.state.list.map((student) => (
              <div>
                {
                  this.state.liked.includes(student.name)
                    ? <HeartFilled onClick={()=>this.handleOnClick(student.name)}/>
                    : <HeartOutline onClick={()=>this.handleOnClick(student.name)}/>
                }
                <p>Name: {student.name}</p>
                <p>School: {student.school}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}